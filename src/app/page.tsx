import { CharacterList } from "../components/CharacterList";
import { CharacterType } from "@/types/CharacterType";
import CharacterItem from "@/components/CharacterItem";
import { Suspense } from "react";

export async function fetchStarWarsData() {
  const response = await fetch('https://swapi.dev/api/people/', {
    next :{
      revalidate: 3600,
    }
  })
  const peopleData = await response.json()
  return peopleData;
}

export default async function Home() {
  const starWarsData = await fetchStarWarsData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <div className="m-5 absolute top-0 left-auto right-auto flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-5xl relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert">
          Star Wars App
        </h1>
      </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <CharacterList>
            {starWarsData.results &&
              starWarsData.results.map((person: CharacterType) => (
                <Suspense key={person.name} fallback={<div>Loading...</div>}>
                <CharacterItem key={person.name} char={person} />
                </Suspense>
              ))}
          </CharacterList>
        </div>
    </main>
  );
}
