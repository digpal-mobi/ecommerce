import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  atr?: any;
};

const LazyImage = ({
  src,
  width,
  height,
  alt = "Image",
  className,
  atr,
}: Props) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      {...atr}
    />
  );
};

export default LazyImage;
