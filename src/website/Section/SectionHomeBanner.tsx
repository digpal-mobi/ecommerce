import Link from "next/link";
import React from "react";

type Props = {};

const SectionHomeBanner = (props: Props) => {
  return (
    <section className="bg-[#000]">
      <div className="flex text-[#FFF] flex justify-center items-center">
        <span className="">Sign up and get 20% off to your first order.</span>
        <Link href={"/signup"}>Sign Up Now</Link>
      </div>
      <div className="text-[#FFF] flex justify-end items-center"></div>
    </section>
  );
};

export default SectionHomeBanner;
