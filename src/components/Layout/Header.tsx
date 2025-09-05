import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "../../styles/ResponsiveStyles";

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.tablet`
    flex-direction: column;
    gap: 1rem;
  `}
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  ${media.tablet`
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  `}

  ${media.mobile`
    gap: 0.5rem;
  `}
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <LogoIcon>D</LogoIcon>
          DART 공시 정보 조회
        </Logo>
        <Nav>
          <NavLink to="/">홈</NavLink>
          <NavLink to="/financial">재무정보</NavLink>
          <NavLink to="/main-info">주요정보</NavLink>
          <NavLink to="/disclosure">공시목록</NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
