export const Login = () => {
  return (
    <form className="flex flex-col items-center">
      <h2 className="text-lg mb-4">Prove your clownery</h2>
      <label>
        <h3>Name</h3>
        <input
          className="bg-gray-200 mt-2 mb-4 py-2 px-4 rounded-md outline-none focus:border-red-200 border-4"
          placeholder="Who are you"
          type="text"
        />
      </label>
      <label>
        <h3>Password</h3>
        <input
          className="bg-gray-200 mt-2 mb-4 py-2 px-4 rounded-md outline-none focus:border-red-200 border-4"
          placeholder="********"
          type="text"
        />
      </label>
      <button className="bg-red-400 mt-2 py-2 px-10 rounded-md text-white text-center block">
        🚀 Submit
      </button>
    </form>
  );
};
