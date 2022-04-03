import { Outlet, Link } from "@remix-run/react";
import { LinksFunction } from "@remix-run/server-runtime";

export default function IndexRoute() {
  return (
    <div className="h-screen">
      <nav>
        <a href="#">🤡</a>
        <a href="#">🔥</a>
      </nav>
      <h1>Trash CAN not Trash cannot</h1>
      <p>Ready for some HOT garbage? Tap the trash can</p>
    </div>
  );
}
