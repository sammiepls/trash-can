import { Link, useFetcher } from "@remix-run/react";
import { ReactChildren, useEffect, useState } from "react";

import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import type { Joke } from "@prisma/client";

// type LoaderData = { jokes: Array<Joke> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    jokes: await db.joke.findMany(),
  };
  return json(data);
};

function pickRandomJoke(jokes: Joke[]) {
  return jokes[Math.round(Math.random() * jokes.length)]?.id;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [jokeId, setJokeId] = useState<string>();
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.load("/jokes");
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      const randomJoke = pickRandomJoke(fetcher.data.jokes);
      setJokeId(randomJoke || fetcher.data.jokes[0].id);
    }
  }, [fetcher.data]);

  return (
    <div className="h-screen flex flex-col p-4">
      <nav className="order-last flex justify-between text-5xl">
        <Link to="/login">
          <button>🤡</button>
        </Link>
        <button>🔥</button>
      </nav>
      <header>
        <h1 className="text-white text-center text-5xl mt-10">
          Trash CAN not Trash cannot
        </h1>
      </header>
      <main className="flex-1 h-screen py-10 flex flex-col">
        <Link
          to={`/joke/${jokeId}`}
          reloadDocument
          className="text-9xl my-10 mx-auto text-center relative"
        >
          <button className="text-9xl my-10 mx-auto text-center relative">
            🗑
            {<span className="absolute left-0 bottom-8">🔥</span>}
          </button>
        </Link>
        {children}
      </main>
    </div>
  );
}
