import { Outlet, Link } from "@remix-run/react";
import { LinksFunction } from "@remix-run/server-runtime";
import { useState } from "react";

import { Clowntainer } from "~/components/Clowntainer";

export default function IndexRoute() {
  const [showClowntainer, setShowClowntainer] = useState(true);
  const [onFire, setOnFire] = useState(true);

  return (
    <div className="h-screen flex flex-col p-4">
      <nav className="order-last flex justify-between text-5xl">
        <button onClick={() => setShowClowntainer(!showClowntainer)}>🤡</button>
        <button onClick={() => setOnFire(!onFire)}>🔥</button>
      </nav>
      <header>
        <h1 className="text-white text-center text-5xl mt-10">
          Trash CAN not Trash cannot
        </h1>
      </header>
      <main className="flex-1 h-screen py-10 flex flex-col">
        <button className="text-9xl my-10 mx-auto text-center relative">
          🗑
          {onFire && <span className="absolute left-0 bottom-8">🔥</span>}
        </button>

        <div>
          <p className="text-center text-xl text-gray-300	">
            Ready for some {onFire ? `HOT` : ``} garbage? <br /> Tap the trash
            can
          </p>
        </div>
      </main>
      {showClowntainer && <Clowntainer />}
    </div>
  );
}
