import { Outlet, Link } from "@remix-run/react";
import { LinksFunction } from "@remix-run/server-runtime";

export default function IndexRoute() {
  return (
    <div className="h-screen flex flex-col p-4">
      <nav className="order-last flex justify-between text-5xl">
        <button>🤡</button>
        <button>🔥</button>
      </nav>
      <header>
        <h1 className="text-white text-center text-5xl mt-10">
          Trash CAN not Trash cannot
        </h1>
      </header>
      <main className="flex-1 h-screen py-10 flex flex-col">
        <button className="text-9xl my-10 mx-auto text-center">🗑</button>

        <div>
          <p className="text-center text-xl text-gray-300	">
            Ready for some HOT garbage? <br /> Tap the trash can
          </p>
        </div>
      </main>
    </div>
  );
}
