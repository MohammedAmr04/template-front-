export interface StateBase {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
}

export interface City {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
  state: StateBase;
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

export interface CitiesDataWrapper {
  data: City[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface CitiesResponse {
  success: boolean;
  message: string;
  data?: CitiesDataWrapper;
}
