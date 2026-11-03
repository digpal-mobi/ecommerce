import Image, { ImageProps } from "next/image";
import React from "react";

type Props = Omit<ImageProps, "alt"> & {
  alt?: string;
  atr?: any;
};

const LazyImage = ({
  src,
  width,
  height,
  alt = "Image",
  className,
  priority = false,
  loading,
  ...rest
}: Readonly<Props>) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority={priority}
      loading={priority ? undefined : (loading ?? "lazy")}
      {...rest}
    />
  );
};

export default LazyImage;
