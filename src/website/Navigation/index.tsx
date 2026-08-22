"use client";

import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import Image from "next/image";
import Link from "next/link";
import DesktopHeader from "@/website/Navigation/DesktopNavigation";
import MobileHeader from "@/website/Navigation/MobileNavigation";
import SearchBar from "@/website/Components/SearchBar";
import SectionHomeBanner from "@/website/Section/SectionHomeBanner";
import { ProfileIcon } from "@/website/lib/Icons";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "@/redux/store";
import {
  logoutSuccess,
  openLoginModal,
  closeLoginModal,
} from "@/redux/slices/authSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import CartIconComponent from "@/website/Components/Common/CartIconComponent";
import WishlistIconComponent from "@/website/Components/Common/WishlistIconComponent";
import CurrencySelector from "@/website/Components/CurrencySelector";
import LoginModal from "@/website/Section/SectionLogin";
import { deleteCookie } from "@/website/helpers/helper";

const Header = () => {
  const { isAuthenticated, isLoginModalOpen } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 w-full bg-white">
      <SectionHomeBanner />

      {/* Desktop */}
      <div className="hidden laptop:block">
        <MainContainer>
          <Container className="!py-0">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center gap-10 w-1/2 desktop:w-[50%] laptop:w-[65%]">
                <Link href="/">
                  <Image
                    src="/shop-logo.png"
                    alt="SHOP.CO"
                    width={160}
                    height={22}
                    priority
                    className="h-auto w-auto"
                  />
                </Link>
                <DesktopHeader />
              </div>

              <div className="flex items-center justify-between w-1/2 desktop:w-[60%] laptop:w-[40%] gap-10">
                <SearchBar />

                <div className="flex items-center gap-4">
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

                    {/* Dropdown Menu — only relevant once authenticated */}
                    {isAuthenticated && isMenuOpen && (
                      <div className="absolute right-0 top-full mt-[10px] w-[150px] rounded-md bg-white py-[8px] shadow-lg ring-1 ring-black/5 z-50">
                        <Link
                          href="/profile"
                          className="block px-[16px] py-[8px] text-[16px] text-[#000000]/60 hover:bg-[#000000]/20"
                        >
                          Profile
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="block w-full px-[16px] py-[8px] text-left text-[16px] text-[#000000]/60 hover:bg-[#000000]/20"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <CurrencySelector />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </MainContainer>
      </div>

      {/* Mobile */}
      <div className="block laptop:hidden">
        <MobileHeader />
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => dispatch(closeLoginModal())}
      />
    </header>
  );
};

export default Header;
