const functions = require('firebase-functions');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

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
const fulfillOrder = (session) => {
  // TODO: save order to db
  console.log('Fulfilling order', session);
};

app.post(
  '/webhook',
  express.json({ type: 'application/json' }),
  (request, response) => {
    const payload = request.body;
    let event;
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          payload,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        fulfillOrder(session);

        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    response.status(200).end();
  }
);

exports.api = functions
  .runWith({ timeoutSeconds: 200 })
  .region('australia-southeast1')
  .https.onRequest(app);
