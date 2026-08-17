"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import TitleTag from "@/website/components/common/TitleTag";
import { ChevronDown } from "@/website/lib/Icons";
import { useDispatch, useSelector } from "@/redux/store";
import SortingOption from "@/website/data/SortingOptions";
import {
  setSortBy,
  setSortOrder,
  setSortingLabel,
} from "@/redux/slices/sortingSlice";

const SortingComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const { sortingLabel } = useSelector((state) => state.sorting);

  const handleSelect = (sorting: (typeof SortingOption)[number]) => {
    dispatch(setSortBy(sorting.sortBy));
    dispatch(setSortOrder(sorting.sortOrder));
    dispatch(setSortingLabel(sorting.label));

    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sorting.sortBy);
    if (sorting.sortOrder) {
      params.set("sortOrder", sorting.sortOrder);
    } else {
      params.delete("sortOrder");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  useEffect(() => {
    const urlSortBy = searchParams.get("sortBy");
    const urlSortOrder = searchParams.get("sortOrder") ?? "";

    if (urlSortBy) {
      const match = SortingOption.find(
        (o) => o.sortBy === urlSortBy && o.sortOrder === urlSortOrder,
      );
      if (match) {
        dispatch(setSortBy(match.sortBy));
        dispatch(setSortOrder(match.sortOrder));
        dispatch(setSortingLabel(match.label));
      }
    }
  }, []);

  return (
    <div className="relative">
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
            key={sorting.id}
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
