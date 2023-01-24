import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET!;
  const sig = req.headers["stripe-signature"] || "";
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    return;
  }

  const paymentIntent = event.data.object;
  console.log(paymentIntent);
  switch (event.type) {
    case "payment_intent.payment_failed":
      break;
    case "payment_intent.requires_action":
      // Then define and call a function to handle the event payment_intent.requires_action
      break;
    case "payment_intent.succeeded":
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.send("");
}
