import { Link, useFetcher } from "@remix-run/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const loadRandomJoke = async () => {
    await fetcher.load("/jokes");
  };

  useEffect(() => {
    if (fetcher.data) {
      navigate(`/joke/${fetcher.data.joke.id}`);
    }
  }, [fetcher.data, navigate]);

  return (
    <div className="h-screen flex flex-col p-4">
      <nav className="order-last flex justify-between text-5xl">
        {/* <Link to="/joke/new"> */}
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
        {fetcher.state === "idle" ? (
          <button
            onClick={loadRandomJoke}
            className="text-9xl my-10 mx-auto text-center relative"
          >
            🗑
            {<span className="absolute left-0 bottom-8">🔥</span>}
          </button>
        ) : (
          <div className="text-9xl my-10 mx-auto text-center relative">⏳</div>
        )}
        {fetcher.state === "idle" && children}
      </main>
    </div>
  );
}
