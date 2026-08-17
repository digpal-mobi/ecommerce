"use client";

import React, { useEffect } from "react";
import Button from "./Button";
import { ArrowLeft } from "@/website/lib/Icons";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setCurrentPage,
  setTotalProductCount,
} from "@/redux/slices/paginationSlice";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { GetPaginationPages } from "@/website/helpers/helper";

interface PaginationProps {
  currentPage?: number;
  total?: number;
  limit?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage: propCurrentPage,
  total: propTotal,
  limit: propLimit,
  onPageChange,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const reduxPagination = useSelector((state) => state.pagination);

  const currentPage = propCurrentPage ?? reduxPagination.currentPage;
  const total = propTotal ?? reduxPagination.total;
  const limit = propLimit ?? reduxPagination.limit;

  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const { startPage, endPage, pages } = GetPaginationPages(
    totalPages,
    currentPage,
  );

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    if (onPageChange) {
      onPageChange(page);
    } else if (searchParams && pathname) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  useEffect(() => {
    dispatch(setTotalProductCount(total));
  }, [total]);

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
