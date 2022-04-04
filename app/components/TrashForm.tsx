export const TrashForm = () => {
  return (
    <form className="flex flex-col items-center">
      <h2 className="text-lg mb-4">Clown mode activated</h2>
      <label className="w-full">
        <textarea
          rows={8}
          placeholder="As if we need April to be fools"
          className="bg-gray-200 mt-2 mb-4 py-2 px-4 rounded-md w-full resize-none outline-none focus:border-red-200 border-4"
        />
      </label>
      <button className="bg-red-400 mt-2 py-2 px-10 rounded-md text-white text-center block">
        🚀 Submit
      </button>
    </form>
  );
};
