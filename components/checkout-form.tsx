import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import React from "react";

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();

  async function _handleProceddButton(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env
          .NEXT_PUBLIC_BASE_URL!}/success?clientSecret=${clientSecret}`,
      },
    });

    console.error(error);
  }

  return (
    <>
      <PaymentElement
        options={{
          fields: {
            billingDetails: {
              name: "never",
              email: "never",
            },
          },
        }}
      />
      <button
        type="button"
        onClick={_handleProceddButton}
        className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Proceed
      </button>
    </>
  );
}
