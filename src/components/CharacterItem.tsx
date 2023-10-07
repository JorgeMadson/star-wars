import { CharacterType } from "@/types/CharacterType";
import Link from "next/link";

interface CharacterItemProps {
  char: CharacterType;
}
export default function CharacterItem(prop: CharacterItemProps) {
  const { char } = prop;
  const charId = char.url.split("/")[5];
  return (
    char && (
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {char.name}
        </th>
        <td className="px-6 py-4">{char.height}cm</td>
        <td className="px-6 py-4">{char.gender}</td>
        <td className="px-6 py-4">
          <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            href={`/character/${charId}`}
          >
            Details
          </Link>
        </td>
      </tr>
    )
  );
}
