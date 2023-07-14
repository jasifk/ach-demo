import Layout from "@/components/layout";
import { GetServerSidePropsContext } from "next";
import Stripe from "stripe";

export default function Success({
  setupIntent,
  error,
}: {
  setupIntent: Stripe.Response<Stripe.SetupIntent>;
  error: string;
}) {
  return (
    <Layout>
      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl mb-3 font-medium text-gray-900 dark:text-white">
          Payment Info
        </h5>

        {setupIntent ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Key Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    ID
                  </th>
                  <td className="px-6 py-4">
                    <pre>{setupIntent.id}</pre>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    STATUS
                  </th>
                  <td className="px-6 py-4">
                    <pre>{setupIntent.status}</pre>
                  </td>
                </tr>
                {setupIntent.status == "requires_action" && (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      LINK
                    </th>
                    <td className="px-6 py-4">
                      <a
                        href={
                          setupIntent.next_action?.verify_with_microdeposits
                            ?.hosted_verification_url
                        }
                      >
                        Verify
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Error!</span> {error}
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  try {
    const id = query.setup_intent as string;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2022-11-15",
    });
    const setupIntent = await stripe.setupIntents.retrieve(id);
    return {
      props: { setupIntent: { ...setupIntent } },
    };
  } catch (error) {
    return {
      props: {
        error: (error as Error).message,
      },
    };
  }
}
