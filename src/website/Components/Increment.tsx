"use client";

import React from "react";
import { MinusIcon, PlusIcon } from "@/website/Lib/Icons";

type Props = {
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
};

const Increment = ({
  value = 1,
  onChange,
  className = "",
}: Readonly<Props>) => {
  const handleDecrease = () => {
    onChange?.(Math.max(1, value - 1));
  };

  const handleIncrease = () => {
    onChange?.(value + 1);
  };

  return (
    <div
      className={`flex h-[44px] min-w-[110px] items-center gap-[16px] px-[20px] py-[12px] justify-between rounded-full bg-[#F0F0F0] ${className}`}
    >
      <button
        type="button"
        onClick={handleDecrease}
        aria-label="Decrease quantity"
        className="flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
      >
        <MinusIcon />
      </button>

      <span className="text-center font-satoshi font-medium text-[16px] select-none">
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        aria-label="Increase quantity"
        className="flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default Increment;
