export interface PaginationOption {
  totalCount: number;
  perPage?: number;
  current?: number;
  previous?: number;
  previousPage?: string;
  currentPage?: string;
  more?: boolean;
  nextPage?: string;
  next?: string;
}
