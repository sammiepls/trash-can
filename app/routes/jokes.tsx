import { db } from "../utils/db.server";

type LoaderData = { jokes: Array<Joke> };

function pickRandomJoke(jokes: Joke[]) {
  return jokes[Math.round(Math.random() * jokes.length - 1)].id;
}

export async function loader({ params }) {
  const data: LoaderData = {
    jokes: await db.joke.findMany(),
  };
  return data;
}
