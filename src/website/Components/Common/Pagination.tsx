"use client";

import React from "react";
import Button from "./Button";
import { ArrowLeft } from "@/website/Lib/Icons";
import { GetPaginationPages } from "@/website/Helpers/Helper";

interface PaginationProps {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  total,
  limit,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) {
    return null;
  }

  const { startPage, endPage, pages } = GetPaginationPages(
    totalPages,
    currentPage,
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  return (
    <div className="w-full mt-[20px] flex items-center justify-between gap-[10px] max-mobile:flex-wrap max-mobile:justify-center">
      <Button
        variant="secondary"
        className="gap-[10px] shrink-0 max-tablet:!px-[12px] max-tablet:!py-[8px] max-tablet:text-[13px]"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ArrowLeft className="tablet:w-[20px] tablet:h-[20px]" />

        <span className="max-tablet:hidden">Previous</span>
      </Button>

      <div className="flex items-center justify-center gap-x-[10px] max-tablet:gap-x-[6px] max-mobile:gap-x-[4px]">
        {startPage > 1 && (
          <>
            <Button
              className="!px-[16px] rounded-lg max-tablet:!px-[12px] max-mobile:!px-[10px] max-mobile:min-w-[36px]"
              variant={currentPage === 1 ? "primary" : "secondary"}
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>

            {startPage > 2 && (
              <Button
                className="!px-[12px] border-none max-mobile:!px-[6px]"
                variant="secondary"
                onClick={() => handlePageChange(Math.max(1, startPage - 2))}
              >
                ...
              </Button>
            )}
          </>
        )}

        {pages.map((page) => (
          <Button
            className="!px-[20px] rounded-lg max-tablet:!px-[14px] max-mobile:!px-[10px] max-mobile:min-w-[36px]"
            key={page}
            variant={page === currentPage ? "primary" : "secondary"}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <Button
                variant="secondary"
                className="!px-[12px] border-none max-mobile:!px-[6px]"
                onClick={() =>
                  handlePageChange(Math.min(totalPages, endPage + 3))
                }
              >
                ...
              </Button>
            )}

            <Button
              className="!px-[20px] rounded-lg max-tablet:!px-[14px] max-mobile:!px-[10px] max-mobile:min-w-[36px]"
              variant={currentPage === totalPages ? "primary" : "secondary"}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>

      <Button
        variant="secondary"
        className="gap-[10px] shrink-0 max-tablet:!px-[12px] max-tablet:!py-[8px] max-tablet:text-[13px]"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <span className="max-tablet:hidden">Next</span>

        <ArrowLeft className="rotate-180 tablet:w-[20px] tablet:h-[20px]" />
      </Button>
    </div>
  );
};

export default Pagination;
