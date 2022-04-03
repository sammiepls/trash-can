import { Link } from "@remix-run/react";

export default function TrashIndex() {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create a New Trash
      </Link>
    </p>
  );
}
