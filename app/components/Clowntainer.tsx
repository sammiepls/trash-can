import { useState } from "react";
import { Login } from "./Login";
import { TrashForm } from "./TrashForm";

type Props = {};

export const Clowntainer = (props: Props) => {
  return (
    <aside className="bg-white rounded-md p-8 mb-6 relative min-h-20">
      <Login />
      <span className="speech" />
    </aside>
  );
};
