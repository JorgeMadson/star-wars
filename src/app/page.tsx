"use client";
import { useState, useEffect } from "react";
import { CharacterType } from "@/types/CharacterType";
import CharacterComp from "@/components/CharacterComp";
import Pagination from "@/components/Pagination";

async function getData(url: string) {
  const res = await fetch(url, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<[CharacterType] | null>(null);
  const [pageInfo, setPageInfo] = useState<{
    next: string | null;
    previous: string | null;
    count: number;
    pageNumber?: number;
  }>({ next: null, previous: null, count: 0, pageNumber: 0 });
  const [error, setError] = useState<string | null>(null);

  async function fetchData(url: string) {
    try {
      const response = await getData(url);
      const { results, count, next, previous } = response;
      let pageNumber = next.slice(-1) - 1 || 0;
      console.log(response);
      setData(results);
      setPageInfo({ next, previous, count, pageNumber });
      setLoading(false);
    } catch (error) {
      setError("Failed to load data");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData("https://swapi.dev/api/people/");
  }, []);

  const handlePageChange = (newPageUrl: string) => {
    setLoading(true);
    fetchData(newPageUrl);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-5xl relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert">
          Star Wars App
        </h1>
      </div>

      {error && <p>Error: {error}</p>}

      {loading ? (
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      ) : (
        <div className="max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Characters
            </h5>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              View all
            </a>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {data &&
                data.map((person) => (
                  <CharacterComp key={person.name} char={person} />
                ))}
            </ul>
          </div>
          <Pagination
            nextPageUrl={pageInfo.next}
            previousPageUrl={pageInfo.previous}
            count={pageInfo.count}
            pageNumber={pageInfo.pageNumber}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </main>
  );
}
