import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

import Layout from "~/components/Layout";

export const loader: LoaderFunction = async ({ params }) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });

  return { joke };
};

export default function Joke() {
  const { joke } = useLoaderData();
  return (
    <Layout>
      <div className="bg-white rounded-md p-8 mb-6 relative min-h-20">
        {joke.content}
        <span className="speech up-middle" />
      </div>
    </Layout>
  );
}
