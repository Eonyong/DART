import React from "react";
import styled from "styled-components";
import { media } from "../../styles/ResponsiveStyles";

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  ${media.mobile`
    font-size: 0.8rem;
  `}
`;

const TableHeader = styled.thead`
  background: #f8f9fa;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #e1e8ed;
  font-size: 0.9rem;

  ${media.mobile`
    padding: 0.5rem;
    font-size: 0.8rem;
  `}
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #e1e8ed;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #34495e;
  font-size: 0.9rem;
  vertical-align: top;

  ${media.mobile`
    padding: 0.5rem;
    font-size: 0.8rem;
  `}
`;

const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  color: #7f8c8d;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const EmptySubtext = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const LoadingState = styled.div`
  padding: 3rem;
  text-align: center;
  color: #7f8c8d;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e1e8ed;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorState = styled.div`
  padding: 3rem;
  text-align: center;
  color: #e74c3c;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ErrorText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ErrorSubtext = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`;

interface Column {
  key: string;
  label: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  emptySubMessage?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  loading = false,
  error = null,
  emptyMessage = "데이터가 없습니다.",
  emptySubMessage = "검색 조건을 확인해주세요.",
}) => {
  if (loading) {
    return (
      <TableContainer>
        <LoadingState>
          <LoadingSpinner />
          <p>데이터를 불러오는 중...</p>
        </LoadingState>
      </TableContainer>
    );
  }

  if (error) {
    return (
      <TableContainer>
        <ErrorState>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorText>오류가 발생했습니다</ErrorText>
          <ErrorSubtext>{error}</ErrorSubtext>
        </ErrorState>
      </TableContainer>
    );
  }

  if (!data || data.length === 0) {
    return (
      <TableContainer>
        <EmptyState>
          <EmptyIcon>📊</EmptyIcon>
          <EmptyText>{emptyMessage}</EmptyText>
          <EmptySubtext>{emptySubMessage}</EmptySubtext>
        </EmptyState>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            {columns.map((column) => (
              <TableHeaderCell key={column.key} style={{ width: column.width }}>
                {column.label}
              </TableHeaderCell>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
