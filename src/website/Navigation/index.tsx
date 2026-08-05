import Container from "@/website/Components/common/Container";
import Image from "next/image";
import Link from "next/link";
import DesktopHeader from "@/website/Navigation/DesktopNavigation";
import MobileHeader from "@/website/Navigation/MobileNavigation";
import SearchBar from "@/website/Components/SearchBar";
import SectionHomeBanner from "@/website/Section/SectionHomeBanner";
import { CartIcon, ProfileIcon } from "@/website/lib/Icons";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <SectionHomeBanner />

      {/* Desktop */}
      <div className="hidden laptop:block">
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

            <div className="flex items-center justify-between w-1/2 desktop:w-[65%] laptop:w-[40%] gap-10">
              <SearchBar />

              <div className="flex items-center gap-4">
                <CartIcon />
                <ProfileIcon />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile */}
      <div className="block laptop:hidden">
        <MobileHeader />
      </div>
    </header>
  );
};

export default Header;
