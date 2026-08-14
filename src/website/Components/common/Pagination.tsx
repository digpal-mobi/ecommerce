"use client";

import React from "react";
import Button from "./Button";
import { ArrowLeft } from "@/website/lib/Icons";
import { useDispatch, useSelector } from "@/redux/store";
import { setCurrentPage } from "@/redux/slices/pagination";

const Pagination = () => {
  const dispatch = useDispatch();

  const { currentPage, limit, total } = useSelector(
    (state) => state.pagination,
  );

  const totalPages = Math.ceil(total / limit);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="w-full flex items-center justify-between mt-[20px]">
      <Button
        variant="secondary"
        disabled={currentPage === 1}
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
      >
        <ArrowLeft />
        Previous
      </Button>

      <div className="flex items-center gap-x-[10px]">
        {pages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "primary" : "secondary"}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="secondary"
        disabled={currentPage === totalPages}
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
      >
        Next
        <ArrowLeft className="rotate-180" />
      </Button>
    </div>
  );
};

export default Pagination;
