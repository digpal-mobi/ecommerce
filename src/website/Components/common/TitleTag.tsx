import { JSX, ReactNode } from "react";

type TitleVariant = "bold" | "heading" | "mainHeading" | "satoshiBold";

type Props = {
  children?: ReactNode;
  as?: keyof Pick<
    JSX.IntrinsicElements,
    "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span"
  >;
  variant?: TitleVariant;
  className?: string;
};

const VARIANT_CLASSES: Record<TitleVariant, string> = {
  bold: "font-integral text-[16px] font-[700] leading-[1em] laptop:text-[20px]",

  heading:
    "font-integral laptop:text-[48px] text-[32px] leading-[36px] font-[700]",

  mainHeading:
    "font-integral laptop:text-[64px] text-[36px] leading-[36px] font-[700]",
  satoshiBold:
    "font-satoshi laptop:text-[16px] text-[20px] leading-[1.3em] font-[500]",
};

const TitleTag = ({
  children,
  as: Tag = "h2",
  variant = "bold",
  className = "",
}: Props) => {
  return (
    <Tag className={`${VARIANT_CLASSES[variant]} ${className}`.trim()}>
      {children}
    </Tag>
  );
};

export default TitleTag;
