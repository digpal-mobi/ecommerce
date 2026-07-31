"use client";

import { useState } from "react";
import { ReviewStar, HalfReviewStar } from "../lib/Icons";

export default function SectionRating() {
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);

  const current = hoverValue || rating;

  return (
    <div className=" flex items-center justify-center mt-[4px] gap-[13px]">
      <div
        className="flex items-center gap-[4px]"
        onMouseLeave={() => setHoverValue(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className="cursor-pointer"
            onMouseMove={(e) => {
              const { left, width } = e.currentTarget.getBoundingClientRect();

              const isHalf = e.clientX - left < width / 2;

              setHoverValue(isHalf ? star - 0.5 : star);
            }}
            onClick={() => setRating(hoverValue)}
          >
            {current >= star ? (
              <ReviewStar filled />
            ) : current === star - 0.5 ? (
              <HalfReviewStar filled />
            ) : (
              <ReviewStar />
            )}
          </div>
        ))}
      </div>
      <p className="text-[14px] font-[400] leading-[1em] text-[#000000] font-satoshi">
        {current}/5
      </p>
    </div>
  );
}
