import React from "react";
import Container from "@/Components/Container";
import Image from "next/image";
import DesktopHeader from "@/website/Navigation/DesktopHeader";
import SectionHomeBanner from "@/website/Section/SectionHomeBanner";
import SearchBar from "@/website/Components/SearchBar";
import { CartIcon, ProfileIcon } from "../lib/Icons";

type Props = {};

const index = (props: Props) => {
  return (
    <header>
      <SectionHomeBanner />
      <Container>
        <div className="flex items-center py-[24px] justify-between">
          <div className="flex max-w-[50%] laptop:max-w-[55%] items-center w-full gap-[40px]">
            <Image
              src="/logo.png"
              alt="SHOP"
              width={160}
              height={22}
              className="object-contain h-auto desktop:w-[160px] mobile:w-[126px] tablet:w-[150px]"
            />
            <DesktopHeader />
          </div>
          <div className="flex items-center max-w-[50%] w-full justify-between gap-[40px]">
            <SearchBar />
            <div className="flex items-center justify-center gap-[14px]">
              <span>
                <CartIcon />
              </span>
              <span>
                <ProfileIcon />
              </span>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default index;
