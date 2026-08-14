"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "@/redux/store";
import { hideToast } from "@/redux/slices/toastSlice";
import { CrossIcon } from "@/website/lib/Icons";
const Toast = () => {
  const dispatch = useDispatch();
  const { isOpen, message, type } = useSelector((state) => state.toast);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      dispatch(hideToast());
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const typeStyles = {
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    error: "bg-rose-50 text-rose-800 border-rose-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    info: "bg-sky-50 text-sky-800 border-sky-200",
  };

  const iconStyles = {
    success: "bg-emerald-500 text-white",
    error: "bg-rose-500 text-white",
    warning: "bg-amber-500 text-white",
    info: "bg-sky-500 text-white",
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100] transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-5">
      <div
        className={`flex items-center gap-3 min-w-[280px] max-w-md p-[20px] rounded-xl border shadow-lg ${
          typeStyles[type as keyof typeof typeStyles] || typeStyles.success
        }`}
        role="alert"
      >
        <div
          className={`flex items-center justify-center w-[14px] h-[14px] rounded-full text-[12px] font-[700] shrink-0 ${
            iconStyles[type as keyof typeof iconStyles] || iconStyles.success
          }`}
        >
          {type === "success" && "✓"}
          {type === "error" && "✕"}
          {type === "warning" && "!"}
          {type === "info" && "i"}
        </div>

        <p className="flex-1 text-[16px] font-[400] font-satoshi leading-tight">
          {message}
        </p>

        <button
          type="button"
          onClick={() => dispatch(hideToast())}
          className="p-1 text-[#000000]/40 hover:text-[#000000]/70 rounded-lg transition-colors focus:outline-none"
          aria-label="Close Toast"
        >
          <CrossIcon />
        </button>
      </div>
    </div>
  );
};

export default Toast;
