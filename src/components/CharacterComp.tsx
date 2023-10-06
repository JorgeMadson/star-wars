import { CharacterType } from "@/types/CharacterType";

interface CharacterCompProps {
  char: CharacterType;
}
export default function CharacterComp(prop: CharacterCompProps) {
  const { char } = prop;
  return (
    char && (
      <li className="py-3 sm:py-4">
        <div className="flex items-center justify-between space-x-4">
            <p className="font-semibold">{char.name}</p>
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Height: {char.height}cm
            </p>
            <p className="truncate">Gender: {char.gender}</p>
            {/* <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Films
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {char.films.map((film) => (
                  <p key={film}>{film}</p>
                ))}
              </p> */}
          {/* <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Starships
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {char.starships.map((starship) => (
                  <p key={starship}>{starship}</p>
                ))}
              </p>
            </div> */}
        </div>
      </li>
    )
  );
}
