import { useLoaderData, useParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/{runtime}";
import { db } from "~/utils/db.server";

import Layout from "../../components/Layout";

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
      <div className="bg-white rounded-2xl p-8 mb-6 relative min-h-20 shadow-md">
        {joke.content}
        <span className="speech up-middle" />
      </div>
    </Layout>
  );
}
