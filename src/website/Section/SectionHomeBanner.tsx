"use client";

import Link from "next/link";
import React, { useState } from "react";
import { CrossIcon } from "@/website/Lib/Icons";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";

type Props = Readonly<Record<string, never>>;

const SectionHomeBanner = (props: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <MainContainer className="bg-[#000000]">
      <Container>
        <div className="flex text-[#FFF] w-full py-[10px] h-full">
          <div className="flex w-full justify-center items-center">
            <span className="text-[12px] laptop:text-[14px] font-satoshi font-[400] leading-[1em]">
              Sign up and get 20% off to your first order.
              <Link className="font-[500] hover:underline" href={"/signup"}>
                Sign Up Now
              </Link>
            </span>
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="text-[#FFFFFF] flex justify-end cursor-pointer items-center"
          >
            <CrossIcon />
          </button>
        </div>
      </Container>
    </MainContainer>
  );
};

export default SectionHomeBanner;
