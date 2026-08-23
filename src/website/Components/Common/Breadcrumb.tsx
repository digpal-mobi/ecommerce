import Link from "next/link";
import { CrumbArrow } from "@/website/Lib/Icons";

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

type Props = Readonly<{
  items?: BreadcrumbItem[];
  className?: string;
}>;

export function formatBreadcrumbLabel(name: string): string {
  if (!name) return "";
  if (name.includes("-") || name.includes("_")) {
    return name
      .split(/[-_]+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  return name
    .split(" ")
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ""))
    .join(" ");
}

const Breadcrumb = ({ items = [], className = "" }: Readonly<Props>) => {
  return (
    <div
      className={`relative flex w-full min-w-0 shrink-0 items-center justify-start ${className}`.trim()}
    >
      <nav
        aria-label="Breadcrumb"
        className="font-sans breadcrumb-wrapper flex w-full min-w-0 flex-nowrap items-center justify-start overflow-hidden bg-transparent"
      >
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          const formattedName = formatBreadcrumbLabel(item.name);
          const uniqueKey = `${item.url || "current"}-${item.name}-${index}`;

          return (
            <div
              key={uniqueKey}
              className={`flex items-center ${
                isLastItem ? "min-w-0 overflow-hidden" : "shrink-0"
              }`}
            >
              {item.url && !isLastItem ? (
                <Link
                  href={item.url}
                  className="text-[#000000]/60 font-rubik font-[400] tablet:text-[14px] text-[12px] leading-[100%] hover:underline capitalize"
                  title={formattedName}
                >
                  {formattedName}
                </Link>
              ) : (
                <span
                  className="text-[#000000] font-rubik font-[400] tablet:text-[14px] text-[12px] leading-[100%] truncate capitalize"
                  title={formattedName}
                >
                  {formattedName}
                </span>
              )}

              {!isLastItem && (
                <span className="tablet-lg:mx-[10px] mx-[8px] shrink-0">
                  <CrumbArrow />
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;
