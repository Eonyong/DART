import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TabConfig } from '../types/dart';
import { responsiveGrid, responsiveFontSize } from '../styles/ResponsiveStyles';

const HomeContainer = styled.div`
  text-align: center;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 4rem 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
`;

const HeroTitle = styled.h1`
  ${responsiveFontSize.h1}
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const TabGrid = styled.div`
  ${responsiveGrid}
  margin-top: 2rem;
`;

const TabCard = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e1e8ed;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const TabIcon = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  background: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
`;

const TabTitle = styled.h3`
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const TabDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
`;

const FeatureSection = styled.section`
  margin-top: 4rem;
  padding: 3rem 2rem;
  background: #f8f9fa;
  border-radius: 12px;
`;

const FeatureTitle = styled.h2`
  ${responsiveFontSize.h2}
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

const FeatureGrid = styled.div`
  ${responsiveGrid}
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const FeatureItem = styled.div`
  text-align: center;
  padding: 1.5rem;
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
`;

const Home: React.FC = () => {
  const tabs: TabConfig[] = [
    {
      id: 'financial',
      label: '정기보고서 재무정보',
      path: '/financial',
      description: '기업의 재무상태표, 손익계산서 등 재무정보를 조회할 수 있습니다.'
    },
    {
      id: 'main-info',
      label: '정기보고서 주요정보',
      path: '/main-info',
      description: '기업의 주요 경영지표와 핵심 정보를 확인할 수 있습니다.'
    },
    {
      id: 'disclosure',
      label: '공시목록',
      path: '/disclosure',
      description: '최신 공시 정보와 보고서 목록을 조회할 수 있습니다.'
    }
  ];

  const features = [
    {
      icon: '📊',
      title: '실시간 데이터',
      description: 'DART API를 통해 최신 공시 정보를 실시간으로 제공합니다.'
    },
    {
      icon: '🔍',
      title: '상세 검색',
      description: '기업명, 기간, 보고서 유형별로 상세한 검색이 가능합니다.'
    },
    {
      icon: '📱',
      title: '반응형 디자인',
      description: '모든 디바이스에서 최적화된 사용자 경험을 제공합니다.'
    },
    {
      icon: '⚡',
      title: '빠른 조회',
      description: '캐싱을 통한 빠른 데이터 조회와 효율적인 API 활용을 제공합니다.'
    }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>DART 공시 정보 조회</HeroTitle>
        <HeroSubtitle>
          금융감독원 DART API를 활용하여 기업의 공시 정보를 쉽고 빠르게 조회하세요.
        </HeroSubtitle>
      </HeroSection>

      <TabGrid>
        {tabs.map((tab) => (
          <TabCard key={tab.id} to={tab.path}>
            <TabIcon color={getTabColor(tab.id)}>
              {getTabIcon(tab.id)}
            </TabIcon>
            <TabTitle>{tab.label}</TabTitle>
            <TabDescription>{tab.description}</TabDescription>
          </TabCard>
        ))}
      </TabGrid>

      <FeatureSection>
        <FeatureTitle>주요 기능</FeatureTitle>
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureItem key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <TabTitle style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                {feature.title}
              </TabTitle>
              <FeatureText>{feature.description}</FeatureText>
            </FeatureItem>
          ))}
        </FeatureGrid>
      </FeatureSection>
    </HomeContainer>
  );
};

// 탭별 아이콘과 색상 설정
const getTabIcon = (tabId: string): string => {
  switch (tabId) {
    case 'financial':
      return '💰';
    case 'main-info':
      return '📈';
    case 'disclosure':
      return '📋';
    default:
      return '📊';
  }
};

const getTabColor = (tabId: string): string => {
  switch (tabId) {
    case 'financial':
      return '#3498db';
    case 'main-info':
      return '#e74c3c';
    case 'disclosure':
      return '#2ecc71';
    default:
      return '#95a5a6';
  }
};

export default Home;
