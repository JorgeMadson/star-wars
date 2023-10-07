import { CharacterType } from "@/types/CharacterType";

interface CharacterCompProps {
  char: CharacterType;
}
export default function CharacterComp(prop: CharacterCompProps) {
  const { char } = prop;
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
      </tr>
    )
  );
}
