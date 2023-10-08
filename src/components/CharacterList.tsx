"use client";
export function CharacterList({ children }: { children: React.ReactNode; }) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Height
          </th>
          <th scope="col" className="px-6 py-3">
            Gender
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
