import React, { useEffect, useRef, useState } from "react";
import TitleTag from "@/website/components/common/TitleTag";
import CurrencyRates from "@/website/data/CurrencyRates";
import { ChevronDown } from "../lib/Icons";
import { useDispatch, useSelector } from "@/redux/store";
import { setCurrency } from "@/redux/slices/currencySlice";

type Props = {};

const CurrencySelector = (props: Props) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currency = useSelector((state) => state.currency.currency);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        className="flex items-center gap-[5px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <TitleTag variant="satoshiBold" as="span">
          {currency}
        </TitleTag>
        {isOpen ? (
          <ChevronDown className="h-[10px] w-[10px] rotate-180" />
        ) : (
          <ChevronDown className="h-[10px] w-[10px] transition-transform duration-200 " />
        )}
      </button>
      {isOpen ? (
        <div
          className="absolute top-[70%] w-[150%] mt-[10px] right-[-16%] px-[10px] py-[10px] rounded-md shadow-2xl border border-[#000000]/10 transition-[grid-template-rows] duration-300"
          style={{
            gridTemplateRows: isOpen ? "1fr" : "0fr",
          }}
        >
          {CurrencyRates.map((rate) => (
            <button
              className="flex w-full items-center justify-center cursor-pointer gap-[20px]"
              type="button"
              key={rate.label}
              onClick={() => {
                dispatch(setCurrency(rate.id));
                setIsOpen(false);
              }}
            >
              <TitleTag
                as="span"
                variant="satoshiBold"
                className="text-[12px] py-[5px] w-full rounded-md hover:bg-[#000000]/30"
              >
                {rate.id}
              </TitleTag>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CurrencySelector;
