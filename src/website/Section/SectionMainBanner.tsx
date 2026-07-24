import React from "react";
import Image from "next/image";
import Container from "@/Components/Container";
import Button from "@/Components/Button";
import { SparkleIcon, SparkleIcon2 } from "@/lib/Icons";

const Metrics = [
  { Number: 200, description: "International Brands" },
  { Number: 2000, description: "High-Quality Products" },
  { Number: 30000, description: "Happy Customers" },
];

const SectionMainBanner = () => {
  return (
    <div className="relative w-full">
      {/* Banner Image */}
      <Image
        src="/banner.png"
        alt="Banner"
        width={1920}
        height={663}
        priority
        className="h-auto w-full object-cover"
      />

      <div className=" absolute top-[50%] right-[45%] ">
        <SparkleIcon />
      </div>
      <div className="absolute top-[16%] right-[4%]">
        <SparkleIcon2 />
      </div>

      <div className="absolute inset-0 flex items-center">
        <Container>
          <div className="flex h-full flex-col items-start">
            <div className="w-full max-w-[46.6%]">
              <h1 className="font-integral desktop:text-[64px] tablet:text-[45px] mobile:text-[36px] leading-[64px] font-[700]">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>

              <p className="mt-8 text-[16px] leading-6 text-[#000000]/60 font-satoshi font-[400]">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>

              <Button
                btnText="Shop Now"
                variant="primary"
                className="!justify-start mt-[32px]"
              />
            </div>
            <div className="flex mt-[48px] items-center">
              {Metrics.map((items, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-start">
                    <span className="font-[700] font-satoshi text-[40px] leading-[1em]">
                      {items.Number}+
                    </span>
                    <p className="font-[400] font-satoshi text-[16px] text-[#000000]/60 leading-[1em]">
                      {items.description}
                    </p>
                  </div>
                  <div className="w-[1px] h-[60px] mx-[32px] bg-[#000000]/10"></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SectionMainBanner;
