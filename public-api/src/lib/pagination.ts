const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 50;

export interface PaginationParams {
  page: number;
  pageSize: number;
  skip: number;
}

export const parsePaginationParams = (
  query: Record<string, string | string[] | undefined>,
  options?: { defaultPageSize?: number; maxPageSize?: number },
): PaginationParams => {
  const defaultSize = options?.defaultPageSize ?? DEFAULT_PAGE_SIZE;
  const maxSize = options?.maxPageSize ?? MAX_PAGE_SIZE;
  const pageRaw = query.page;
  const pageSizeRaw = query.pageSize;
  const page = Math.max(
    1,
    parseInt(String(Array.isArray(pageRaw) ? pageRaw[0] : pageRaw), 10) ||
      DEFAULT_PAGE,
  );
  const pageSize = Math.min(
    maxSize,
    Math.max(
      1,
      parseInt(
        String(Array.isArray(pageSizeRaw) ? pageSizeRaw[0] : pageSizeRaw),
        10,
      ) || defaultSize,
    ),
  );
  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
  };
};
