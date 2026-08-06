"use client";

import { useState } from "react";
import { ReviewStar, HalfReviewStar } from "@/website/lib/Icons";
import { RoundRating } from "@/website/helpers/helper";

export default function SectionRating({ rating }: { rating: number }) {
  const roundedRating = RoundRating(rating);

  return (
    <div className=" flex items-center mt-[4px] gap-[13px]">
      <div className="flex items-center gap-[4px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="cursor-pointer">
            {roundedRating >= star ? (
              <ReviewStar filled />
            ) : roundedRating === star - 0.5 ? (
              <HalfReviewStar filled />
            ) : (
              <ReviewStar />
            )}
          </div>
        ))}
      </div>
      <p className="text-[14px] font-[400] leading-[1em] text-[#000000] font-satoshi">
        {roundedRating}/5
      </p>
    </div>
  );
}
