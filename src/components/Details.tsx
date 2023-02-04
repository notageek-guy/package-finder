import { Toaster } from "react-hot-toast";
import { AiOutlineLink } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";

export default function Details({
  downloads,
  version,
  link,
  copyToClipboard,
}: {
  downloads: string;
  version: string;
  link: string;
  copyToClipboard: () => void;
}) {
  return (
    <div className="max-w-full w-full sm:max-w-sm lg:max-w-lg   mx-auto mt-12 p-4 shadow-lg shadow-green-500 rounded  bg-white">
      <div className="flex items-center justify-between space-x-4  p-2">
        <FaDownload />
        <h1 className="text-2xl text-black ">{downloads}</h1>
      </div>
      <div className="flex items-center justify-between space-x-4 p-2">
        <h1 className="text-2xl text-black">Version</h1>
        <h1 className="text-2xl text-black ">{version}</h1>
      </div>
      <div className="flex items-center justify-between space-x-4 p-2">
        <AiOutlineLink onClick={copyToClipboard} />
        <Toaster />
        <h1 className="text-black overflow-ellipsis overflow-hidden">
          {link}
        </h1>
      </div>
    </div>
  );
}
