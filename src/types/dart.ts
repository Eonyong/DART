// OpenDART API 응답 타입 정의

export interface DartApiResponse<T> {
  status: string;
  message: string;
  list: T[];
  page_no?: number;
  page_count?: number;
  total_count?: number;
  total_page?: number;
}

export interface CompanyInfo {
  corp_code: string;
  corp_name: string;
  stock_code: string;
  modify_date: string;
}

export interface DisclosureInfo {
  rcept_no: string;
  corp_cls: string;
  corp_code: string;
  corp_name: string;
  flr_nm: string;
  rcept_dt: string;
  rm: string;
  stock_code: string;
  report_nm: string;
}

export interface FinancialInfo {
  rcept_no: string;
  reprt_code: string;
  bsns_year: string;
  corp_code: string;
  sj_div: string;
  sj_nm: string;
  account_id: string;
  account_nm: string;
  account_detail: string;
  thstrm_nm: string;
  thstrm_amount: string;
  thstrm_add_amount: string;
  frmtrm_nm: string;
  frmtrm_amount: string;
  frmtrm_add_amount: string;
  bfefrmtrm_nm: string;
  bfefrmtrm_amount: string;
  ord: string;
  currency: string;
}

export interface TabConfig {
  id: string;
  label: string;
  path: string;
  description: string;
}

export interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  timeout: number;
}
