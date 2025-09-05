import { useQuery } from '@tanstack/react-query';
import { dartApiService } from '../services/dartApi';

// 기업 목록 조회 훅
export const useCompanyList = () => {
  return useQuery(['companyList'], () => dartApiService.getCompanyList(), {
    staleTime: 1000 * 60 * 60, // 1시간
    cacheTime: 1000 * 60 * 60 * 24, // 24시간
  });
};

// 공시 목록 조회 훅
export const useDisclosureList = (
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
) => {
  return useQuery(
    ['disclosureList', corpCode, options],
    () => dartApiService.getDisclosureList(corpCode, options),
    {
      enabled: !!(corpCode && corpCode.trim()),
      staleTime: 1000 * 60 * 5, // 5분
      cacheTime: 1000 * 60 * 30, // 30분
    }
  );
};

// 정기보고서 재무정보 조회 훅
export const useFinancialInfo = (
  corpCode: string,
  bsnsYear: string,
  reprtCode: string,
  options?: {
    fsDiv?: string;
    sjDiv?: string;
  }
) => {
  return useQuery(
    ['financialInfo', corpCode, bsnsYear, reprtCode, options],
    () => dartApiService.getFinancialInfo(corpCode, bsnsYear, reprtCode, options),
    {
      enabled: !!(corpCode && corpCode.trim() && bsnsYear && bsnsYear.trim() && reprtCode && reprtCode.trim()),
      staleTime: 1000 * 60 * 10, // 10분
      cacheTime: 1000 * 60 * 60, // 1시간
    }
  );
};

// 정기보고서 주요정보 조회 훅
export const useMainInfo = (
  corpCode: string,
  bsnsYear: string,
  reprtCode: string,
  options?: {
    fsDiv?: string;
  }
) => {
  return useQuery(
    ['mainInfo', corpCode, bsnsYear, reprtCode, options],
    () => dartApiService.getMainInfo(corpCode, bsnsYear, reprtCode, options),
    {
      enabled: !!(corpCode && corpCode.trim() && bsnsYear && bsnsYear.trim() && reprtCode && reprtCode.trim()),
      staleTime: 1000 * 60 * 10, // 10분
      cacheTime: 1000 * 60 * 60, // 1시간
    }
  );
};
