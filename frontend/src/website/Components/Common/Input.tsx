"use client";

import React, { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = Readonly<
  InputHTMLAttributes<HTMLInputElement> & {
    label?: React.ReactNode;
    subLabel?: React.ReactNode;
    error?: {
      message?: string;
    };
    className?: string;
  }
>;

const Input = forwardRef<HTMLInputElement, Readonly<InputProps>>(
  (
    {
      label,
      subLabel,
      error,
      className = "",
      maxLength = 250,
      minLength = 2,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id;
    const computedAriaLabel =
      props["aria-label"] ||
      (typeof label === "string" ? label : (props.placeholder || undefined));

    return (
      <div className="w-full">
        {label && <label htmlFor={inputId}>{label}</label>}
        {subLabel && (
          <span className="text-xs text-gray-500 ml-2">{subLabel}</span>
        )}

        <input
          ref={ref}
          id={inputId}
          maxLength={maxLength}
          minLength={minLength}
          aria-label={computedAriaLabel}
          className={`w-full rounded px-[13px] py-[12px] text-satoshi outline-none transition focus:border-primary active:border-[#333333] disabled:cursor-default ${className}`}
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
