import express from "express";
import { createCheckoutSession, verifySession } from "../controllers/stripeController.js";
import { protect } from "../middleware/auth.js";

export const stripeRouter = express.Router();

stripeRouter.post("/create-checkout-session", protect, createCheckoutSession);
stripeRouter.post("/verify-session", protect, verifySession);
