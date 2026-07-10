import { Request, Response } from "express";
import Stripe from "stripe";
import { User } from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const PLAN_CREDITS = {
  starter: 50,
  pro: 200,
  agency: 500,
};

const PLAN_PRICES = {
  starter: 30,
  pro: 79,
  agency: 199,
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { planId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!planId || !PLAN_PRICES[planId as keyof typeof PLAN_PRICES]) {
      return res.status(400).json({ message: "Invalid plan ID" });
    }

    const price = PLAN_PRICES[planId as keyof typeof PLAN_PRICES];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${planId.toUpperCase()} Plan Credits`,
              description: `Purchase ${PLAN_CREDITS[planId as keyof typeof PLAN_CREDITS]} credits for Kreo.ai`,
            },
            unit_amount: price * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL || "http://localhost:8080"}/account?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || "http://localhost:8080"}/pricing?payment=cancel`,
      client_reference_id: userId,
      metadata: {
        planId,
        userId,
      },
    });

    return res.status(200).json({ success: true, url: session.url });
  } catch (error: any) {
    console.error("Stripe session error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const verifySession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid" || session.status !== "complete") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // Ensure user matches
    const sessionUserId = session.client_reference_id || session.metadata?.userId;
    if (sessionUserId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Check if this session has already been processed
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.paymentSessions?.includes(sessionId)) {
      return res.status(200).json({ success: true, message: "Already credited", credits: user.credits });
    }

    // Determine credits
    const planId = session.metadata?.planId;
    if (!planId || !PLAN_CREDITS[planId as keyof typeof PLAN_CREDITS]) {
      return res.status(400).json({ message: "Invalid plan in session metadata" });
    }

    const addedCredits = PLAN_CREDITS[planId as keyof typeof PLAN_CREDITS];

    // Update user credits and save session ID
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { 
        $inc: { credits: addedCredits },
        $push: { paymentSessions: sessionId }
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified, credits updated!",
      credits: updatedUser?.credits,
    });
  } catch (error: any) {
    console.error("Verify session error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).send("Webhook signature or secret missing");
  }

  let event: Stripe.Event;

  try {
    // req.body must be raw buffer for verification
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const userId = session.client_reference_id || session.metadata?.userId;
    const planId = session.metadata?.planId;

    if (userId && planId && PLAN_CREDITS[planId as keyof typeof PLAN_CREDITS]) {
      const addedCredits = PLAN_CREDITS[planId as keyof typeof PLAN_CREDITS];
      
      try {
        const user = await User.findOneAndUpdate(
          { id: userId },
          { $inc: { credits: addedCredits } },
          { new: true }
        );
        console.log(`Successfully added ${addedCredits} credits to user ${userId}. New total: ${user?.credits}`);
      } catch (dbErr) {
        console.error("Failed to update user credits in database:", dbErr);
        return res.status(500).send("Database update failed");
      }
    } else {
      console.warn("Webhook checkout.session.completed processed but missing metadata/userId", { userId, planId });
    }
  }

  return res.status(200).json({ received: true });
};
