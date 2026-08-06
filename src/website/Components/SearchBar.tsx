import React from "react";
import { SearchIcon } from "@/website/lib/Icons";
import Input from "@/website/Components/common/Input";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <div className="flex relative w-full items-center justify-start gap-[12px] rounded-full bg-[#F0F0F0] pl-[12px] py-[13px]">
      <SearchIcon className="absolute top-1/2 left-3 z-100" />
      <Input type="text" placeholder="Search for Products.." />
    </div>
  );
};

export default SearchBar;
