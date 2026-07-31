"use client";
import { NAVIGATION_ITEMS } from "@/website/Navigation/DummyNavigation";
import { ChevronDown } from "../lib/Icons";
import { useState } from "react";

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
          <div key={item.id} className="relative">
            {item.children ? (
              <>
                <div
                  className="flex items-center ease-in-out transition-all gap-1 cursor-pointer"
                  onClick={() => handleDropdownClick(item.id)}
                >
                  <span className="">{item.title}</span>
                  {expandedId ? ( 
                    <ChevronDown className="rotate-180 mt-[2px]" />
                  ) : (
                    <ChevronDown className="mt-[2px]" />
                  )}
                </div>

                {expandedId === item.id && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white w-[200px] shadow-lg px-[25px] py-[20px] z-100 rounded-lg">
                    {item.children.map((subItem) => (
                      <div
                        key={subItem.href}
                        className="py-[10px] items-center flex hover:text-gray-600 cursor-pointer"
                      >
                        {subItem.title}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div>{item.title}</div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default DesktopHeader;
