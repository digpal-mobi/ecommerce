import React from "react";
import Container from "../Components/Container";
import Image from "next/image";

type Props = {};

const BrandLogos = [
  { image: "/versace.png", alt: "Versace Image" },
  { image: "/zara.png", alt: "Zara Image" },
  { image: "/gucci.png", alt: "Gucci Image" },
  { image: "/prada.png", alt: "Prada Image" },
  { image: "/calvin_klein.png", alt: "Calvin Klein Image" },
];

const SectionBrandLogo = (props: Props) => {
  return (
    <Container className="bg-[#000] !py-0">
      <div className="flex flex-wrap gap-[30px] laptop:gap-[106px] py-[44px]">
        {BrandLogos.map((img, index) => (
          <Image
            key={index}
            src={img.image}
            alt={img.alt}
            width={160}
            height={38}
            className="h-[38px] object-contain"
          />
        ))}
      </div>
    </Container>
  );
};

export default SectionBrandLogo;
