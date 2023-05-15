import Link from "next/link";
import { useRouter } from "next/router";
import IconChevronLeft from "@/components/icons/IconChevronLeft";
import IconChevronRight from "@/components/icons/IconChevronRight";

export default function Navigation({ currentPage, totalPages }: any) {
  const router = useRouter();

  let pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  pages = pages.slice(1, pages.length - 1);

  pages = pages.slice(
    Math.max(currentPage - 3, 0),
    Math.min(currentPage, pages.length)
  );

  if ( totalPages === 1 ) {
    return <></>;
  }

  return (
    <div className="flex justify-center gap-1 my-8">
      {currentPage > 1 ? (
        <div className="flex gap-1">
          <Link
            href={{
              query: {
                ...router.query,
                page: currentPage - 1,
              },
            }}
            className="flex items-center justify-center text-sm border border-primary rounded w-8 h-8"
          >
            <IconChevronLeft />
          </Link>
          <Link
            href={{
              query: {
                ...router.query,
                page: 1,
              },
            }}
            className="flex items-center justify-center text-sm border border-primary rounded w-8 h-8"
          >
            1
          </Link>
        </div>
      ) : (
        <div className="flex gap-1">
          <span className="flex items-center justify-center text-sm border border-night-3 text-night-3 rounded w-8 h-8">
            <IconChevronLeft />
          </span>
          <Link
            href={{
              query: {
                ...router.query,
                page: 1,
              },
            }}
            className="flex items-center justify-center text-sm border border-frost-0 bg-frost-0 text-night-0 rounded w-8 h-8"
          >
            1
          </Link>
        </div>
      )}
      {currentPage <= 2 ? (
        ""
      ) : (
        <div className="flex items-center justify-center w-8 h-8">...</div>
      )}
      <div className="flex gap-1">
        {pages.map((pageIndex) => {
          return (
            <Link
              key={pageIndex}
              href={{
                query: {
                  ...router.query,
                  page: pageIndex,
                },
              }}
              className={`flex items-center justify-center text-sm border border-primary rounded w-8 h-8
                ${
                  currentPage === pageIndex
                    ? "border-frost-0 bg-frost-0 text-night-0"
                    : ""
                }`}
            >
              {pageIndex}
            </Link>
          );
        })}
      </div>
      {currentPage >= totalPages - 1 ? (
        ""
      ) : (
        <div className="flex items-center justify-center w-8 h-8">...</div>
      )}
      {currentPage < totalPages ? (
        <div className="flex gap-1">
          <Link
            href={{
              query: {
                ...router.query,
                page: totalPages,
              },
            }}
            className="flex items-center justify-center text-sm border border-primary rounded w-8 h-8"
          >
            {totalPages}
          </Link>
          <Link
            href={{
              query: {
                ...router.query,
                page: currentPage + 1,
              },
            }}
            className="flex items-center justify-center text-sm border border-primary rounded w-8 h-8"
          >
            <IconChevronRight />
          </Link>
        </div>
      ) : (
        <div className="flex gap-1">
          <Link
            key={totalPages}
            href={{
              query: {
                ...router.query,
                page: totalPages,
              },
            }}
            className="flex items-center justify-center text-sm border border-frost-0 bg-frost-0 text-night-0 rounded w-8 h-8"
          >
            {totalPages}
          </Link>
          <span className="flex items-center justify-center text-sm border border-night-3 text-night-3 rounded w-8 h-8">
            <IconChevronRight />
          </span>
        </div>
      )}
    </div>
  );
}
