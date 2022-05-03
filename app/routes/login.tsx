import { Outlet, Link } from "@remix-run/react";
import { json, LinksFunction, LoaderFunction } from "@remix-run/server-runtime";

import Layout from "~/components/Layout";
import { Clowntainer } from "../components/Clowntainer";
import { Login } from "~/components/Login";

import type { Joke } from "@prisma/client";
import { db } from "../utils/db.server";

type LoaderData = { jokes: Array<Joke> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    jokes: await db.joke.findMany(),
  };
  return json(data);
};

export default function LoginRoute() {
  return (
    <Layout>
      <aside className="bg-white rounded-md p-8 relative min-h-20 mt-auto">
        <span className="speech" />
        <Login />
      </aside>
    </Layout>
  );
}
