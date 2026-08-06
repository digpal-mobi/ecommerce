import React from "react";
import Container from "@/website/Components/common/Container";
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
      <div className="flex flex-wrap gap-x-[30px] gap-y-[20px] desktop:gap-x-[106px] py-[44px]">
        {BrandLogos.map((img, index) => (
          <Image
            key={index}
            src={img.image}
            alt={img.alt}
            width={160}
            height={38}
            className="h-[38px] max-w-[120px] tablet:max-w-[160px] object-contain"
          />
        ))}
      </div>
    </Container>
  );
};

export default SectionBrandLogo;
