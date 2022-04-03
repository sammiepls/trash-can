import { LiveReload, Outlet, Links } from "@remix-run/react";
import { LinksFunction } from "@remix-run/server-runtime";

import globalStylesUrl from "~/styles/global.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStylesUrl }];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: So great, it's funny!</title>
        <Links />
      </head>
      <body>
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}
