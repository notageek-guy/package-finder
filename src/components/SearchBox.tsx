
export default function SearchBox({
  packageName,
  setPackageName,
  fetchData,
}: {
  packageName: string;
  setPackageName: (value: string) => void;
  fetchData: () => void;
}) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <input
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
        type="text"
        className={`
                    max-w-full w-full sm:max-w-sm lg:max-w-lg   
                    px-4 py-3 rounded-md shadow-lg
                    bg-white  focus:outline-none focus:ring-2
                  `}
        placeholder="Enter  package name"
      />
      <button
        type="submit"
        onClick={fetchData}
        className="
                  px-4 py-2
                bg-green-500 rounded-md 
                text-white  font-bold  hover:bg-green-600 "
      >
        Search
      </button>
    </div>
  );
}
