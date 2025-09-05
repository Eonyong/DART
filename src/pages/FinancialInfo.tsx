import React, { useState } from "react";
import styled from "styled-components";
import { useFinancialInfo } from "../hooks/useDartApi";
import SearchForm from "../components/Common/SearchForm";
import DataTable from "../components/Common/DataTable";

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

const FinancialInfo: React.FC = () => {
  const [searchParams, setSearchParams] = useState<{
    corpCode: string;
    bsnsYear: string;
    reprtCode: string;
    fsDiv?: string;
    sjDiv?: string;
  } | null>(null);

  const { data, isLoading, error } = useFinancialInfo(
    searchParams?.corpCode || "",
    searchParams?.bsnsYear || "",
    searchParams?.reprtCode || "",
    {
      fsDiv: searchParams?.fsDiv,
      sjDiv: searchParams?.sjDiv,
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
      name: "bsnsYear",
      label: "사업연도",
      type: "number" as const,
      placeholder: "예: 2023",
      required: true,
    },
    {
      name: "reprtCode",
      label: "보고서코드",
      type: "select" as const,
      required: true,
      options: [
        { value: "11011", label: "사업보고서" },
        { value: "11012", label: "반기보고서" },
        { value: "11013", label: "1분기보고서" },
        { value: "11014", label: "3분기보고서" },
      ],
    },
    {
      name: "fsDiv",
      label: "개별/연결구분",
      type: "select" as const,
      options: [
        { value: "CFS", label: "연결재무제표" },
        { value: "OFS", label: "개별재무제표" },
      ],
    },
    {
      name: "sjDiv",
      label: "재무제표구분",
      type: "select" as const,
      options: [
        { value: "BS", label: "재무상태표" },
        { value: "IS", label: "손익계산서" },
        { value: "CF", label: "현금흐름표" },
        { value: "SCE", label: "자본변동표" },
      ],
    },
  ];

  const handleSearch = (params: any) => {
    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchParams(null);
  };

  const columns = [
    {
      key: "sj_nm",
      label: "재무제표명",
      width: "20%",
    },
    {
      key: "account_nm",
      label: "계정명",
      width: "25%",
    },
    {
      key: "account_detail",
      label: "계정상세",
      width: "25%",
    },
    {
      key: "thstrm_amount",
      label: "당기금액",
      width: "15%",
      render: (value: string) => (value ? Number(value).toLocaleString() : "-"),
    },
    {
      key: "frmtrm_amount",
      label: "전기금액",
      width: "15%",
      render: (value: string) => (value ? Number(value).toLocaleString() : "-"),
    },
  ];

  return (
    <PageContainer>
      <PageTitle>정기보고서 재무정보</PageTitle>
      <PageDescription>
        기업의 재무상태표, 손익계산서 등 재무정보를 조회할 수 있습니다.
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
            <InfoItem>
              <InfoLabel>사업연도:</InfoLabel>
              <InfoValue>{searchParams.bsnsYear}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>보고서:</InfoLabel>
              <InfoValue>
                {
                  searchFields[2].options?.find(
                    (opt) => opt.value === searchParams.reprtCode
                  )?.label
                }
              </InfoValue>
            </InfoItem>
            {searchParams.fsDiv && (
              <InfoItem>
                <InfoLabel>개별/연결:</InfoLabel>
                <InfoValue>
                  {
                    searchFields[3].options?.find(
                      (opt) => opt.value === searchParams.fsDiv
                    )?.label
                  }
                </InfoValue>
              </InfoItem>
            )}
            {searchParams.sjDiv && (
              <InfoItem>
                <InfoLabel>재무제표:</InfoLabel>
                <InfoValue>
                  {
                    searchFields[4].options?.find(
                      (opt) => opt.value === searchParams.sjDiv
                    )?.label
                  }
                </InfoValue>
              </InfoItem>
            )}
            <InfoItem>
              <InfoLabel>총 건수:</InfoLabel>
              <InfoValue>
                {data.total_count || data.list?.length || 0}건
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
        emptyMessage="재무정보가 없습니다."
        emptySubMessage="검색 조건을 확인하고 다시 시도해주세요."
      />
    </PageContainer>
  );
};

export default FinancialInfo;
