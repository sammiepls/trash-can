import { Login } from "./Login";

type Props = {};

export const Clowntainer = (props: Props) => {
  return (
    <aside className="bg-white rounded-md p-4 mb-6 relative min-h-20">
      <Login />
      <span className="speech" />
    </aside>
  );
};
