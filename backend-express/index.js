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

app.get("/", (req, res) => {
  res.status(200).send("Hello Mocarram");
});

app.post("/api/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("payment request received, yeeeee!!!", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
    description: "Amazon Clone Payments",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
const port = process.env.PORT || "5000";
app.listen(port, () => {
  console.log(`server started on port:- ${port}`);
});
