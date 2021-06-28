const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51J7MgySG1N17uyNow49HA6xwiwuT7hSUnyBj3J6ZkBqjvbHAfUVAyr64JArPz05ifF2QbRO6RhpAr6tspUrI0kwX00PrTDgjhD"
);

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("payment request received, yeeeee!!!", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
    description: "Amazon Clone Payments",
    "payment_method_types[]": "card",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);
