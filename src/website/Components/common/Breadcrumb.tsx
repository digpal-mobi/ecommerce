import Link from "next/link";
import { CrumbArrow } from "@/website/lib/Icons";

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface Props {
  items?: BreadcrumbItem[];
}

const Breadcrumb = ({ items = [] }: Props) => {
  return (
    <div className="relative flex w-full min-w-0 shrink-0 items-center justify-start tablet-lg:justify-center">
      <nav
        aria-label="Breadcrumb"
        className="font-sans breadcrumb-wrapper flex w-full min-w-0 flex-nowrap items-center justify-start overflow-hidden bg-transparent"
      >
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <div
              key={item.url || item.name}
              className={`flex items-center ${isLastItem ? "min-w-0 overflow-hidden" : "shrink-0"}`}
            >
              {item.url && !isLastItem ? (
                <Link
                  href={item.url}
                  className="text-[#000000]/60 font-rubik font-[400] tablet:text-[14px] text-[12px] leading-[100%] hover:underline"
                  title={item.name}
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={`text-[#000000] font-rubik font-[400] tablet:text-[14px] text-[12px] leading-[100%]"
                    }`}
                  title={item.name}
                >
                  {item.name}
                </span>
              )}

              {!isLastItem && (
                <span className="tablet-lg:mx-[10px] mx-[8px]">
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
