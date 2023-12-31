import React from "react";

interface PaginationProps {
  nextPageUrl: string | null;
  previousPageUrl: string | null;
  count: number;
  pageNumber?: number;
  onPageChange: (newPageUrl: string) => void;
}

export default function Pagination(props: PaginationProps) {
  const { nextPageUrl, previousPageUrl, count, onPageChange, pageNumber } =
    props;

  return (
    <nav className="flex justify-center" aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          {previousPageUrl ? (
            <a
              onClick={() => onPageChange(previousPageUrl)}
              className="cursor-pointer flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          ) : (
            <span className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg">
              Previous
            </span>
          )}
        </li>
        {count &&
          Array(Math.ceil(count / 10))
            .fill(null)
            .map((_, page) => (
              <li key={page}>
                <a
                  onClick={() =>
                    onPageChange(
                      `https://swapi.dev/api/people/?page=${page + 1}`
                    )
                  }
                  className={`flex items-center justify-center px-3 h-8 leading-tight dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    pageNumber === page + 1
                      ? "bg-blue-300 text-gray-500 hover:bg-blue-400 hover:text-gray-700"
                      : "cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  }`}
                >
                  {page + 1}
                </a>
              </li>
            ))}

        <li>
          {nextPageUrl ? (
            <a
              onClick={() => onPageChange(nextPageUrl)}
              className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          ) : (
            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg">
              Next
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
