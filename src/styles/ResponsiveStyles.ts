import { css } from 'styled-components';

// 반응형 브레이크포인트
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px',
};

// 미디어 쿼리 헬퍼
export const media = {
  mobile: (styles: any) => css`
    @media (max-width: ${breakpoints.mobile}) {
      ${styles}
    }
  `,
  tablet: (styles: any) => css`
    @media (max-width: ${breakpoints.tablet}) {
      ${styles}
    }
  `,
  desktop: (styles: any) => css`
    @media (max-width: ${breakpoints.desktop}) {
      ${styles}
    }
  `,
  wide: (styles: any) => css`
    @media (min-width: ${breakpoints.wide}) {
      ${styles}
    }
  `,
};

// 공통 반응형 스타일
export const responsiveGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  ${media.tablet`
    grid-template-columns: 1fr;
    gap: 1rem;
  `}
`;

export const responsiveFlex = css`
  display: flex;
  gap: 1rem;

  ${media.tablet`
    flex-direction: column;
    gap: 0.5rem;
  `}
`;

export const responsivePadding = css`
  padding: 2rem;

  ${media.tablet`
    padding: 1rem;
  `}

  ${media.mobile`
    padding: 0.5rem;
  `}
`;

export const responsiveFontSize = {
  h1: css`
    font-size: 2.5rem;

    ${media.tablet`
      font-size: 2rem;
    `}

    ${media.mobile`
      font-size: 1.5rem;
    `}
  `,
  h2: css`
    font-size: 2rem;

    ${media.tablet`
      font-size: 1.5rem;
    `}

    ${media.mobile`
      font-size: 1.2rem;
    `}
  `,
  h3: css`
    font-size: 1.3rem;

    ${media.tablet`
      font-size: 1.1rem;
    `}

    ${media.mobile`
      font-size: 1rem;
    `}
  `,
  body: css`
    font-size: 1rem;

    ${media.tablet`
      font-size: 0.9rem;
    `}

    ${media.mobile`
      font-size: 0.8rem;
    `}
  `,
};
