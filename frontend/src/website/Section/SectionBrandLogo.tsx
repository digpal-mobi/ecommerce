import React from "react";
import {
  Container,
  MainContainer,
} from "@/website/Components/Common/Container";
import LazyImage from "@/website/Components/Common/LazyImage";

type BrandLogoItem = {
  image: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

const BrandLogos: BrandLogoItem[] = [
  {
    image: "/versace.png",
    alt: "Versace Image",
    width: 166,
    height: 33,
    className: "w-[116px] tablet:w-[166px] h-auto object-contain",
  },
  {
    image: "/zara.png",
    alt: "Zara Image",
    width: 91,
    height: 38,
    className: "w-[63px] tablet:w-[91px] h-auto object-contain",
  },
  {
    image: "/gucci.png",
    alt: "Gucci Image",
    width: 156,
    height: 36,
    className: "w-[109px] tablet:w-[156px] h-auto object-contain",
  },
  {
    image: "/prada.png",
    alt: "Prada Image",
    width: 194,
    height: 32,
    className: "w-[127px] tablet:w-[194px] h-auto object-contain",
  },
  {
    image: "/calvin_klein.png",
    alt: "Calvin Klein Image",
    width: 207,
    height: 33,
    className: "w-[134px] tablet:w-[207px] h-auto object-contain",
  },
];

const SectionBrandLogo = () => {
  return (
    <MainContainer data-testid="section-brand-logo" className="bg-[#000]">
      <Container className="bg-[#000] !py-0">
        <div className="flex flex-wrap items-center justify-center laptop:justify-between gap-x-[34px] gap-y-[20px] desktop:gap-x-[106px] py-[39px] laptop:py-[42px]">
          {BrandLogos.map((img) => (
            <LazyImage
              key={img.image}
              src={img.image}
              alt={img.alt}
              width={img.width ?? 160}
              height={img.height ?? 38}
              className={
                img.className ??
                "h-[38px] max-w-[120px] tablet:max-w-[160px] object-contain"
              }
            />
          ))}
        </div>
      </Container>
    </MainContainer>
  );
};

export default SectionBrandLogo;
