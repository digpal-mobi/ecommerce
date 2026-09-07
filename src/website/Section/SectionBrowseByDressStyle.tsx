import React from "react";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import LazyImage from "@/website/Components/Common/LazyImage";
import Link from "next/link";

const DRESS_STYLES = [
  {
    img: "/dress_1.png",
    title: "Casual",
    href: "/shop?category=men-shirts",
  },
  {
    img: "/dress_3.png",
    title: "Formal",
    href: "/shop?category=womens-dresses",
  },
  {
    img: "/dress_2.png",
    title: "Party",
    href: "/shop?category=mens-shoes",
  },
  {
    img: "/dress_4.png",
    title: "Gym",
    href: "/shop?category=accessories",
  },
];

const SectionBrowseByDressStyle = () => {
  return (
    <MainContainer data-testid="section-browse-by-dress-style">
      <Container>
        <div className="laptop:pt-[80px] pt-[40px]">
          <div className="rounded-[40px] bg-[#F0F0F0] px-[24px] tablet:px-[50px] laptop:px-[64px] laptop:!pb-[76px] laptop:!pt-[75px]">
            <h2 className="font-integral text-center laptop:pl-[2px] pl-[0px] text-[32px] laptop:text-[48px] font-[700] leading-[1] uppercase text-[#1C1C1C]">
              BROWSE BY DRESS STYLE
            </h2>

            <div className="mt-[67px] grid grid-cols-1 laptop:grid-cols-8 gap-y-[20px] laptop:gap-[20px]">
              {DRESS_STYLES.map((dress, index) => (
                <Link
                  key={dress.title}
                  href={dress.href}
                  aria-label={`Browse ${dress.title} dress styles`}
                  className={`
                  group relative overflow-hidden rounded-[20px] cursor-pointer block
                  ${index === 0 || index === 3 ? "col-span-3" : ""}
                  ${index === 1 || index === 2 ? "col-span-5" : ""}
                `}
                >
                  <LazyImage
                    src={dress.img}
                    alt={dress.title}
                    width={600}
                    height={300}
                    className="h-[290px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <h3 className="absolute left-[36px] top-[25px] font-satoshi text-[36px] font-bold text-[#000000]">
                    {dress.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </MainContainer>
  );
};

export default SectionBrowseByDressStyle;
