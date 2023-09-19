import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  // const customer = await stripe.customers.create({
  //   email: "jasifk@newagesmb.com",
  //   name: "Jasif Shameem K",
  // });

  // console.log({ customer })

  // const setupIntent = await stripe.setupIntents.create({
  //   customer: 'cus_OGHDocHrvlsxvu', //customer.id,
  //   payment_method_types: ["card"],
  //   payment_method_options: {
  //     us_bank_account: {
  //       financial_connections: {
  //         permissions: ["payment_method", "balances"],
  //       },
  //     },
  //   },
  // });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "USD",
    payment_method_types: ["card"],
  });

  const { client_secret: clientSecret } = paymentIntent;
  console.log({ clientSecret });
  res.status(200).json({ clientSecret });
}
