import React from "react";

type Props = {
  btnText: string;
  variant: "primary" | "secondary" | "outline";
  classNames?: string;
};

const Button = (props: Props) => {
  const { btnText, variant = "primary", classNames } = props;
  return (
    <div className="flex justify-center items-center w-full h-[52px]">
      <button
        className={`px-[80px] py-[15px] font-satoshi border-[#000000/10] border-[1px] outline-none rounded-full ${classNames} ${variant === "primary" ? "bg-[#000000] text-[#ffff] hover:opacity-80" : variant === "secondary" ? "bg-outline text-[#000] hover:opacity-80" : null} `}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Button;
