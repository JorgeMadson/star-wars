"use client";
import { useState, useEffect, ReactNode } from "react";
import { CharacterList } from "../components/CharacterList";
import { CharacterType } from "@/types/CharacterType";
import { LoadingIcon } from "../components/LoadingIcon";
import CharacterItem from "@/components/CharacterItem";
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
    setError("");
    fetchData(newPageUrl);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <div className="m-5 absolute top-0 left-auto right-auto flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-5xl relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert">
          Star Wars App
        </h1>
      </div>

      {error && <p>Error: {error}</p>}

      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <CharacterList>
            {data &&
              data.map((person) => (
                <CharacterItem key={person.name} char={person} />
              ))}
          </CharacterList>
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
