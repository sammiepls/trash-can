import { Outlet, Link } from "@remix-run/react";

export default function IndexRoute() {
  return (
    <div>
      <h1>Trash CAN not Trash cannot</h1>
      <Link to="trash" className="text-red-600 underline">
        Trash
      </Link>
      <Outlet />
    </div>
  );
}
