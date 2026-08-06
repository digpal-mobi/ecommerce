import React, { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

type Props = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const BUTTON_VARIANTS: Record<
  ButtonVariant,
  {
    button: string;
  }
> = {
  primary: {
    button:
      "bg-black text-white hover:opacity-80 flex items-center justify-center",
  },

  secondary: {
    button:
      "border border-black/10 bg-white text-black hover:opacity-80 flex items-center justify-center",
  },

  outline: {
    button:
      "border-2 border-[#000000]/30 bg-transparent text-black hover:bg-black hover:text-white flex items-center justify-center",
  },
};

const Button = ({
  variant = "primary",
  className = "",
  children,
  onClick,
  type = "button",
}: Props) => {
  const styles = BUTTON_VARIANTS[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full py-[15px] px-[32px] h-full cursor-pointer font-satoshi text-[16px] font-[500] leading-[1.3em] outline-none transition-all ${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
