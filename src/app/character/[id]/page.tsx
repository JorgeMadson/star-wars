import { CharacterType } from "@/types/CharacterType";

async function getData(id: string) {
  const res = await fetch(`https://swapi.dev/api/people/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({params: { id },}: {params: { id: string };}) {
  const data: CharacterType = await getData(id);
  console.log(data)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <div className="mb-8 relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-5xl relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert">
          {data.name}
        </h1>
      </div>
      <div>
        <h3> Details</h3>
        <p><span className="font-semibold">Height: </span>{data.height} cm</p>
        <p><span className="font-semibold">Mass: </span>{data.mass} kg</p>
        <p><span className="font-semibold">Hair_color: </span>{data.hair_color}</p>
        <p><span className="font-semibold">Skin_color: </span>{data.skin_color}</p>
        <p><span className="font-semibold">Eye_color: </span>{data.eye_color}</p>
        <p><span className="font-semibold">Birth_year: </span>{data.birth_year}</p>
        <p><span className="font-semibold">Gender: </span>{data.gender}</p>
        <p><span className="font-semibold">Homeworld: </span>{data.homeworld}</p>
        <p><span className="font-semibold">Films: </span></p>
        <ul className="ml-5">{data.films.map(i => <li key={i} className="list-disc">{i}</li>)}</ul>
        <p><span className="font-semibold">Species: </span></p>
        <ul className="ml-5">{data.species.map(i => <li key={i} className="list-disc">{i}</li>)}</ul>
        <p><span className="font-semibold">Vehicles: </span></p>
        <ul className="ml-5">{data.vehicles.map(i => <li key={i} className="list-disc">{i}</li>)}</ul>
        <p><span className="font-semibold">Starships: </span></p>
        <ul className="ml-5">{data.starships.map(i => <li key={i} className="list-disc">{i}</li>)}</ul>
        <p><span className="font-semibold">Created: </span>{data.created}</p>
        <p><span className="font-semibold">Edited: </span>{data.edited}</p>
        <p><span className="font-semibold">Url: </span>{data.url}</p>
      </div>
    </main>
  );
}
