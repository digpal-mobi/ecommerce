"use client";

import React, { useState } from "react";
import { SearchIcon } from "@/website/lib/Icons";
import Input from "@/website/components/common/Input";
import { useDispatch } from "@/redux/store";
import { fetchSearchedProducts } from "@/redux/slices/productSlice";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState(""); 

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    if (!searchQuery.trim()) return;

    dispatch(fetchSearchedProducts({ query: searchQuery.trim() }));
  };

  return (
    <div className="relative flex w-full items-center justify-start gap-[12px] rounded-full bg-[#F0F0F0] py-[13px] pl-[12px]">
      <SearchIcon className="absolute top-1/2 left-3 z-100 -translate-y-1/2" />

      <form onSubmit={handleSubmit} className="w-full">
        <Input
          className="!py-[0px]"
          type="text"
          placeholder="Search for Products.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
