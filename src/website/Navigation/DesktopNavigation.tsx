"use client";
import { NAVIGATION_ITEMS } from "@/website/Navigation/DummyNavigation";
import { ChevronDown } from "@/website/lib/Icons";
import { useState } from "react";
import Link from "next/link";

type Props = {};

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

export type NavigationItems = NavItem;

export const DesktopHeader = (props: Props) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleDropdownClick = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <nav className="flex items-center ">
      <div className="flex items-center gap-[24px]">
        {NAVIGATION_ITEMS.map((item) => (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => setExpandedId(item.id)}
            onMouseLeave={() => setExpandedId(null)}
          >
            {item.children ? (
              <>
                <button
                  type="button"
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => handleDropdownClick(item.id)}
                >
                  <span>{item.title}</span>

                  <ChevronDown
                    className={`mt-[2px] transition-transform duration-200 ${
                      expandedId === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedId === item.id && (
                  <div className="absolute left-1/2 top-full z-50 mt-3 w-[200px] -translate-x-1/2 rounded-lg bg-white py-4 shadow-lg">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-5 py-2 hover:bg-gray-100"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link href={item.href}>{item.title}</Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default DesktopHeader;
