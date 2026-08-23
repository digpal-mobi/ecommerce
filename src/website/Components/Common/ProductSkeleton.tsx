import React from "react";

interface ProductSkeletonProps {
  count?: number;
  className?: string;
}

export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between shrink-0 w-[295px] max-mobile:w-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative w-full aspect-square bg-[#E8E8E8] rounded-[20px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>

      {/* Content Skeleton */}
      <div className="mt-[16px] flex flex-col items-start w-full gap-[8px]">
        {/* Title */}
        <div className="h-[18px] bg-[#E8E8E8] rounded-md w-3/4" />
        <div className="h-[14px] bg-[#E8E8E8] rounded-md w-1/2" />

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-1">
          <div className="h-[14px] w-[90px] bg-[#E8E8E8] rounded-md" />
        </div>

        {/* Price & Increment */}
        <div className="flex items-center justify-between w-full mt-2">
          <div className="h-[22px] w-[70px] bg-[#E8E8E8] rounded-md" />
          <div className="h-[36px] w-[100px] bg-[#E8E8E8] rounded-full" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="mt-[16px] w-full">
        <div className="h-[48px] w-full bg-[#E8E8E8] rounded-full" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({
  count = 9,
}: Readonly<{ count?: number }>) => {
  return (
    <div className="grid laptop:grid-cols-3 grid-cols-1 gap-x-[16px] gap-y-[30px] w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col justify-between shrink-0 w-full animate-pulse"
        >
          {/* Image */}
          <div className="relative w-full aspect-square bg-[#E8E8E8] rounded-[20px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>

          {/* Details */}
          <div className="mt-[16px] flex flex-col items-start w-full gap-[8px]">
            <div className="h-[18px] bg-[#E8E8E8] rounded-md w-3/4" />
            <div className="h-[14px] bg-[#E8E8E8] rounded-md w-1/2" />
            <div className="h-[14px] w-[80px] bg-[#E8E8E8] rounded-md mt-1" />

            <div className="flex items-center justify-between w-full mt-2">
              <div className="h-[22px] w-[70px] bg-[#E8E8E8] rounded-md" />
              <div className="h-[36px] w-[90px] bg-[#E8E8E8] rounded-full" />
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-[16px] w-full">
            <div className="h-[48px] w-full bg-[#E8E8E8] rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
