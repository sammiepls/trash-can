import { Joke } from "@prisma/client";
import { json } from "@remix-run/server-runtime";
import { db } from "../utils/db.server";

type LoaderData = { joke: Joke };

export async function loader() {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber,
  });

  const data: LoaderData = {
    joke: randomJoke,
  };
  return json(data);
}
