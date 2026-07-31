import React from "react";

type Props = {
  btnText?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  children?: React.ReactNode;
};

const Button = (props: Props) => {
  const { btnText, variant = "primary", className, children } = props;
  return (
    <div
      className={`flex items-center h-[52px] ${className} ${variant == "primary" ? "w-[210px]" : "w-[218px]"}`}
    >
      <button
        className={`py-[15px] font-satoshi font-[500] w-full text-[16px] leading-[1.3em] outline-none rounded-full ${variant === "primary" ? "bg-[#000000] text-[#ffff] hover:opacity-80" : variant === "secondary" ? "bg-outline text-[#000] hover:opacity-80 border-[#000000]/10 border-[1px]" : null} `}
      >
        {children ?? btnText}
      </button>
    </div>
  );
};

export default Button;
