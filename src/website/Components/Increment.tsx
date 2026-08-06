"use client";

import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "@/website/lib/Icons";

type Props = {
  className?: string;
};

const Increment = ({ className = "" }: Props) => {
  const [count, setCount] = useState(0);

  return (
    <div
      className={`flex h-[44px] min-w-[110px] items-center gap-[16px] px-[20px] py-[12px] justify-between rounded-full bg-[#F0F0F0] ${className}`}
    >
      <button
        type="button"
        onClick={() => setCount(Math.max(0, count - 1))}
        className="flex items-center justify-center hover:opacity-70 transition-opacity"
      >
        <MinusIcon />
      </button>
      <span className="text-center font-satoshi font-medium text-[16px] select-none">
        {count}
      </span>
      <button
        type="button"
        onClick={() => setCount(count + 1)}
        className="flex items-center justify-center hover:opacity-70 transition-opacity"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default Increment;
