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
  return <Layout>{joke.content}</Layout>;
}
