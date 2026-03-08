import Link from "next/link";
import { PAGINATION } from "./Pagination.styles";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  getPageHref: (page: number) => string;
}

const ELLIPSIS = "…";

const getPageNumbers = (
  currentPage: number,
  totalPages: number,
): (number | typeof ELLIPSIS)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const middle = [currentPage - 1, currentPage, currentPage + 1].filter(
    (p) => p > 1 && p < totalPages,
  );
  const result: (number | typeof ELLIPSIS)[] = [1];
  if (currentPage > 3) result.push(ELLIPSIS);
  result.push(...middle);
  if (currentPage < totalPages - 2) result.push(ELLIPSIS);
  if (totalPages > 1) result.push(totalPages);
  return result;
};

export const Pagination = ({
  currentPage,
  totalPages,
  getPageHref,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav
      className={PAGINATION.root}
      aria-label="Paginacija"
    >
      <ul className={PAGINATION.list}>
        {prevPage !== null && (
          <li>
            <Link
              href={getPageHref(prevPage)}
              className={PAGINATION.link}
              aria-label="Prethodna strana"
            >
              ←
            </Link>
          </li>
        )}
        {pages.map((p, i) =>
          p === ELLIPSIS ? (
            <li key={`ellipsis-${i}`} className={PAGINATION.ellipsis}>
              {ELLIPSIS}
            </li>
          ) : (
            <li key={p}>
              <Link
                href={getPageHref(p)}
                className={`${PAGINATION.link} ${
                  p === currentPage ? PAGINATION.linkActive : ""
                }`}
                aria-label={`Strana ${p}`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </Link>
            </li>
          ),
        )}
        {nextPage !== null && (
          <li>
            <Link
              href={getPageHref(nextPage)}
              className={PAGINATION.link}
              aria-label="Sledeća strana"
            >
              →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
