import Link from "next/link";
import React from "react";
import { CrossIcon } from "@/website/lib/Icons";
import Container from "@/website/Components/Container";

type Props = {};

const SectionHomeBanner = (props: Props) => {
  return (
    <Container className="bg-[#000] !py-0">
      <div className="flex text-[#FFF] w-full py-[10px] h-full">
        <div className="flex w-full justify-center items-center">
          <span className="text-[12px] laptop:text-[14px] font-satoshi font-[400] leading-[1em]">
            Sign up and get 20% off to your first order.{" "}
            <Link className="font-[500] hover:underline" href={"/signup"}>
              Sign Up Now
            </Link>
          </span>
        </div>
        <div className="text-[#FFF] flex justify-end cursor-pointer items-center">
          <CrossIcon />
        </div>
      </div>
    </Container>
  );
};

export default SectionHomeBanner;
