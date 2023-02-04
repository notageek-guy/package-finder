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
  const [packageName, setPackageName] = useState<string>("node");

  const notify = () => toast("Copied to clipboard!");
  const [packageData, setPackageData] = useState<{
    name: string;
    version: string;
    link: string;
    downloads: string;
    commandToDownload: string;
  }>({
    name: "node",
    version: "19.6.0",
    link: "github.com/aredridel/node-bin-gen#readme",
    commandToDownload: "npm i node",
    downloads: "402,746",
  });

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
      setPackageData({
        name: data.name,
        version: data.version,
        link: data.link,
        downloads: data.downloads,
        commandToDownload: data.commandToDownload,
      });
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(packageData.link);
      notify();
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  }

  async function copyCodeToClipboard() {
    try {
      await navigator.clipboard.writeText(
        ` ${packageData?.commandToDownload} --save`
      );
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
        <div className="min-h-screen bg-gradient-to-br from-black to-gray-800">
          <div className="container p-4 mx-auto">
            <h1 className="text-2xl font-bold text-center text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Package finder
            </h1>
            <div className="float-right p-2">
              <Link href="" passHref>
                <FaGithub className="text-2xl text-white" />
              </Link>
            </div>

            <div className="max-w-lg mx-auto mt-12">
              <SearchBox
                packageName={packageName}
                setPackageName={setPackageName}
                fetchData={fetchData}
              />
              {!loading && (
                <Details
                  downloads={packageData?.downloads}
                  version={packageData?.version}
                  link={packageData?.link}
                  copyToClipboard={copyToClipboard}
                />
              )}
            </div>
            {!loading && (
              <div className="max-w-lg mx-auto mt-12">
                <div className="p-4 bg-white rounded-lg shadow-lg cursor-pointer ">
                  <code className="text-black">
                    {packageData?.commandToDownload} --save
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
