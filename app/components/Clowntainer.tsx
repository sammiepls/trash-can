export const Clowntainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="bg-white rounded-2xl p-8  relative min-h-20 shadow-md mt-auto">
      {children}
      <span className="speech" />
    </aside>
  );
};
