import React from "react";
import Image from "next/image";
import Container from "@/website/Components/common/Container";
import Button from "@/website/Components/common/Button";
import { SparkleIcon, SparkleIcon2 } from "@/website/lib/Icons";

const Metrics = [
  {
    number: "200+",
    description: "International Brands",
  },
  {
    number: "2,000+",
    description: "High-Quality Products",
  },
  {
    number: "30,000+",
    description: "Happy Customers",
  },
];

const SectionMainBanner = () => {
  return (
    <section className="relative overflow-hidden bg-[#F2F0F1]">
      <div className="hidden laptop:block absolute right-0 bottom-0 w-[48%] h-full">
        <Image
          src="/banner-image.png"
          alt="Banner"
          fill
          priority
          className="object-contain object-right-bottom"
        />

        <div className="absolute top-[12%] right-[7%]">
          <SparkleIcon2 className="laptop:w-[104px] w-[76px] h-auto" />
        </div>

        <div className="absolute top-[45%] left-[5%]">
          <SparkleIcon className="" />
        </div>
      </div>

      <Container>
        <div className="relative z-10 flex min-h-[50%] items-center">
          <div className="w-full laptop:max-w-[52%] ">
            <h1 className="font-integral text-[36px] leading-[34px] laptop:leading-[64px] laptop:text-[48px] desktop:text-[64px] font-[700]">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>

            <p className="mt-6 text-[14px] font-satoshi laptop:text-[16px] font-[400] laptop:leading-[28px] text-black/60">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>

            <div className="mt-[24px] flex tablet:justify-start justify-center desktop:mt-[32px]">
              <Button variant="primary">Shop Now</Button>
            </div>

            {/* Metrics */}
            <div className="mt-12 flex flex-wrap">
              {Metrics.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`${
                      index === 2
                        ? "w-full mt-6 flex justify-center items-center laptop:w-auto laptop:mt-0"
                        : "w-1/2 laptop:w-auto flex justify-center items-center"
                    }`}
                  >
                    <div
                      className={`
            ${
              index === 0
                ? "laptop:pr-8"
                : index === Metrics.length - 1
                  ? "laptop:pl-8"
                  : "laptop:px-8"
            }
          `}
                    >
                      <h3 className="text-[32px] laptop:text-[40px] font-bold leading-none">
                        {item.number}
                      </h3>

                      <p className="mt-2 text-black/60">{item.description}</p>
                    </div>
                  </div>

                  {index !== Metrics.length - 1 && (
                    <div className="hidden laptop:block w-px h-14 bg-black/10" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="relative laptop:hidden mt-8">
        <Image
          src="/banner-image.png"
          alt="Banner"
          width={700}
          height={800}
          priority
          className="w-full h-auto object-contain object-bottom"
        />

        <div className="absolute top-[15%] right-[8%]">
          <SparkleIcon2 />
        </div>

        <div className="absolute top-[45%] left-[8%]">
          <SparkleIcon />
        </div>
      </div>
    </section>
  );
};

export default SectionMainBanner;
