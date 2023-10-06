import { CharacterType } from "@/types/CharacterType";

interface CharacterCompProps {
  char: CharacterType;
}
export default function CharacterComp(prop: CharacterCompProps) {
  const { char } = prop;
  return (
    char && (
      <div className="">
        <a
          href="#"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {char.name}
          </h5>
          <ol>
            <li className="font-normal text-gray-700 dark:text-gray-400">
              <p className="font-bold">Films</p>
              {char.films.map((film) => (
                <p key={film}>{film}</p>
              ))}
            </li>
            <li className="font-normal text-gray-700 dark:text-gray-400 mt-5">
              <p className="font-bold">Starships</p>
              {char.starships.map((starship) => (
                <p key={starship}>{starship}</p>
              ))}
            </li>
          </ol>
        </a>
      </div>
    )
  );
}
