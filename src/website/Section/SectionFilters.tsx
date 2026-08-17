"use client";

import React, { useState } from "react";
import { ChevronDown, FilterIcon } from "../lib/Icons";
import { CurrencyConverter } from "../helpers/helper";
import TitleTag from "../components/common/TitleTag";
import { useSelector } from "@/redux/store";
import { useFilters } from "../hooks/useFilters"; 

const colors = [
  { name: "Green", value: "#00B83D" },
  { name: "Red", value: "#FF0D0D" },
  { name: "Yellow", value: "#FFD600" },
  { name: "Orange", value: "#FF7200" },
  { name: "Cyan", value: "#14BFE3" },
  { name: "Blue", value: "#1648E8" },
  { name: "Purple", value: "#7414E8" },
  { name: "Pink", value: "#ED008C" },
  { name: "White", value: "#FFFFFF" },
  { name: "Black", value: "#000000" },
];

const sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

const dressStyles = ["Casual", "Formal", "Party", "Gym"];

const MIN = 0;
const MAX = 3000;

interface SectionFilterProps {
  categories?: any;
}

const SectionFilter = ({ categories }: SectionFilterProps) => {
  const { currency } = useSelector((state) => state.currency);

  const {
    category,
    minPrice,
    maxPrice,
    color: selectedColor,
    size: selectedSize,
    dressStyle: selectedDressStyle,
    toggleCategory,
    toggleColor,
    toggleSize,
    toggleDressStyle,
    setMinPriceValue,
    setMaxPriceValue,
    applyPriceFilter,
    resetFilters,
  } = useFilters();

  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [openSections, setOpenSections] = useState({
    price: true,
    colors: true,
    size: true,
    dressStyle: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const minPercent = Math.max(
    0,
    Math.min(100, ((minPrice - MIN) / (MAX - MIN)) * 100),
  );
  const maxPercent = Math.max(
    0,
    Math.min(100, ((maxPrice - MIN) / (MAX - MIN)) * 100),
  );

  const hasActiveFilters =
    category.length > 0 ||
    selectedColor !== null ||
    selectedSize !== null ||
    selectedDressStyle !== null ||
    minPrice > MIN ||
    maxPrice < MAX;

  return (
    <aside className="w-full max-w-[295px] max-h-full overflow-y-auto rounded-[14px] border border-[#E8E8E8] bg-white px-[15px] py-[13px]">
      {/* Header */}
      <div className="mb-[18px] flex items-center justify-between">
        <TitleTag
          as="h2"
          variant="bold"
          className="laptop:!text-[32px] !text-[20px]"
        >
          Filters
        </TitleTag>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] text-red-500 hover:underline font-medium"
            >
              Clear All
            </button>
          )}
          <button
            type="button"
            className="flex h-[20px] w-[20px] items-center justify-center"
            aria-label="Filter settings"
          >
            <FilterIcon className="text-[#777777]" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="border-b border-[#EEEEEE] pb-[8px]">
        <button
          type="button"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex w-full items-center justify-between py-[6px] text-left"
        >
          <TitleTag
            as="h3"
            className="text-[14px] font-semibold text-[#111111]"
          >
            Category
          </TitleTag>

          <ChevronDown
            size={14}
            className={`text-[#111111] transition-transform duration-200 ${
              isCategoryOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isCategoryOpen && (
          <div className="flex items-start w-full flex-col gap-[6px] mt-[6px]">
            {Array.isArray(categories) &&
              categories.map((item: any) => {
                const categoryValue =
                  typeof item === "string" ? item : item?.slug || item?.name;
                const categoryName =
                  typeof item === "string" ? item : item?.name || item?.slug;
                const isChecked = category.includes(categoryValue);

                return (
                  <label
                    key={categoryValue}
                    htmlFor={`category-${categoryValue}`}
                    className={`flex w-full items-center gap-x-[10px] rounded-lg px-[10px] py-[8px] cursor-pointer transition ${
                      isChecked
                        ? "bg-black text-white"
                        : "bg-[#000000]/5 hover:bg-[#000000]/10 text-[#111111]"
                    }`}
                  >
                    <input
                      className="accent-black size-[16px] rounded cursor-pointer"
                      type="checkbox"
                      name="category"
                      id={`category-${categoryValue}`}
                      checked={isChecked}
                      onChange={() => toggleCategory(categoryValue)}
                    />
                    <span className="text-[12px] font-medium capitalize">
                      {categoryName}
                    </span>
                  </label>
                );
              })}
          </div>
        )}
      </div>

      {/* Price */}
      <FilterSection
        title="Price"
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="relative h-[20px] my-2">
          <div className="absolute top-[8px] right-0 h-[4px] w-full rounded-full bg-[#EEEEEE]" />

          <div
            className="absolute top-[8px] h-[4px] rounded-full bg-black"
            style={{
              left: `${minPercent}%`,
              width: `${Math.max(0, maxPercent - minPercent)}%`,
            }}
          />

          <input
            type="range"
            min={MIN}
            max={MAX}
            value={minPrice}
            onChange={(e) => {
              const value = Math.min(Number(e.target.value), maxPrice);
              setMinPriceValue(value);
            }}
            onMouseUp={(e) => {
              const value = Math.min(Number((e.target as HTMLInputElement).value), maxPrice);
              applyPriceFilter(value, maxPrice);
            }}
            onTouchEnd={(e) => {
              const value = Math.min(Number((e.target as HTMLInputElement).value), maxPrice);
              applyPriceFilter(value, maxPrice);
            }}
            className={`pointer-events-none absolute right-0 top-[1px] h-[18px] w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-[13px] [&::-webkit-slider-thumb]:w-[13px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black cursor-pointer ${
              minPrice > MAX - 20 ? "z-[4]" :   "z-[3]"
            }`}
          />

          <input
            type="range"
            min={MIN}
            max={MAX}
            value={maxPrice}
            onChange={(e) => {
              const value = Math.max(Number(e.target.value), minPrice);
              setMaxPriceValue(value);
            }}
            onMouseUp={(e) => {
              const value = Math.max(Number((e.target as HTMLInputElement).value), minPrice);
              applyPriceFilter(minPrice, value);
            }}
            onTouchEnd={(e) => {
              const value = Math.max(Number((e.target as HTMLInputElement).value), minPrice);
              applyPriceFilter(minPrice, value);
            }}
            className="pointer-events-none absolute right-0 top-[1px] h-[18px] w-full appearance-none bg-transparent z-[3] [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-[13px] [&::-webkit-slider-thumb]:w-[13px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black cursor-pointer"
          />
        </div>

        <div className="flex justify-between items-center mt-1">
          <TitleTag variant="satoshiBold" as="span" className="text-[12px]">
            {CurrencyConverter(minPrice, currency)}
          </TitleTag>
          <TitleTag variant="satoshiBold" as="span" className="text-[12px]">
            {CurrencyConverter(maxPrice, currency)}
          </TitleTag>
        </div>
      </FilterSection>

      {/* Colors */}
      <FilterSection
        title="Colors"
        isOpen={openSections.colors}
        onToggle={() => toggleSection("colors")}
      >
        <div className="grid grid-cols-5 gap-x-[10px] gap-y-[9px] pt-[10px]">
          {colors.map((c) => {
            const selected = selectedColor === c.name;

            return (
              <button
                key={c.name}
                type="button"
                aria-label={c.name}
                onClick={() => toggleColor(c.name)}
                className={`relative flex h-[25px] w-[25px] items-center justify-center rounded-full border transition cursor-pointer ${
                  c.name === "White" ? "border-[#D5D5D5]" : "border-transparent"
                } ${
                  selected ? "ring-[1.5px] ring-black ring-offset-[2px]" : ""
                }`}
                style={{
                  backgroundColor: c.value,
                }}
              >
                {selected && (
                  <span
                    className={`text-[12px] font-bold ${
                      c.name === "White" || c.name === "Yellow"
                        ? "text-black"
                        : "text-white"
                    }`}
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection
        title="Size"
        isOpen={openSections.size}
        onToggle={() => toggleSection("size")}
      >
        <div className="flex flex-wrap gap-[7px] pt-[10px]">
          {sizes.map((s) => {
            const selected = selectedSize === s;

            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleSize(s)}
                className={`rounded-full px-[13px] py-[6px] text-[9px] font-medium transition cursor-pointer ${
                  selected
                    ? "bg-black text-white"
                    : "bg-[#F0F0F0] text-[#777777] hover:bg-[#E5E5E5]"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Dress Style */}
      <FilterSection
        title="Dress Style"
        isOpen={openSections.dressStyle}
        onToggle={() => toggleSection("dressStyle")}
      >
        <div className="pt-[10px] space-y-[4px]">
          {dressStyles.map((style) => {
            const selected = selectedDressStyle === style;
            return (
              <button
                key={style}
                type="button"
                onClick={() => toggleDressStyle(style)}
                className={`flex w-full items-center justify-between py-[6px] px-[8px] rounded-lg transition cursor-pointer ${
                  selected
                    ? "bg-black text-white"
                    : "text-[#777777] hover:bg-[#F5F5F5]"
                }`}
              >
                <span
                  className={`text-[11px] ${
                    selected ? "text-white font-medium" : "text-[#777777]"
                  }`}
                >
                  {style}
                </span>

                <ChevronDown
                  size={13}
                  strokeWidth={1.5}
                  className={selected ? "text-white" : "text-[#555555]"}
                />
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Apply */}
      <button
        type="button"
        onClick={() => applyPriceFilter(minPrice, maxPrice)}
        className="mt-[13px] h-[36px] w-full rounded-full bg-black text-[12px] font-medium text-white transition hover:opacity-85 cursor-pointer active:scale-[0.98]"
      >
        Apply Filter
      </button>
    </aside>
  );
};

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterSection = ({
  title,
  isOpen,
  onToggle,
  children,
}: FilterSectionProps) => {
  return (
    <div className="border-b border-[#EEEEEE] py-[14px]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between cursor-pointer"
      >
        <TitleTag as="h3" className="text-[14px] font-semibold text-[#111111]">
          {title}
        </TitleTag>

        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={`text-[#111111] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default SectionFilter;
