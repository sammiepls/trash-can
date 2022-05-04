import { Outlet, Link } from "@remix-run/react";
import { LinksFunction, LoaderFunction } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { Joke } from "@prisma/client";

import Layout from "~/components/Layout";
import { db } from "../utils/db.server";

type LoaderData = { jokes: Array<Joke> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    jokes: await db.joke.findMany(),
  };
  return json(data);
};

function pickRandomJoke(jokes: Joke[]) {
  console.log(jokes);
  return jokes[Math.round(Math.random() * jokes.length - 1)].id;
}

export default function IndexRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <Layout>
      {/* <Link
        to={`joke/${pickRandomJoke(data.jokes)}`}
        className="text-9xl my-10 mx-auto text-center relative"
      >
        🗑
        {<span className="absolute left-0 bottom-8">🔥</span>}
      </Link> */}
      <div>
        <p className="text-center text-xl text-gray-300	">
          Ready for some garbage? <br /> Tap the trash can
        </p>
      </div>
    </Layout>
  );
}
