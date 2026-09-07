"use client";

import React, { useEffect, useRef, useState } from "react";
import TitleTag from "@/website/Components/Common/TitleTag";
import CurrencyRates from "@/website/Data/CurrencyRates";
import { ChevronDown } from "@/website/Lib/Icons";
import { useDispatch, useSelector } from "@/redux/store";
import { setCurrency } from "@/redux/slices/currencySlice";

const CurrencySelector = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const currency = useSelector((state) => state.currency.currency);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");

    if (savedCurrency) {
      dispatch(setCurrency(savedCurrency));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-label={`Select currency, current currency is ${currency}`}
        aria-expanded={isOpen}
        className="flex items-center cursor-pointer gap-[5px]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <TitleTag variant="satoshiBold" as="span">
          {currency}
        </TitleTag>

        <ChevronDown
          className={`h-[10px] w-[10px] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-[70%] right-[-16%] mt-[10px] w-[150%] rounded-md border border-[#000000]/10 bg-white px-[10px] py-[10px] shadow-2xl">
          {CurrencyRates.map((rate) => (
            <button
              key={rate.label}
              type="button"
              className="flex w-full cursor-pointer items-center justify-center gap-[20px]"
              onClick={() => {
                dispatch(setCurrency(rate.id));
                setIsOpen(false);
              }}
            >
              <TitleTag
                as="span"
                variant="satoshiBold"
                className="w-full rounded-md py-[5px] text-[12px] hover:bg-[#000000]/30"
              >
                {rate.id}
              </TitleTag>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
