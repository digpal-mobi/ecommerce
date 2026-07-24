import React from "react";
import { SearchIcon } from "../lib/Icons";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <div className="flex relative w-full items-center max-w-[577px] justify-start gap-[12px] rounded-full bg-[#F0F0F0] pl-[12px] py-[13px]">
      <SearchIcon className="absolute top-1/2 " />
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full outline-none ring-0"
      />
    </div>
  );
};

export default SearchBar;
