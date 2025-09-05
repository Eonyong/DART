import React, { useState } from "react";
import styled from "styled-components";
import { useDisclosureList } from "../hooks/useDartApi";
import SearchForm from "../components/Common/SearchForm";
import DataTable from "../components/Common/DataTable";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: 700;
`;

const PageDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const InfoCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const InfoTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const InfoItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #e1e8ed;
  display: flex;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #34495e;
`;

const InfoValue = styled.span`
  color: #7f8c8d;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid #e1e8ed;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: #3498db;
    background: #f8f9fa;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const DisclosureList: React.FC = () => {
  const [searchParams, setSearchParams] = useState<{
    corpCode: string;
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
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading, error } = useDisclosureList(
    searchParams?.corpCode || "",
    {
      ...searchParams,
      pageNo: currentPage,
      pageCount: pageSize,
    }
  );

  const searchFields = [
    {
      name: "corpCode",
      label: "기업코드",
      type: "text" as const,
      placeholder: "예: 00126380",
      required: true,
    },
    {
      name: "bgnDe",
      label: "시작일",
      type: "text" as const,
      placeholder: "YYYYMMDD 형식",
    },
    {
      name: "endDe",
      label: "종료일",
      type: "text" as const,
      placeholder: "YYYYMMDD 형식",
    },
    {
      name: "corpCls",
      label: "법인구분",
      type: "select" as const,
      options: [
        { value: "Y", label: "유가증권시장" },
        { value: "K", label: "코스닥시장" },
        { value: "N", label: "코넥스시장" },
        { value: "E", label: "기타" },
      ],
    },
    {
      name: "sort",
      label: "정렬",
      type: "select" as const,
      options: [
        { value: "date", label: "접수일자" },
        { value: "crp", label: "회사명" },
        { value: "rpt", label: "보고서명" },
      ],
    },
  ];

  const handleSearch = (params: any) => {
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchParams(null);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const columns = [
    {
      key: "rcept_dt",
      label: "접수일자",
      width: "12%",
      render: (value: string) => {
        if (!value) return "-";
        const date = new Date(value);
        return format(date, "yyyy-MM-dd", { locale: ko });
      },
    },
    {
      key: "corp_name",
      label: "회사명",
      width: "20%",
    },
    {
      key: "report_nm",
      label: "보고서명",
      width: "35%",
    },
    {
      key: "flr_nm",
      label: "제출인",
      width: "15%",
    },
    {
      key: "rm",
      label: "비고",
      width: "18%",
      render: (value: string) => value || "-",
    },
  ];

  const totalPages = data?.total_page || 1;
  const totalCount = data?.total_count || 0;

  return (
    <PageContainer>
      <PageTitle>공시목록</PageTitle>
      <PageDescription>
        최신 공시 정보와 보고서 목록을 조회할 수 있습니다.
      </PageDescription>

      <SearchForm
        fields={searchFields}
        onSearch={handleSearch}
        onReset={handleReset}
        loading={isLoading}
      />

      {searchParams && data && (
        <InfoCard>
          <InfoTitle>검색 정보</InfoTitle>
          <InfoList>
            <InfoItem>
              <InfoLabel>기업코드:</InfoLabel>
              <InfoValue>{searchParams.corpCode}</InfoValue>
            </InfoItem>
            {searchParams.bgnDe && (
              <InfoItem>
                <InfoLabel>시작일:</InfoLabel>
                <InfoValue>{searchParams.bgnDe}</InfoValue>
              </InfoItem>
            )}
            {searchParams.endDe && (
              <InfoItem>
                <InfoLabel>종료일:</InfoLabel>
                <InfoValue>{searchParams.endDe}</InfoValue>
              </InfoItem>
            )}
            {searchParams.corpCls && (
              <InfoItem>
                <InfoLabel>법인구분:</InfoLabel>
                <InfoValue>
                  {
                    searchFields[3].options?.find(
                      (opt) => opt.value === searchParams.corpCls
                    )?.label
                  }
                </InfoValue>
              </InfoItem>
            )}
            <InfoItem>
              <InfoLabel>총 건수:</InfoLabel>
              <InfoValue>{totalCount}건</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>현재 페이지:</InfoLabel>
              <InfoValue>
                {currentPage} / {totalPages}
              </InfoValue>
            </InfoItem>
          </InfoList>
        </InfoCard>
      )}

      <DataTable
        columns={columns}
        data={data?.list || []}
        loading={isLoading}
        error={error ? String(error) : null}
        emptyMessage="공시 정보가 없습니다."
        emptySubMessage="검색 조건을 확인하고 다시 시도해주세요."
      />

      {data && data.list && data.list.length > 0 && (
        <PaginationContainer>
          <PaginationButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            이전
          </PaginationButton>
          <PaginationInfo>
            {currentPage} / {totalPages} 페이지
          </PaginationInfo>
          <PaginationButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            다음
          </PaginationButton>
        </PaginationContainer>
      )}
    </PageContainer>
  );
};

export default DisclosureList;
