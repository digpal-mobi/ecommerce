import React from "react";
import LazyImage from "@/website/Components/Common/LazyImage";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import Button from "@/website/Components/Common/Button";
import { SparkleIcon, SparkleIcon2 } from "@/website/Lib/Icons";
import Link from "next/link";
import Paragraph from "../Components/Common/Paragraph";
import TitleTag from "../Components/Common/TitleTag";

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
    <section
      data-testid="hero-banner"
      className="relative overflow-hidden bg-[#F2F0F1]"
    >
      <div className="hidden laptop:block absolute right-[4%] bottom-0 w-[48%] h-full">
        <LazyImage
          src="/banner-image.png"
          alt="Banner"
          fill
          className="object-contain object-right-bottom"
        />

        <div className="absolute top-[13.4%] right-[3%]">
          <SparkleIcon2 className="laptop:w-[104px] w-[76px] h-auto" />
        </div>

        <div className="absolute top-[45.4%] left-[8.5%]">
          <SparkleIcon className="" />
        </div>
      </div>

      <MainContainer>
        <Container className="laptop:!pt-[80px] laptop:!pb-[100px] ">
          <div className="relative z-10 flex min-h-[50%] items-center">
            <div className="w-full laptop:max-w-[52%] pt-[40px] laptop:pt-0">
              <TitleTag as="h1" variant="heading">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </TitleTag>

              <Paragraph
                variant="normalPara"
                className="mt-[20px] desktop:mt-[24px] desktop:w-[85%] w-full"
              >
                Browse through our diverse range of met iculously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </Paragraph>

              <div className="mt-[24px] flex w-full  laptop:max-w-[210px] tablet:justify-start justify-center">
                <Link href="/shop" className="w-full">
                  <Button className="w-full" variant="primary">
                    Shop Now
                  </Button>
                </Link>
              </div>

              {/* Metrics */}
              <div className="laptop:mt-[48px] mt-[20px] flex flex-wrap">
                {Metrics.map((item, index) => (
                  <React.Fragment key={item.description}>
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
                  ? "laptop:pr-[32px]"
                  : index === Metrics.length - 1
                    ? "laptop:pl-[32px]"
                    : "laptop:px-[32px]"
              }
            `}
                      >
                        <p className="text-[32px] laptop:text-[40px] font-bold leading-none font-satoshi">
                          {item.number}
                        </p>

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
      </MainContainer>

      <div className="relative laptop:hidden">
        <LazyImage
          src="/banner-image.png"
          alt="Banner"
          width={700}
          height={800}
          priority
          className="w-full h-auto object-contain object-bottom"
        />

        <div className="absolute top-[15%] right-[8%]">
          <SparkleIcon2 className="w-[76px] h-auto" />
        </div>

        <div className="absolute top-[45%] left-[8%]">
          <SparkleIcon className="w-[44px] h-auto" />
        </div>
      </div>
    </section>
  );
};

export default SectionMainBanner;
