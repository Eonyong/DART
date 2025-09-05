import axios, { AxiosResponse } from 'axios';
import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import { 
  DartApiResponse, 
  CompanyInfo, 
  DisclosureInfo, 
  FinancialInfo 
} from '../types/dart';

class DartApiService {
  private baseURL = API_CONFIG.baseUrl;
  private apiKey = API_CONFIG.apiKey;

  private async makeRequest<T>(
    endpoint: string, 
    params: Record<string, any> = {}
  ): Promise<DartApiResponse<T>> {
    try {
      const response: AxiosResponse<DartApiResponse<T>> = await axios.get(
        `${this.baseURL}${endpoint}`,
        {
          params: {
            ...params,
            crtfc_key: this.apiKey,
          },
          timeout: API_CONFIG.timeout,
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('DART API 요청 실패:', error);
      throw new Error('API 요청 중 오류가 발생했습니다.');
    }
  }

  // 기업 목록 조회
  async getCompanyList(): Promise<CompanyInfo[]> {
    const response = await this.makeRequest<CompanyInfo>(API_ENDPOINTS.COMPANY_LIST);
    return response.list || [];
  }

  // 공시 목록 조회
  async getDisclosureList(
    corpCode: string,
    options?: {
      bgnDe?: string;
      endDe?: string;
      lastReprtAt?: string;
      pblntfDetailTy?: string;
      pblntfDetailTyCd?: string;
      corpCls?: string;
      sort?: string;
      sortMn?: string;
      pageNo?: number;
      pageCount?: number;
    }
  ): Promise<DartApiResponse<DisclosureInfo>> {
    const params: Record<string, any> = {
      corp_code: corpCode,
    };

    if (options) {
      if (options.bgnDe) params.bgn_de = options.bgnDe;
      if (options.endDe) params.end_de = options.endDe;
      if (options.lastReprtAt) params.last_reprt_at = options.lastReprtAt;
      if (options.pblntfDetailTy) params.pblntf_detail_ty = options.pblntfDetailTy;
      if (options.pblntfDetailTyCd) params.pblntf_detail_ty_cd = options.pblntfDetailTyCd;
      if (options.corpCls) params.corp_cls = options.corpCls;
      if (options.sort) params.sort = options.sort;
      if (options.sortMn) params.sort_mn = options.sortMn;
      if (options.pageNo) params.page_no = options.pageNo;
      if (options.pageCount) params.page_count = options.pageCount;
    }

    return this.makeRequest<DisclosureInfo>(API_ENDPOINTS.DISCLOSURE_LIST, params);
  }

  // 정기보고서 재무정보 조회
  async getFinancialInfo(
    corpCode: string,
    bsnsYear: string,
    reprtCode: string,
    options?: {
      fsDiv?: string;
      sjDiv?: string;
    }
  ): Promise<DartApiResponse<FinancialInfo>> {
    const params: Record<string, any> = {
      corp_code: corpCode,
      bsns_year: bsnsYear,
      reprt_code: reprtCode,
    };

    if (options) {
      if (options.fsDiv) params.fs_div = options.fsDiv;
      if (options.sjDiv) params.sj_div = options.sjDiv;
    }

    return this.makeRequest<FinancialInfo>(API_ENDPOINTS.FINANCIAL_INFO, params);
  }

  // 정기보고서 주요정보 조회
  async getMainInfo(
    corpCode: string,
    bsnsYear: string,
    reprtCode: string,
    options?: {
      fsDiv?: string;
    }
  ): Promise<DartApiResponse<FinancialInfo>> {
    const params: Record<string, any> = {
      corp_code: corpCode,
      bsns_year: bsnsYear,
      reprt_code: reprtCode,
    };

    if (options && options.fsDiv) params.fs_div = options.fsDiv;

    return this.makeRequest<FinancialInfo>(API_ENDPOINTS.MAIN_INFO, params);
  }
}

export const dartApiService = new DartApiService();
