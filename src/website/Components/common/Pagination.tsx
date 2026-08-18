"use client";

import React from "react";
import Button from "./Button";
import { ArrowLeft } from "@/website/lib/Icons";
import { GetPaginationPages } from "@/website/helpers/helper";

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
    <div className="w-full flex items-center justify-between mt-[20px]">
      <Button
        variant="secondary"
        className="gap-[10px]"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ArrowLeft />
        Previous
      </Button>

      <div className="flex items-center gap-x-[10px]">
        {startPage > 1 && (
          <>
            <Button
              variant={currentPage === 1 ? "primary" : "secondary"}
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>

            {startPage > 2 && (
              <Button
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
            className="!px-[20px] rounded-lg"
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
                className="!px-[20px] border-none"
                onClick={() =>
                  handlePageChange(Math.min(totalPages, endPage + 3))
                }
              >
                ...
              </Button>
            )}

            <Button
              className="!px-[20px] rounded-lg"
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
        className="gap-[10px]"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
        <ArrowLeft className="rotate-180" />
      </Button>
    </div>
  );
};

export default Pagination;
