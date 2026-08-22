import React from "react";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import Image from "next/image";
import Link from "next/link";

const DRESS_STYLES = [
  {
    img: "/dress_1.png",
    title: "Casual",
    href: "/shop?category=men-shirts",
  },
  {
    img: "/dress_2.png",
    title: "Women",
    href: "/shop?category=womens-dresses",
  },
  {
    img: "/dress_3.png",
    title: "Men Shoes",
    href: "/shop?category=mens-shoes",
  },
  {
    img: "/dress_4.png",
    title: "Accessories",
    href: "/shop?category=accessories",
  },
];

const SectionBrowseByDressStyle = () => {
  return (
    <MainContainer>
      <Container>
        <div className="rounded-[40px] bg-[#F0F0F0] px-[24px] tablet:px-[50px] laptop:px-[64px] py-[27px] laptop:py-[70px]">
          <h2 className="font-integral text-center text-[32px] laptop:text-[48px] font-[700] leading-[1] uppercase text-[#1C1C1C]">
            BROWSE BY DRESS STYLES
          </h2>

          <div className="mt-[64px] grid grid-cols-1 laptop:grid-cols-3 gap-y-[20px] laptop:gap-[20px]">
            {DRESS_STYLES.map((dress, index) => (
              <Link
                key={index}
                href={dress.href}
                className={`
                  group relative overflow-hidden rounded-[20px] cursor-pointer block
                  ${index === 0 || index === 3 ? "col-span-1" : ""}
                  ${index === 1 || index === 2 ? "col-span-2" : ""}
                `}
              >
                <Image
                  src={dress.img}
                  alt={dress.title}
                  width={600}
                  height={300}
                  className="h-[290px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <h3 className="absolute left-[36px] top-[25px] font-satoshi text-[36px] font-bold text-black">
                  {dress.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </MainContainer>
  );
};

export default SectionBrowseByDressStyle;
