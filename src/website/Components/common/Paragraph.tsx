import { JSX, ReactNode } from "react";

type TitleVariant = "boldPara" | "normalPara";

type Props = {
  children?: ReactNode;
  variant?: TitleVariant;
  className?: string;
};

const VARIANT_CLASSES: Record<TitleVariant, string> = {
  boldPara:
    "font-satoshi text-[20px] font-[700] leading-[1em] laptop:text-[24px]",

  normalPara:
    "font-satoshi text-[14px] font-[400] leading-[22px] laptop:text-[16px]",
};

const Paragraph = ({
  children,
  variant = "boldPara",
  className = "",
}: Props) => {
  return (
    <p className={`${VARIANT_CLASSES[variant]} ${className}`.trim()}>
      {children}
    </p>
  );
};

export default Paragraph;
