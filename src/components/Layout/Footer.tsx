import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: white;
  padding: 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const FooterLink = styled.a`
  color: #3498db;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          본 서비스는{" "}
          <FooterLink
            href="https://opendart.fss.or.kr"
            target="_blank"
            rel="noopener noreferrer"
          >
            금융감독원 DART
          </FooterLink>{" "}
          의 공개 API를 활용하여 제공됩니다.
        </FooterText>
        <FooterText style={{ marginTop: "0.5rem" }}>
          © 2024 DART 공시 정보 조회. All rights reserved.
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
