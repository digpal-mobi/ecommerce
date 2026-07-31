import React from "react";
import Container from "../Components/Container";
import Image from "next/image";

const DRESS_STYLES = [
  {
    img: "/dress_1.png",
    title: "Casual",
  },
  {
    img: "/dress_2.png",
    title: "Formal",
  },
  {
    img: "/dress_3.png",
    title: "Party",
  },
  {
    img: "/dress_4.png",
    title: "GYM",
  },
];

const SectionBrowseByDressStyle = () => {
  return (
    <Container>
      <div className="rounded-[40px] bg-[#F0F0F0] px-[24px] tablet:px-[50px] laptop:px-[64px] py-[27px] laptop:py-[70px]">
        <h2 className="font-integral text-center text-[32px] laptop:text-[48px] font-[700] leading-[1] uppercase text-[#1C1C1C]">
          BROWSE BY DRESS STYLES
        </h2>

        <div className="mt-[64px] grid grid-cols-1 laptop:grid-cols-3 gap-y-[20px] laptop:gap-[20px]">
          {DRESS_STYLES.map((dress, index) => (
            <div
              key={index}
              className={`
                relative overflow-hidden rounded-[20px]
                ${index === 0 || index === 3 ? "col-span-1" : ""}
                ${index === 1 || index === 2 ? "col-span-2" : ""}
              `}
            >
              <Image
                src={dress.img}
                alt={dress.title}
                width={600}
                height={300}
                className="h-[290px] w-full object-cover"
              />

              <h3 className="absolute left-[36px] top-[25px] font-satoshi text-[36px] font-bold text-black">
                {dress.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default SectionBrowseByDressStyle;
