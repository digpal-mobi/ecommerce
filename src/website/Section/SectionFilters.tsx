"use client";

import React, { useState } from "react";
import { ChevronDown, FilterIcon } from "../lib/Icons";
//
const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];

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

const SectionFilter = () => {
  const [selectedColor, setSelectedColor] = useState<string>("Blue");
  const [selectedSize, setSelectedSize] = useState<string>("Large");

  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(200);

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

  return (
    <aside className="w-full max-w-[295px] rounded-[14px] border border-[#E8E8E8] bg-white px-[15px] py-[13px]">
      {/* Header */}
      <div className="mb-[18px] flex items-center justify-between">
        <h2 className="text-[14px] font-semibold text-[#111111]">Filters</h2>

        <button
          type="button"
          className="flex h-[20px] w-[20px] items-center justify-center"
          aria-label="Filter settings"
        >
          <FilterIcon className="text-[#777777]" />
        </button>
      </div>

      {/* Categories */}
      <div className="border-b border-[#EEEEEE] pb-[8px]">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="flex w-full items-center justify-between py-[6px] text-left"
          >
            <span className="text-[11px] text-[#777777]">{category}</span>

            <ChevronDown
              size={14}
              strokeWidth={1.5}
              className="text-[#555555] rotate-270"
            />
          </button>
        ))}
      </div>

      {/* Price */}
      <FilterSection
        title="Price"
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="px-[1px] pt-[7px]">
          {/* Slider */}
          <div className="relative h-[20px]">
            <div className="absolute top-[8px] left-0 h-[4px] w-full rounded-full bg-[#EEEEEE]" />

            <div className="absolute top-[8px] left-0 right-[18%] h-[4px] rounded-full bg-black" />

            <input
              type="range"
              min={0}
              max={250}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="pointer-events-none absolute left-[18%] top-[1px] h-[18px] w-[100%] appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-[13px] [&::-webkit-slider-thumb]:w-[13px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
            />

            <input
              type="range"
              min={0}
              max={250}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="pointer-events-none absolute left-[18%] top-[1px] h-[18px] w-[100%] appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-[13px] [&::-webkit-slider-thumb]:w-[13px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
            />
          </div>

          <div className="mt-[3px] flex justify-between px-[22px]">
            <span className="text-[9px] font-medium text-[#111111]">
              ${minPrice}
            </span>

            <span className="text-[9px] font-medium text-[#111111]">
              ${maxPrice}
            </span>
          </div>
        </div>
      </FilterSection>

      {/* Colors */}
      <FilterSection
        title="Colors"
        isOpen={openSections.colors}
        onToggle={() => toggleSection("colors")}
      >
        <div className="grid grid-cols-5 gap-x-[10px] gap-y-[9px] pt-[5px]">
          {colors.map((color) => {
            const selected = selectedColor === color.name;

            return (
              <button
                key={color.name}
                type="button"
                aria-label={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`relative flex h-[25px] w-[25px] items-center justify-center rounded-full border transition ${
                  color.name === "White"
                    ? "border-[#D5D5D5]"
                    : "border-transparent"
                } ${
                  selected ? "ring-[1.5px] ring-black ring-offset-[2px]" : ""
                }`}
                style={{
                  backgroundColor: color.value,
                }}
              >
                {selected && (
                  <span className="text-[12px] font-medium text-white">✓</span>
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
        <div className="flex flex-wrap gap-[7px] pt-[5px]">
          {sizes.map((size) => {
            const selected = selectedSize === size;

            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`rounded-full px-[13px] py-[6px] text-[9px] transition ${
                  selected
                    ? "bg-black text-white"
                    : "bg-[#F0F0F0] text-[#777777]"
                }`}
              >
                {size}
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
        <div className="pt-[2px]">
          {dressStyles.map((style) => (
            <button
              key={style}
              type="button"
              className="flex w-full items-center justify-between py-[5px]"
            >
              <span className="text-[10px] text-[#777777]">{style}</span>

              <ChevronDown
                size={13}
                strokeWidth={1.5}
                className="text-[#555555]"
              />
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Apply */}
      <button
        type="button"
        className="mt-[13px] h-[32px] w-full rounded-full bg-black text-[9px] font-medium text-white transition-opacity hover:opacity-80"
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
        className="flex w-full items-center justify-between"
      >
        <h3 className="text-[14px] font-semibold text-[#111111]">{title}</h3>

        {isOpen ? (
          <ChevronDown size={14} strokeWidth={1.5} className="text-[#111111]" />
        ) : (
          <ChevronDown size={14} strokeWidth={1.5} className="text-[#111111]" />
        )}
      </button>

      {isOpen && children}
    </div>
  );
};

export default SectionFilter;
