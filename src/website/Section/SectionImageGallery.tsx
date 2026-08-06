"use client";

import React, { useState } from "react";
import LazyImage from "@/website/Components/common/LazyImage";

type Props = {
  images?: string[];
};

const SectionImageGallery = ({ images = [] }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0] || "");

  return (
    <div className="relative flex flex-col-reverse tablet:flex-row w-full items-center tablet:items-start gap-[14px]">
      <div
        className={`flex flex-row tablet:flex-col gap-[15px] w-full tablet:w-auto overflow-x-auto tablet:overflow-y-auto ${
          images.length > 3 ? "tablet:max-h-[401px] pr-1" : ""
        }`}
      >
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(img)}
            className="cursor-pointer flex-shrink-0"
          >
            <LazyImage
              src={img}
              alt={`Image ${index + 1}`}
              width={152}
              height={127}
              className={`w-[110px] tablet:w-full tablet:max-w-[157px] rounded-[14px] bg-[#F0EEED] object-cover transition-all ${
                selectedImage === img ? "ring-2 ring-[#000000]/30" : ""
              }`}
            />
          </button>
        ))}
      </div>

      <div className="flex w-full items-center">
        <LazyImage
          src={selectedImage || images[0]}
          alt="Selected Image"
          width={444}
          height={530}
          className="h-auto w-full max-w-[444px] rounded-[16px] tablet:rounded-[20px] bg-[#F0EEED] object-cover"
        />
      </div>
    </div>
  );
};

export default SectionImageGallery;
