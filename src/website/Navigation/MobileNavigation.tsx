"use client";

import React, { useEffect, useRef, useState } from "react";
import LazyImage from "@/website/Components/Common/LazyImage";
import Link from "next/link";
import { ChevronDown, HamburgerIcon, ProfileIcon, SearchIcon } from "@/website/Lib/Icons";
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
  const [expandedNavId, setExpandedNavId] = useState<number | null>(null);

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
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 cursor-pointer border-0 bg-black/40 p-0 transition-opacity duration-300 ease-in-out ${
          isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed left-0 top-0 z-50 h-screen w-full bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-5">
          <Link href="/" className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <LazyImage
              src="/shop-logo.png"
              alt="SHOP.CO"
              width={120}
              height={18}
              className="h-auto w-auto"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-3xl leading-none cursor-pointer"
            aria-label="Close mobile menu"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col p-5 overflow-y-auto max-h-[calc(100vh-80px)]">
          {NAVIGATION_ITEMS.map((item) =>
            item.children ? (
              <div key={item.id} className="border-b border-[#000000]/40">
                <div className="flex w-full items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-4 text-[18px] font-medium hover:text-black/70 transition-colors"
                  >
                    {item.title}
                  </Link>

                  <button
                    type="button"
                    aria-label={`Toggle ${item.title} submenu`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setExpandedNavId((prev) =>
                        prev === item.id ? null : item.id
                      );
                    }}
                    className="p-3 -mr-2 cursor-pointer flex items-center justify-center focus:outline-none"
                  >
                    <ChevronDown
                      className={`transition-transform duration-300 ${
                        expandedNavId === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    expandedNavId === item.id
                      ? "grid-rows-[1fr] opacity-100 pb-3"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden flex flex-col pl-4 gap-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className="py-1 text-[16px] text-[#000000]/70 hover:text-black transition-colors"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-[#000000]/40 py-4 text-[18px] font-medium hover:text-black/70 transition-colors"
              >
                {item.title}
              </Link>
            )
          )}
        </nav>
      </div>
    </>
  );
};

export default MobileNavigation;
