import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const InputSearch = ({ applySearch }) => {
  const [search, setSearch] = useState("");

  //console.log("search:", search);
  
  const updateInputValue = (val) => {
      applySearch(val);
      setSearch(val)
  };

  return (
    <div className="relative mr-5">
      <div className="absolute ml-2 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className=" w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        value={search}
        onChange={(e) => updateInputValue(e.target.value)}
        type="search"
        id="default-search"
        className="p-2 pl-7 w-80 focus:outline-none focus-visible:border-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-none "
        placeholder="Tìm kiếm..."
      />
    </div>
  );
};
