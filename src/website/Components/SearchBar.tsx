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
        id="search-products-input"
        aria-label="Search for products"
        className="!py-[0px] bg-transparent pl-[32px] border-none shadow-none focus:outline-none"
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
    <div className="relative flex w-full items-center justify-start gap-[12px] rounded-full bg-[#F0F0F0] py-[13px] px-[16px]">
      <SearchIcon
        color="#00000066"
        className="absolute top-1/2 left-4 z-10 -translate-y-1/2 pointer-events-none"
      />
      <Suspense
        fallback={
          <form className="w-full">
            <Input
              id="search-products-fallback"
              aria-label="Search for products"
              className="!py-[0px] bg-transparent pl-[32px] border-none shadow-none focus:outline-none"
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
