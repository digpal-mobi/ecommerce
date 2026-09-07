"use client";

import React, { InputHTMLAttributes } from "react";

type CheckBoxProps = Readonly<
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    id?: string;
    label?: string;
    "aria-label"?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
  }
>;

const CheckBox = ({
  id,
  label,
  "aria-label": ariaLabel,
  checked,
  onChange,
  disabled = false,
  className = "",
  ...props
}: Readonly<CheckBoxProps>) => {
  const accessibleName = ariaLabel || label;
  const inputId =
    id ||
    (accessibleName
      ? `checkbox-${accessibleName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`
      : undefined);

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-label={accessibleName}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
          {...props}
        />
        <div
          className={`h-[18px] w-[18px] rounded-[4px] border transition-all flex items-center justify-center ${
            checked
              ? "border-black bg-black text-white"
              : "border-[#D4D4D4] bg-white hover:border-[#888888]"
          }`}
        >
          {checked && (
            <svg
              className="h-[12px] w-[12px]"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      {label && <span className="text-[14px] text-[#111111]">{label}</span>}
    </label>
  );
};

export default CheckBox;
