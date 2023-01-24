import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "USD",
    payment_method_types: ['us_bank_account'],
  });

  const { client_secret: clientSecret } = paymentIntent;
  console.log({ clientSecret });
  res.status(200).json({ clientSecret });
}
