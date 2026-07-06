export interface State {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationLabelLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLabelLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface StatesDataWrapper {
  data: State[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface StatesResponse {
  success: boolean;
  message: string;
  data?: StatesDataWrapper;
}
