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
        createdAt: new Date().toString(),
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
  await admin
    .firestore()
    .collection(`users`)
    .doc(userId)
    .collection('orders')
    .doc(session.id)
    .set({
      items: JSON.parse(session.metadata.cartItems),
      amount: session.amount_total / 100,
      createdAt: session.metadata.createdAt,
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
        req.body,
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
