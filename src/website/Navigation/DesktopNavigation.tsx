"use client";
import { NAVIGATION_ITEMS } from "@/website/Navigation/DummyNavigation";
import { ChevronDown } from "@/website/Lib/Icons";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export interface NavChild {
  title: string;
  href: string;
}

export interface NavItem {
  id: number;
  title: string;
  href: string;
  children?: NavChild[];
}

export const DesktopHeader = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const handleDropdownClick = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setExpandedId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav ref={navRef} className="flex items-center">
      <div className="flex items-center gap-[24px]">
        {NAVIGATION_ITEMS.map((item) => (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => item.children && setExpandedId(item.id)}
            onMouseLeave={() => setExpandedId(null)}
          >
            {item.children ? (
              <>
                <div className="flex items-center gap-1">
                  <Link
                    href={item.href}
                    className="text-[16px] font-normal text-black hover:text-black/70 transition-colors cursor-pointer"
                  >
                    <span>{item.title}</span>
                  </Link>

                  <button
                    type="button"
                    aria-label={`Toggle ${item.title} menu`}
                    className="p-1 cursor-pointer flex items-center justify-center focus:outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDropdownClick(item.id);
                    }}
                  >
                    <ChevronDown
                      className={`transition-transform duration-300 ${
                        expandedId === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                <div
                  className={`
                    absolute left-1/2 top-full z-50 
                    w-[200px] -translate-x-1/2 pt-2
                    transition-all duration-300 ease-in-out
                    ${
                      expandedId === item.id
                        ? "visible opacity-100 translate-y-0 pointer-events-auto"
                        : "invisible opacity-0 -translate-y-2 pointer-events-none"
                    }
                  `}
                >
                  <div className="overflow-hidden rounded-lg bg-white shadow-lg border border-gray-100 py-2">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setExpandedId(null)}
                        className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Link
                href={item.href}
                className="text-[16px] font-normal text-black hover:text-black/70 transition-colors"
              >
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default DesktopHeader;
