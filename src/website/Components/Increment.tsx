"use client";

import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "@/website/lib/Icons";

type Props = {};

const Increment = (props: Props) => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-[44px] w-[126px] items-center gap-[20px] px-[20px] py-[12px] justify-between rounded-full bg-[#F0F0F0]">
      <button
        onClick={() => setCount(count - 1)}
        className="w-full justify-center items-center flex"
      >
        <MinusIcon />
      </button>
      <span className="w-full text-center">{count}</span>
      <button
        onClick={() => setCount(count + 1)}
        className="w-full justify-center items-center flex"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default Increment;
