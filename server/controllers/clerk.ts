import { Request, Response } from "express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { prisma } from "../configs/prisma.js";

export const clerkWebhooks = async (req: Request, res: Response) => {
      console.log("CLERK WEBHOOK HIT"); 

  try {
    const evt = await verifyWebhook(req, {
  signingSecret: process.env.CLERK_WEBHOOK_SECRET!,
});
    const { data, type } = evt;

    switch (type) {
      case "user.created":
        await prisma.user.create({
          data: {
            id: data.id,
            email: data.email_addresses[0]?.email_address,
            name: `${data.first_name ?? ""} ${data.last_name ?? ""}`,
            image: data.image_url,
          },
        });
        break;

      case "user.updated":
        await prisma.user.upsert({
          where: { id: data.id },
          update: {
            email: data.email_addresses[0]?.email_address,
            name: `${data.first_name ?? ""} ${data.last_name ?? ""}`,
            image: data.image_url,
          },
          create: {
            id: data.id,
            email: data.email_addresses[0]?.email_address,
            name: `${data.first_name ?? ""} ${data.last_name ?? ""}`,
            image: data.image_url,
          },
        });
        break;

      case "user.deleted":
        await prisma.user.delete({
          where: { id: data.id },
        });
        break;

      case "paymentAttempt.updated": {
        if (
          (data.charge_type === "recurring" ||
            data.charge_type === "checkout") &&
          data.status === "paid"
        ) {
          const credits = {
            pro: 80,
            premium: 300,
          };

          const clerkUserId = data?.payer?.user_id;
          const planId = data?.subscription_items?.[0]?.plan?.slug;

          if (!clerkUserId) break;
          if (planId !== "pro" && planId !== "premium") break;

          await prisma.user.update({
            where: { id: clerkUserId },
            data: {
              credits: { increment: credits[planId] },
    
            },
          });
        }
        break;
      }

      default:
        console.log("Unhandled event type:", type);
    }

    return res
      .status(200)
      .json({ success: true, message: `webhook received: ${type}` });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return res.status(200).json({ success: false }); // always 200 for webhooks
  }
};

export default clerkWebhooks;
