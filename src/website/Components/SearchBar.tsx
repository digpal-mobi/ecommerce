"use client";

import React, { useEffect, useState } from "react";
import { SearchIcon } from "@/website/lib/Icons";
import Input from "@/website/components/common/Input";
import { useFilters } from "@/website/hooks/useFilters";

const SearchBar = () => {
  const { filters, applyFilters } = useFilters();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(filters.q);
  }, [filters.q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    applyFilters({
      q: searchQuery.trim(),
    });
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
