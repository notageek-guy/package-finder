import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";
import SearchBox from "@/components/SearchBox";
import Details from "@/components/Details";
import Footer from "@/components/Footer";
import { FiCopy } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
export default function Home() {
  const [packageName, setPackageName] = useState<string>("");

  const notify = () => toast("Copied to clipboard!");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fetchData = async () => {
    try {
      const res = await fetch(`/api/getdownloads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageName,
        }),
      });
      const data = await res.json();
      setData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(data.link);
      notify();
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  }

  async function copyCodeToClipboard() {
    try {
      await navigator.clipboard.writeText(` ${data?.commandToDownload} --save`);
      notify();
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  }
  return (
    <>
      <Head>
        <title>Package finder</title>
        <meta name="description" content="Find npm package downloads" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-gradient-to-br from-black to-gray-800 min-h-screen">
          <div className="container p-4 mx-auto">
            <h1 className="text-2xl text-white font-bold sm:text-4xl md:text-5xl lg:text-6xl text-center">
              Package finder
            </h1>
            <div className="float-right p-2">
              <Link href="" passHref>
                <FaGithub className="text-white text-2xl" />
              </Link>
            </div>

            <div className="max-w-lg mx-auto mt-12">
              <SearchBox
                packageName={packageName}
                setPackageName={setPackageName}
                fetchData={fetchData}
              />
              {data && (
                <Details
                  downloads={data.downloads}
                  version={data.version}
                  link={data.link}
                  copyToClipboard={copyToClipboard}
                />
              )}
            </div>
            {data && (
              <div className="max-w-lg mx-auto mt-12">
                <div
                  className="bg-white shadow-lg rounded-lg p-4 cursor-pointer
              "
                >
                  <code className="text-black">
                    {data?.commandToDownload} --save
                  </code>
                  <FiCopy
                    onClick={copyCodeToClipboard}
                    className="float-right"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
