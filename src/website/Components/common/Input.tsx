"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  subLabel?: React.ReactNode;
  error?: {
    message?: string;
  };
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      subLabel,
      error,
      className = "",
      maxLength = 250,
      minLength = 2,
      ...props
    },
    ref,
  ) => {
    return (
      <div>
        <input
          ref={ref}
          maxLength={maxLength}
          minLength={minLength}
          className={`w-full rounded px-[13px] text-satoshi outline-none transition focus:border-primary active:border-[#333333] disabled:cursor-default ${className}`}
          {...props}
        />

        {error?.message && (
          <span className="form-field-error">{error.message}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
