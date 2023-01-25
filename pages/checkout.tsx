import Layout from "@/components/layout";
import CheckoutForm from "@/components/checkout-form";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Checkout({ clientSecret }: { clientSecret: string }) {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "night",
    },
  };

  return (
    <Layout>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl mb-3 font-medium text-gray-900 dark:text-white">
          Payment Method
        </h5>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL!}api/create-payment-intent`
  );
  const data = await res.json();
  return {
    props: { ...data },
  };
}
