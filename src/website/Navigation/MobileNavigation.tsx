"use client";

import React, { useEffect, useRef, useState } from "react";
import LazyImage from "@/website/Components/Common/LazyImage";
import Link from "next/link";
import { HamburgerIcon, ProfileIcon, SearchIcon } from "@/website/Lib/Icons";
import { NAVIGATION_ITEMS } from "@/website/Navigation/DummyNavigation";
import SearchBar from "@/website/Components/SearchBar";
import { useDispatch, useSelector } from "@/redux/store";
import { logoutSuccess, openLoginModal } from "@/redux/slices/authSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import CartIconComponent from "@/website/Components/Common/CartIconComponent";
import WishlistIconComponent from "@/website/Components/Common/WishlistIconComponent";
import { deleteCookie } from "@/website/Helpers/Helper";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    deleteCookie("USER_ACCESS");
    deleteCookie("USER_RefreshToken");
    deleteCookie("USER_DATA");
    dispatch(logoutSuccess());
    dispatch(clearCart());
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setIsMenuOpen((prev) => !prev);
    } else {
      dispatch(openLoginModal());
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="w-full">
        <div className="px-[16px] py-[23px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="cursor-pointer"
                aria-label="Open mobile menu"
              >
                <HamburgerIcon />
              </button>

              <Link href="/" className="cursor-pointer">
                <LazyImage
                  src="/shop-logo.png"
                  alt="SHOP.CO"
                  width={120}
                  height={18}
                  className="h-auto w-auto"
                />
              </Link>
            </div>

            <div className="flex items-center gap-[12px]">
              <div className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => setIsSearchOpen((prev) => !prev)}
                  className="cursor-pointer"
                  aria-label="Toggle search"
                >
                  <SearchIcon color="#000" />
                </button>

                {isSearchOpen && (
                  <div className="absolute top-[100%] w-[250px] right-[50%] translate-x-[-50%] -left-1/2 mt-2">
                    <SearchBar />
                  </div>
                )}
              </div>
              <WishlistIconComponent />
              <CartIconComponent />
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={handleProfileClick}
                  className="flex items-center cursor-pointer focus:outline-none"
                  aria-label={isAuthenticated ? "User Profile" : "Login"}
                >
                  <ProfileIcon />
                </button>

                {/* Dropdown Menu */}
                {isAuthenticated && isMenuOpen && (
                  <div className="absolute right-0 top-full mt-[10px] w-[150px] rounded-md bg-white py-[8px] shadow-lg ring-1 ring-black/5 z-50">
                    <div>
                      <Link
                        href="/profile"
                        className="block px-[16px] py-[8px] text-[16px] text-[#000000]/60 hover:bg-[#000000]/20"
                      >
                        Profile
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full px-[16px] py-[8px] text-left text-[16px] text-[#000000]/60 hover:bg-[#000000]/20 cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 cursor-pointer ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <div
        className={`fixed left-0 top-0 z-50 h-screen w-full bg-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-5">
          <LazyImage src="/logo.png" alt="logo" width={120} height={18} />

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-3xl leading-none cursor-pointer"
            aria-label="Close mobile menu"
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
