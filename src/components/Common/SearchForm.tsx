import React, { useState } from 'react';
import styled from 'styled-components';
import { media, responsiveFlex } from '../../styles/ResponsiveStyles';

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FormTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  ${media.tablet`
    grid-template-columns: 1fr;
  `}
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ButtonGroup = styled.div`
  ${responsiveFlex}
  justify-content: flex-end;

  ${media.mobile`
    flex-direction: column;
  `}
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
  cursor: pointer;

  ${props => props.variant === 'primary' ? `
    background: #3498db;
    color: white;
    border: 2px solid #3498db;

    &:hover {
      background: #2980b9;
      border-color: #2980b9;
    }
  ` : `
    background: white;
    color: #7f8c8d;
    border: 2px solid #e1e8ed;

    &:hover {
      background: #f8f9fa;
      border-color: #bdc3c7;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface SearchFormProps {
  onSearch: (params: any) => void;
  onReset: () => void;
  loading?: boolean;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'select' | 'number';
    options?: { value: string; label: string }[];
    placeholder?: string;
    required?: boolean;
  }[];
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  onSearch, 
  onReset, 
  loading = false, 
  fields 
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  const handleReset = () => {
    setFormData({});
    onReset();
  };

  return (
    <FormContainer>
      <FormTitle>검색 조건</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGrid>
          {fields.map((field) => (
            <FormGroup key={field.name}>
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span style={{ color: '#e74c3c' }}> *</span>}
              </Label>
              {field.type === 'select' ? (
                <Select
                  id={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  required={field.required}
                >
                  <option value="">선택하세요</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  id={field.name}
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              )}
            </FormGroup>
          ))}
        </FormGrid>
        <ButtonGroup>
          <Button type="button" onClick={handleReset}>
            초기화
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? '검색 중...' : '검색'}
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default SearchForm;
