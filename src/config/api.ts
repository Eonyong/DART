import { ApiConfig } from '../types/dart';

// 개발 환경에서는 CORS 프록시 사용
const isDevelopment = process.env.NODE_ENV === 'development';
const PROXY_URL = 'http://localhost:8080';

// 프로덕션에서는 CORS 프록시 서비스 사용
const PRODUCTION_PROXY = 'https://cors-anywhere.herokuapp.com';

export const API_CONFIG: ApiConfig = {
  baseUrl: isDevelopment 
    ? `${PROXY_URL}/api`
    : `${PRODUCTION_PROXY}/https://opendart.fss.or.kr/api`,
  apiKey: process.env.REACT_APP_DART_API_KEY || '',
  timeout: 10000,
};

export const API_ENDPOINTS = {
  // 기업 정보 조회
  COMPANY_LIST: '/corpCode.xml',
  
  // 공시 정보 조회
  DISCLOSURE_LIST: '/list.json',
  
  // 정기보고서 재무정보
  FINANCIAL_INFO: '/fnlttSinglAcnt.json',
  
  // 정기보고서 주요정보
  MAIN_INFO: '/fnlttSinglAcntAll.json',
} as const;

export const DISCLOSURE_TYPES = {
  // 정기보고서
  ANNUAL_REPORT: 'A001',
  SEMI_ANNUAL_REPORT: 'A002',
  QUARTERLY_REPORT: 'A003',
  
  // 주요사항보고서
  MAJOR_EVENTS: 'B001',
  
  // 기타
  OTHER: 'C001',
} as const;
