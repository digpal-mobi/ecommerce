import React from "react";
import LazyImage from "@/website/Components/Common/LazyImage";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import Button from "@/website/Components/Common/Button";
import { SparkleIcon, SparkleIcon2 } from "@/website/Lib/Icons";
import Link from "next/link";
import TitleTag from "@/website/Components/Common/TitleTag";
import Paragraph from "@/website/Components/Common/Paragraph";

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
      data-testid="section-main-banner"
      className="relative overflow-hidden bg-[#F2F0F1]"
    >
      <div className="hidden laptop:block absolute right-[5%] bottom-0 w-[48%] h-full">
        <LazyImage
          src="/banner-image.png"
          alt="Banner"
          fill
          priority
          className="object-contain object-right-bottom"
        />

        <div className="absolute top-[13.4%] right-[1%]">
          <SparkleIcon2 className="laptop:w-[104px] w-[76px] h-auto" />
        </div>

        <div className="absolute top-[45.4%] left-[10.5%]">
          <SparkleIcon className="" />
        </div>
      </div>

      <MainContainer>
        <Container className="laptop:!pt-[83px] laptop:!pb-[123px] ">
          <div className="relative z-10 flex min-h-[50%] items-center">
            <div className="w-full laptop:max-w-[52%] ">
              <TitleTag
                as="h1"
                variant="mainHeading"
                className="!text-[36px] pt-[31px] desktop:pt-[0px] !leading-[34px] laptop:!leading-[64px] laptop:!text-[48px] desktop:!text-[64px]"
              >
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </TitleTag>

              <Paragraph
                variant="normalPara"
                className="desktop:mt-[24px] mt-[14px] laptop:w-[87%] w-[100%] !text-[14px] laptop:!text-[16px] laptop:!leading-[24px] !leading-[21px] text-black/60"
              >
                Browse through our diverse range of met iculously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </Paragraph>

              <div className="mt-[16px] flex max-w-full desktop:!max-w-[210px] tablet:justify-start justify-center desktop:mt-[25px]">
                <Link
                  className="w-[100%]"
                  href="/shop"
                  aria-label="Shop now for our clothing collection"
                >
                  <Button className="w-full" variant="primary">
                    Shop Now
                  </Button>
                </Link>
              </div>

              {/* Metrics */}
              <div className="desktop:mt-[55px] mt-[27px] flex flex-wrap">
                {Metrics.map((item, index) => (
                  <React.Fragment key={item.description}>
                    <div
                      className={`${
                        index === 2
                          ? "w-full laptop:mt-[0px] mt-[17px] laptop:pl-[0px] pl-[8px]  flex justify-center items-center laptop:w-auto laptop:mt-0"
                          : "w-[48%] laptop:w-auto flex justify-center items-center"
                      }`}
                    >
                      <div
                        className={`
              ${
                index === 0
                  ? "laptop:pr-[32px] w-full pl-[42px] laptop:pl-[0px]"
                  : index === Metrics.length - 1
                    ? "laptop:pl-[33px] pl-[48px]"
                    : "laptop:px-[26px] w-full pl-[30px]"
              }
            `}
                      >
                        <TitleTag
                          as="span"
                          variant="satoshiBold"
                          className="text-[24px] laptop:text-[40px] font-bold leading-none block"
                        >
                          {item.number}
                        </TitleTag>

                        <Paragraph
                          className="laptop:mt-[8px] !mt-[0px] !text-[12px] laptop:text-[16px] text-black/60"
                          variant="normalPara"
                        >
                          {item.description}
                        </Paragraph>
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
          src="/banner-mob-image.png"
          alt="Banner"
          width={700}
          height={448}
          priority
          className="w-full h-[448px] overflow-hidden object-contain object-bottom"
        />

        <div className="absolute top-[15%] right-[8%] ">
          <SparkleIcon2 className="w-[76px] h-auto laptop:w-[104px]" />
        </div>

        <div className="absolute top-[45%] left-[8%]">
          <SparkleIcon className="w-[56px] h-auto laptop:w-[76px]" />
        </div>
      </div>
    </section>
  );
};

export default SectionMainBanner;
