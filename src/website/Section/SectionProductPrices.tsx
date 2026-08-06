"use client";
import React, { useEffect, useState } from "react";
import { ConvertToFinalPrice } from "@/website/helpers/helper";
import TitleTag from "@/website/Components/common/TitleTag";

type Props = {
  price?: number;
  discountPercentage?: number;
};

const SectionProductPrices = ({ price = 0, discountPercentage = 0 }: Props) => {
  const parsedPrice = price || 0;
  const parsedDiscountPercentage = parseFloat(
    discountPercentage?.toString() || "0",
  );
  const finalPrice = ConvertToFinalPrice(parsedPrice, parsedDiscountPercentage);

  return (
    <div className="flex items-center tablet:mt-[16px] mt-[10px] gap-[12px]">
      <TitleTag
        as="h3"
        variant="bold"
        className="laptop:text-[32px] font-satoshi text-[24px] font-[700] leading-[1em]"
      >
        ${finalPrice}
      </TitleTag>
      <TitleTag
        as="h3"
        className="laptop:text-[32px] text-[24px] line-through font-satoshi font-[700] leading-[1em] text-[#000000]/20"
      >
        ${price}
      </TitleTag>
      <TitleTag
        as="h4"
        className="rounded-full px-[14px] py-[6px] font-[500] leading-[1em] font-satoshi text-[#FF3333] bg-[#FF3333]/10"
      >
        -{discountPercentage}%
      </TitleTag>
    </div>
  );
};

export default SectionProductPrices;
