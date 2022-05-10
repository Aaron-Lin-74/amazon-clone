const functions = require('firebase-functions');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.path === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

app.post('/create-checkout-session', async (req, res) => {
  try {
    const params = {
      customer_email: req.body.email,
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      shipping_address_collection: { allowed_countries: ['AU'] },
      shipping_options: [
        { shipping_rate: process.env.FREE_SHIPPING_ID },
        { shipping_rate: process.env.FAST_SHIPPING_ID },
      ],
      metadata: {
        cartItems: JSON.stringify(req.body.cartItems),
        userId: req.body.userId,
      },
      line_items: req.body.items,
      success_url: `${req.headers.origin}/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout`,
      allow_promotion_codes: true,
    };
    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

const getDefaultTimestamp = () => {
  // The default operation of getting date of three months prior
  const date = new Date();
  date.setMonth(date.getMonth() - 3);
  const timestamp = admin.firestore.Timestamp.fromDate(date);
  return timestamp;
};

// Get the firestore timestamp of the first day of the year.
const getTimestampOfFirstDay = (year) => {
  const date = new Date(year, 0, 1);
  const timestamp = admin.firestore.Timestamp.fromMillis(
    Date.parse(date.toString())
  );
  return timestamp;
};

// Get the firestore timestamp of the last day of the year (the first day of next year).
const getTimestampOfLastDay = (year) => {
  const date = new Date(year);
  const lastDate = new Date(date.getFullYear() + 1, 0, 1);
  const timestamp = admin.firestore.Timestamp.fromMillis(
    Date.parse(lastDate.toString())
  );
  return timestamp;
};

// retrieve a user's order records, within three month by default
app.get('/orders', async (req, res) => {
  const userId = req.query.userId;
  const year = req.query.year;
  let snapshot;
  try {
    if (year === undefined) {
      snapshot = await admin
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('orders')
        .where('createdAt', '>', getDefaultTimestamp())
        .orderBy('createdAt', 'desc')
        .get();
    } else {
      snapshot = await admin
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('orders')
        .where('createdAt', '>=', getTimestampOfFirstDay(year))
        .where('createdAt', '<', getTimestampOfLastDay(year))
        .orderBy('createdAt', 'desc')
        .get();
    }
    res.status(200).send(
      snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          data: {
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate().toDateString(),
          },
        };
      })
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/order/success', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    const customer = await stripe.customers.retrieve(session.customer);
    res.status(200).send({ customer });
  } catch (err) {
    res.status(400).send(err);
  }
});

const fulfillOrder = async (session) => {
  // Write order info to the firestore
  const userId = session.metadata.userId;
  const customer = await stripe.customers.retrieve(session.customer);
  await admin
    .firestore()
    .collection(`users`)
    .doc(userId)
    .collection('orders')
    .doc(session.id)
    .set({
      items: JSON.parse(session.metadata.cartItems),
      amount: session.amount_total / 100,
      createdAt: admin.firestore.Timestamp.now(),
      customer,
    });
};

// Stripe requires the raw body to construct the event
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  let event = req.body;
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      res.status(400).json({ message: err.message });
    }
  }
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      try {
        const session = event.data.object;
        fulfillOrder(session);
      } catch (err) {
        console.log(
          'Something goes wrong when updating the firestore database',
          err.message
        );
        res.status(400).json({ message: err.message });
      }

      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
  res.status(200).end();
});

exports.api = functions
  .runWith({ timeoutSeconds: 200 })
  .region('australia-southeast1')
  .https.onRequest(app);
