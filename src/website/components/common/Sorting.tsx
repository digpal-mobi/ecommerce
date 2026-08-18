"use client";

import { useState } from "react";

import TitleTag from "@/website/components/common/TitleTag";
import { ChevronDown } from "@/website/lib/Icons";
import SortingOption from "@/website/data/SortingOptions";

import { useFilters } from "@/website/hooks/useFilters";

const SortingComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { sortBy, sortOrder, applySorting } = useFilters();

  const selectedSorting = SortingOption.find(
    (option) => option.sortBy === sortBy && option.sortOrder === sortOrder,
  );

  const sortingLabel = selectedSorting?.label ?? "Price: low to high";

  const handleSelect = (sorting: (typeof SortingOption)[number]) => {
    applySorting(sorting.sortBy, sorting.sortOrder);

    setIsOpen(false);
  };

  return (
    <div className="relative bg-[#dedddd] rounded-md border border-[#000000]/10 px-[10px] py-[10px]">
      <button
        type="button"
        className="flex items-center gap-[5px]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <TitleTag variant="satoshiBold" as="span">
          {sortingLabel}
        </TitleTag>

        <ChevronDown
          className={`h-[10px] w-[10px] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute right-[-16%] top-[70%] z-50 mt-[10px] w-[200%] rounded-md border border-[#000000]/10 bg-white px-[10px] py-[10px] shadow-2xl transition-all duration-200 ease-out origin-top-right ${
          isOpen
            ? "scale-115 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {SortingOption.map((sorting) => (
          <button
            key={sorting.label}
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-[20px]"
            onClick={() => handleSelect(sorting)}
          >
            <TitleTag
              as="span"
              variant="satoshiBold"
              className="w-full rounded-md py-[8px] text-left! text-[12px] hover:bg-[#000000]/30"
            >
              {sorting.label}
            </TitleTag>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortingComponent;
