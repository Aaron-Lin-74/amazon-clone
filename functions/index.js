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
      line_items: req.body.items.map((item) => {
        return {
          price: item.price_id,
          quantity: item.quantity,
        };
      }),
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/checkout`,
      allow_promotion_codes: true,
    };
    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

exports.api = functions.https.onRequest(app);
