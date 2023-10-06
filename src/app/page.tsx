"use client";
import { useState, useEffect } from "react";
import { CharacterType } from "@/types/CharacterType";
import CharacterComp from "@/components/CharacterComp";

async function getData() {
  const res = await fetch("https://swapi.dev/api/people/", {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CharacterType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // const { results, count, next, previous }: Character = await getData();
        const charactersData  = await getData();
        setData(charactersData.results[0]);
        setLoading(false);
      } catch (error) {
        setError("Failed to load data");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-5xl relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert">
          Star Wars App
        </h1>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {data && <CharacterComp char={data} />}
    </main>
  );
}
