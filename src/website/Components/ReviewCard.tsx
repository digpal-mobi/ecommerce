import React from "react";
import { ReviewStar, CheckCircleIcon } from "@/website/lib/Icons";

type Props = {
  name: string;
  review: string;
  rating?: number;
};

const ReviewCard = ({ name, review, rating = 5 }: Props) => {
  return (
    <div className="flex h-[240px] max-w-[400px] flex-col rounded-[20px] border border-[#E5E5E5] bg-white px-[32px] pt-[28px] pb-[50px]">
      <div className="flex items-center gap-[6px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <ReviewStar key={index} filled={index < rating} />
        ))}
      </div>

      <div className="mt-[15px] flex items-center gap-[8px]">
        <h3 className="font-satoshi text-[16px] laptop:text-[20px] font-[700] leading-[22px] text-black">
          {name}
        </h3>

        <CheckCircleIcon className="h-[24px] w-[24px]" />
      </div>

      <p className="mt-[12px] flex-1 font-satoshi text-[14px] laptop:text-[16px] leading-[22px] text-black/60">
        "{review}"
      </p>
    </div>
  );
};

export default ReviewCard;
