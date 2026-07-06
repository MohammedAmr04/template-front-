"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationComponentProps = {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  paramName?: string;
};

export function PaginationComponent({
  currentPage,
  totalPages,
  maxVisiblePages = 5, // default increased to 5
  paramName = "page",
}: PaginationComponentProps) {
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Generate page numbers with ellipsis
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if totalPages small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSibling = Math.max(2, currentPage - 1);
      const rightSibling = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1); // always show first page

      if (leftSibling > 2) {
        pages.push("ellipsis");
      }

      for (let i = leftSibling; i <= rightSibling; i++) {
        pages.push(i);
      }

      if (rightSibling < totalPages - 1) {
        pages.push("ellipsis");
      }

      pages.push(totalPages); // always show last page
    }

    return pages;
  };

  const pages = getPageNumbers();
  const pageParamKey = paramName;

  // Handle page change by updating URL
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(pageParamKey, page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  return (
    <Pagination>
      <PaginationContent className="flex items-center justify-between px-7">
        <PaginationItem>
          <PaginationPrevious
            disabled={!hasPrevious}
            onClick={(e) => {
              e.preventDefault();
              if (hasPrevious) handlePageChange(currentPage - 1);
            }}
            className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          />
        </PaginationItem>

        <div className="flex flex-row items-center gap-1">
          {pages.map((page, index) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page as number);
                  }}
                  className="cursor-pointer"
                >
                  {t("number-value", { value: page })}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
        </div>

        <PaginationItem>
          <PaginationNext
            disabled={!hasNext}
            onClick={(e) => {
              e.preventDefault();
              if (hasNext) handlePageChange(currentPage + 1);
            }}
            className="cursor-pointer text-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
