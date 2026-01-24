import express from "express";
import { createPaymentIntent } from "../payment.js";

const router = express.Router();

router.post("/create-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await createPaymentIntent(amount);

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
