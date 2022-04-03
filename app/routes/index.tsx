import { Outlet, Link } from "@remix-run/react";
import { LinksFunction } from "@remix-run/server-runtime";

export default function IndexRoute() {
  return (
    <div className="h-screen flex flex-col p-4">
      <nav className="order-last flex justify-between text-5xl">
        <a href="#">🤡</a>
        <a href="#">🔥</a>
      </nav>
      <header>
        <h1 className="text-white text-center text-5xl">
          Trash CAN not Trash cannot
        </h1>
      </header>
      <main className="flex-1 h-screen py-10">
        <h1 className="text-9xl my-10 text-center">🗑</h1>

        <div>
          <p className="text-center">
            Ready for some HOT garbage? Tap the trash can
          </p>
        </div>
      </main>
    </div>
  );
}
