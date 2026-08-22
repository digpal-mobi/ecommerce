"use client";

import React, { Suspense, useEffect, useState } from "react";
import { SearchIcon } from "@/website/Lib/Icons";
import Input from "@/website/Components/Common/Input";
import { useFilters } from "@/website/Hooks/UseFilters";
import { useRouter } from "next/navigation";

const SearchBarContent = () => {
  const { filters, applyFilters } = useFilters();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    setSearchQuery(filters.q);
  }, [filters.q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    applyFilters({ q: searchQuery.trim() });
    router.push(`/shop?q=${searchQuery.trim()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        className="!py-[0px]"
        type="text"
        placeholder="Search for Products.."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

const SearchBar = () => {
  return (
    <div className="relative flex w-full items-center justify-start gap-[12px] rounded-full bg-[#F0F0F0] py-[13px] pl-[12px]">
      <SearchIcon className="absolute top-1/2 left-3 z-100 -translate-y-1/2" />
      <Suspense
        fallback={
          <form className="w-full">
            <Input
              className="!py-[0px]"
              type="text"
              placeholder="Search for Products.."
              value=""
              readOnly
            />
          </form>
        }
      >
        <SearchBarContent />
      </Suspense>
    </div>
  );
};

export default SearchBar;
