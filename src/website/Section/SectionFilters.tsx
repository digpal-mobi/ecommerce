"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  SearchIcon,
  FilterIcon,
  ArrowLeft,
  CrossIcon,
} from "@/website/lib/Icons";
import Button from "@/website/components/common/Button";
import TitleTag from "@/website/components/common/TitleTag";
import Paragraph from "@/website/components/common/Paragraph";
import CheckBox from "@/website/components/common/CheckBox";
import { useFilters } from "@/website/hooks/useFilters";
import { MAX_PRICE, MIN_PRICE } from "@/redux/slices/filterSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { getCategories } from "@/redux/slices/productSlice";
import Input from "../components/common/Input";

const extraFilters = [
  {
    key: "brand",
    label: "Brand",
    options: ["Apple", "Samsung", "Realme", "Oppo", "Huawei", "Nokia"],
    multiple: true,
  },
  {
    key: "rating",
    label: "Rating",
    options: ["4", "3", "2", "1"],
    multiple: false,
  },
  {
    key: "availability",
    label: "Availability",
    options: ["in-stock", "low-stock"],
    multiple: false,
  },
  {
    key: "discount",
    label: "Discount",
    options: ["10", "20", "30"],
    multiple: false,
  },
];

function formatCategory(slug: string) {
  if (!slug) return "";
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatOption(key: string, option: string) {
  if (key === "rating") return `${option}★ & above`;
  if (key === "availability") {
    return option === "in-stock" ? "In Stock" : "Low Stock";
  }
  if (key === "discount") return `${option}% & above`;
  return option;
}

// function FilterSearch({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (value: string) => void;
// }) {
//   return (
//     <div className="flex h-[38px] w-full items-center gap-2 rounded-[8px] bg-[#F9F9F9] px-[12px] transition-colors focus-within:border-black">
//       {value && (
//         <button
//           type="button"
//           onClick={() => onChange("")}
//           className="cursor-pointer text-[12px] text-[#999999] hover:text-black"
//           aria-label="Clear search"
//         >
//           <CrossIcon />
//         </button>
//       )}
//     </div>
//   );
// }

function PriceFilter() {
  const { filters, applyFilters } = useFilters();
  const urlMin = filters.minPrice ?? MIN_PRICE;
  const urlMax = filters.maxPrice ?? MAX_PRICE;
  const [minPrice, setMinPrice] = useState(urlMin);
  const [maxPrice, setMaxPrice] = useState(urlMax);

  useEffect(() => {
    setMinPrice(urlMin);
    setMaxPrice(urlMax);
  }, [urlMin, urlMax]);

  const applyPrice = (min: number, max: number) => {
    applyFilters({
      minPrice: min <= MIN_PRICE ? null : min,
      maxPrice: max >= MAX_PRICE ? null : max,
    });
  };

  const handleMinChange = (value: number) => {
    const next = Math.min(Math.max(value, MIN_PRICE), maxPrice - 1);
    setMinPrice(next);
    applyPrice(next, maxPrice);
  };

  const handleMaxChange = (value: number) => {
    const next = Math.max(Math.min(value, MAX_PRICE), minPrice + 1);
    setMaxPrice(next);
    applyPrice(minPrice, next);
  };

  const minPercent = Math.max(
    0,
    Math.min(100, ((minPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100),
  );
  const maxPercent = Math.max(
    0,
    Math.min(100, ((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100),
  );

  return (
    <div className="flex w-full flex-col gap-[12px] pt-[14px]">
      <div className="flex w-full items-center justify-between">
        <Paragraph variant="normalPara" className="!text-[13px] text-[#777777]">
          From
        </Paragraph>
        <Paragraph variant="normalPara" className="!text-[13px] text-[#777777]">
          To
        </Paragraph>
      </div>
      <div className="flex w-full items-center justify-between gap-[8px]">
        <input
          type="text"
          placeholder={String(MIN_PRICE)}
          value={String(minPrice)}
          onChange={(e) => {
            const value = Number(e.target.value.replace(/\s/g, ""));
            if (!Number.isNaN(value)) handleMinChange(value);
          }}
          className="h-[38px] w-[100px] min-w-[90px] rounded-[6px] border border-[#D4D4D4] bg-transparent px-[10px] font-satoshi text-[13px] font-[500] text-black outline-none transition-colors focus:border-black"
        />
        <span className="h-[1px] w-[16px] shrink-0 bg-[#D4D4D4]" />
        <input
          type="text"
          placeholder={String(MAX_PRICE)}
          value={String(maxPrice)}
          onChange={(e) => {
            const value = Number(e.target.value.replace(/\s/g, ""));
            if (!Number.isNaN(value)) handleMaxChange(value);
          }}
          className="h-[38px] w-[100px] min-w-[90px] rounded-[6px] border border-[#D4D4D4] bg-transparent px-[10px] text-end font-satoshi text-[13px] font-[500] text-black outline-none transition-colors focus:border-black"
        />
      </div>
      <div className="relative mt-[14px] mb-[6px] flex h-[24px] w-full items-center">
        <div className="absolute top-1/2 right-0 left-0 h-[3px] -translate-y-1/2 rounded-full bg-[#E5E5E5]" />
        <div
          className="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-black"
          style={{
            left: `${minPercent}%`,
            width: `${Math.max(0, maxPercent - minPercent)}%`,
          }}
        />
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={1}
          value={minPrice}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="price-slider"
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={1}
          value={maxPrice}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="price-slider"
          aria-label="Maximum price"
        />
      </div>
    </div>
  );
}

function CategoryOptions({ categories }: { categories: any[] }) {
  const { filters, toggleCategory } = useFilters();
  const [search, setSearch] = useState("");

  const selectedCategory = Array.isArray(filters.category)
    ? filters.category
    : [];

  const isChecked = (slug: string) => {
    return selectedCategory.includes(slug);
  };

  const stringCategories = categories
    .map((item: any) =>
      typeof item === "string" ? item : item?.slug || item?.name || "",
    )
    .filter(Boolean);

  const visible = stringCategories.filter((option: string) =>
    formatCategory(option).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-[14px] pt-[14px]">
      {/* <FilterSearch value={search} onChange={setSearch} /> */}
      <div className="flex max-h-[240px] flex-col gap-[10px] overflow-y-auto pr-1">
        {visible.map((option) => {
          const checked = isChecked(option);
          return (
            <div
              key={option}
              className="flex cursor-pointer items-center gap-[10px] text-left transition hover:opacity-80"
              onClick={() => toggleCategory(option)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <CheckBox
                  checked={checked}
                  onChange={() => toggleCategory(option)}
                />
              </div>
              <Paragraph
                variant="normalPara"
                className={`!text-[13px] capitalize select-none ${
                  checked ? "!font-semibold !text-black" : "!text-[#555555]"
                }`}
              >
                {formatCategory(option)}
              </Paragraph>
            </div>
          );
        })}
        {visible.length === 0 && (
          <Paragraph
            variant="normalPara"
            className="!text-[12px] text-[#999999] py-2"
          >
            No categories found.
          </Paragraph>
        )}
      </div>
    </div>
  );
}

function FilterOptions({
  filterKey,
  options,
}: {
  filterKey: string;
  options: string[];
  multiple: boolean;
}) {
  const { filters, applyFilters } = useFilters();
  const [search, setSearch] = useState("");

  const getSelected = (): string[] => {
    if (filterKey === "brand") {
      return Array.isArray(filters.brand) ? filters.brand : [];
    }
    if (filterKey === "rating") {
      return filters.rating !== null &&
        filters.rating !== undefined &&
        Number(filters.rating) > 0
        ? [String(filters.rating)]
        : [];
    }
    return [];
  };

  const selected = getSelected();

  const handleToggle = (option: string) => {
    const isCurrentlyChecked = selected.includes(option);
    const nextChecked = !isCurrentlyChecked;

    if (filterKey === "brand") {
      const next = nextChecked
        ? [...selected, option]
        : selected.filter((item) => item !== option);
      applyFilters({ brand: next });
      return;
    }
    if (filterKey === "rating") {
      applyFilters({
        rating: nextChecked ? Number(option) : null,
      });
      return;
    }
  };

  const visible = options.filter((option) =>
    formatOption(filterKey, option)
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-[14px] pt-[14px]">
      {/* {options.length > 5 && (
        <FilterSearch value={search} onChange={setSearch} />
      )} */}
      <div className="flex max-h-[220px] flex-col gap-[10px] overflow-y-auto pr-1">
        {visible.map((option) => {
          const checked = selected.includes(option);
          return (
            <div
              key={option}
              className="flex cursor-pointer items-center gap-[10px] text-left transition hover:opacity-80"
              onClick={() => handleToggle(option)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <CheckBox
                  checked={checked}
                  onChange={() => handleToggle(option)}
                />
              </div>
              <Paragraph
                variant="normalPara"
                className={`!text-[13px] select-none ${
                  checked ? "!font-semibold !text-black" : "!text-[#555555]"
                }`}
              >
                {formatOption(filterKey, option)}
              </Paragraph>
            </div>
          );
        })}
        {visible.length === 0 && (
          <Paragraph
            variant="normalPara"
            className="!text-[12px] text-[#999999] py-2"
          >
            No options found.
          </Paragraph>
        )}
      </div>
    </div>
  );
}

function useCategories(serverCategories: any = []) {
  const dispatch = useDispatch();
  const storedCategories = useSelector((state) => state.product.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  let list: any[] = [];
  if (serverCategories) {
    if (Array.isArray(serverCategories)) {
      list = serverCategories;
    } else if (Array.isArray(serverCategories.data)) {
      list = serverCategories.data;
    } else if (Array.isArray(serverCategories.products)) {
      list = serverCategories.products;
    } else if (Array.isArray(serverCategories.categories)) {
      list = serverCategories.categories;
    }
  }

  if (list.length > 0) return list;
  return Array.isArray(storedCategories) ? storedCategories : [];
}

function FilterList({
  categories,
  openFilters,
  onToggle,
  allowClosePrice = true,
}: {
  categories: any;
  openFilters: string[];
  onToggle: (label: string) => void;
  allowClosePrice?: boolean;
}) {
  const filtersList = [
    { label: "Price", key: "price" },
    { label: "Category", key: "category" },
    ...extraFilters.map((filter) => ({
      label: filter.label,
      key: filter.key,
    })),
  ];

  return (
    <div className="flex flex-col divide-y divide-[#EEEEEE]">
      {filtersList.map((filter) => {
        const isOpen = openFilters.includes(filter.label);
        const extra = extraFilters.find((item) => item.key === filter.key);

        return (
          <div key={filter.label} className="py-[14px] first:pt-0 last:pb-0">
            <button
              type="button"
              className="group flex w-full cursor-pointer items-center justify-between py-[4px] text-left"
              onClick={() => {
                if (!allowClosePrice && filter.label === "Price") return;
                onToggle(filter.label);
              }}
            >
              <TitleTag
                as="h3"
                variant="satoshiBold"
                className="!text-[15px] font-semibold text-[#111111] transition-colors group-hover:text-black"
              >
                {filter.label}
              </TitleTag>
              <span className="text-[#111111]">
                <ChevronDown
                  className={`h-[12px] w-[12px] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {filter.key === "price" && <PriceFilter />}
                {filter.key === "category" && (
                  <CategoryOptions categories={categories} />
                )}
                {extra && (
                  <FilterOptions
                    filterKey={extra.key}
                    options={extra.options}
                    multiple={extra.multiple}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FilterSectionDesktop({ categories }: { categories?: any }) {
  const [openFilters, setOpenFilters] = useState<string[]>([
    "Category",
    "Price",
  ]);
  const categoryList = useCategories(categories);
  const { filters, resetFilters } = useFilters();

  const hasActiveFilters =
    (Array.isArray(filters.category)
      ? filters.category.length > 0
      : Boolean(filters.category && filters.category !== "all")) ||
    (Array.isArray(filters.brand)
      ? filters.brand.length > 0
      : Boolean(filters.brand)) ||
    (filters.minPrice !== null && filters.minPrice > MIN_PRICE) ||
    (filters.maxPrice !== null && filters.maxPrice < MAX_PRICE) ||
    Boolean(filters.rating);

  return (
    <aside className="w-full max-w-[295px] max-h-full rounded-[16px] border border-[#E8E8E8] bg-white p-[18px] shadow-xs">
      <div className="mb-[16px] flex items-center justify-between border-b border-[#EEEEEE] pb-[14px]">
        <TitleTag
          as="h2"
          variant="bold"
          className="laptop:!text-[22px] !text-[18px] text-[#111111]"
        >
          Filters
        </TitleTag>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="cursor-pointer font-satoshi text-[12px] font-semibold text-red-500 hover:underline"
            >
              Clear All
            </button>
          )}
          <div
            className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#F5F5F5]"
            aria-label="Filters"
          >
            <FilterIcon className="h-[16px] w-[16px] text-[#555555]" />
          </div>
        </div>
      </div>

      <FilterList
        categories={categoryList}
        openFilters={openFilters}
        onToggle={(label) =>
          setOpenFilters((prev) =>
            prev.includes(label)
              ? prev.filter((item) => item !== label)
              : [...prev, label],
          )
        }
      />
    </aside>
  );
}

type FilterSectionMobileProps = {
  isOpen: boolean;
  onClose: () => void;
  categories?: any;
};

export function FilterSectionMobile({
  isOpen,
  onClose,
  categories,
}: FilterSectionMobileProps) {
  const [openFilters, setOpenFilters] = useState<string[]>([
    "Price",
    "Category",
  ]);
  const categoryList = useCategories(categories);
  const { filters, resetFilters } = useFilters();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const hasActiveFilters =
    (Array.isArray(filters.category)
      ? filters.category.length > 0
      : Boolean(filters.category && filters.category !== "all")) ||
    (Array.isArray(filters.brand)
      ? filters.brand.length > 0
      : Boolean(filters.brand)) ||
    (filters.minPrice !== null && filters.minPrice > MIN_PRICE) ||
    (filters.maxPrice !== null && filters.maxPrice < MAX_PRICE) ||
    Boolean(filters.rating);

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed right-0 top-0 z-[110] flex h-full w-full max-w-[340px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#EEEEEE] px-[20px] py-[18px]">
          <div className="flex items-center gap-x-[12px]">
            <button
              type="button"
              onClick={onClose}
              className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full hover:bg-[#F5F5F5]"
              aria-label="Close filters"
            >
              <ArrowLeft className="h-[18px] w-[18px] text-black" />
            </button>
            <TitleTag as="h2" variant="bold" className="!text-[20px]">
              Filters
            </TitleTag>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="cursor-pointer font-satoshi text-[12px] font-semibold text-red-500 hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-[20px] py-[16px]">
          <FilterList
            categories={categoryList}
            openFilters={openFilters}
            allowClosePrice={true}
            onToggle={(label) =>
              setOpenFilters((prev) =>
                prev.includes(label)
                  ? prev.filter((item) => item !== label)
                  : [...prev, label],
              )
            }
          />
        </div>

        <div className="flex gap-3 border-t border-[#EEEEEE] bg-white p-[16px]">
          <Button
            variant="secondary"
            className="flex-1 !py-[12px] !text-[14px]"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            className="flex-1 !py-[12px] !text-[14px]"
            onClick={onClose}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
}

const SectionFilter = ({ categories }: { categories?: any }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { filters } = useFilters();

  const hasActiveFilters =
    (Array.isArray(filters.category)
      ? filters.category.length > 0
      : Boolean(filters.category && filters.category !== "all")) ||
    (Array.isArray(filters.brand)
      ? filters.brand.length > 0
      : Boolean(filters.brand)) ||
    (filters.minPrice !== null && filters.minPrice > MIN_PRICE) ||
    (filters.maxPrice !== null && filters.maxPrice < MAX_PRICE) ||
    Boolean(filters.rating);

  return (
    <>
      <div className="hidden shrink-0 laptop:block">
        <FilterSectionDesktop categories={categories} />
      </div>

      <div className="w-full laptop:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-black/15 bg-white py-[10px] px-[16px] font-satoshi text-[14px] font-semibold text-black shadow-xs transition active:bg-[#F5F5F5]"
        >
          <FilterIcon className="h-[16px] w-[16px]" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="h-[7px] w-[7px] rounded-full bg-black" />
          )}
        </button>

        <FilterSectionMobile
          isOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
          categories={categories}
        />
      </div>
    </>
  );
};

export default SectionFilter;
