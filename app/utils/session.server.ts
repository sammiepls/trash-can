import bcrypt from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

import { db } from "./db.server";

type LoginForm = {
  name: string;
  password: string;
};

export async function login({ name, password }: LoginForm) {
  const clown = await db.clown.findUnique({
    where: { name },
  });

  if (!clown) return null;

  const isCorrectPassword = await bcrypt.compare(password, clown.passwordHash);

  if (!isCorrectPassword) return null;

  return {
    id: clown.id,
    name,
  };
}

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "CLOWN_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(clownId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("clownId", clownId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

function getClownSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getClownId(request: Request) {
  const session = await getClownSession(request);
  const clownId = session.get("clownId");
  if (!clownId || typeof clownId !== "string") return null;
  return clownId;
}

export async function requireClownId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getClownSession(request);
  const clownId = session.get("clownId");
  if (!clownId || typeof clownId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return clownId;
}
