"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartIcon, HamburgerIcon, ProfileIcon, SearchIcon } from "../lib/Icons";
import { NAVIGATION_ITEMS } from "@/website/Navigation/DummyNavigation";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full">
        <div className="px-[16px] py-[23px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsOpen(true)}>
                <HamburgerIcon />
              </button>

              <Link href="/">
                <Image
                  src="/shop-logo.png"
                  alt="SHOP.CO"
                  width={120}
                  height={18}
                  priority
                />
              </Link>
            </div>

            <div className="flex items-center gap-[12px]">
              <SearchIcon color="#000" />
              <CartIcon color="#000" />
              <ProfileIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-screen w-full bg-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-5">
          <Image src="/logo.png" alt="logo" width={120} height={18} />

          <button
            onClick={() => setIsOpen(false)}
            className="text-3xl leading-none"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col p-5">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="border-b border-[#000000]/40 py-4 text-[18px] font-medium"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileNavigation;
