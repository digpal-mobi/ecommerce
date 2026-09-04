"use client";

import { WishlistIcon } from "@/website/Lib/Icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

const WishlistIconComponent = () => {
  const [isMounted, setIsMounted] = useState(false);
  const items = useSelector((state: RootState) => state?.wishlist?.items) ?? [];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const count = isMounted ? items.length : 0;

  return (
    <Link
      href="/wishlist"
      className="relative flex items-center justify-center p-1 text-black hover:text-red-500 transition-colors"
      aria-label={`Wishlist with ${count} items`}
    >
      <WishlistIcon className="h-[22px] w-[22px]" />
      {count > 0 && (
        <span className="absolute top-[-4px] right-[-4px] font-[700] min-w-[18px] h-[18px] px-[4px] flex items-center justify-center text-white rounded-full text-[11px] bg-[#dc2626] shadow-sm animate-in fade-in zoom-in duration-200">
          {count}
        </span>
      )}
    </Link>
  );
};

export default WishlistIconComponent;
