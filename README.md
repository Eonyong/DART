# DART 공시 정보 조회 웹페이지

금융감독원 DART API를 활용하여 기업의 공시 정보를 조회할 수 있는 웹 애플리케이션입니다.

## 🚀 주요 기능

- **정기보고서 재무정보**: 기업의 재무상태표, 손익계산서 등 재무정보 조회
- **정기보고서 주요정보**: 기업의 주요 경영지표와 핵심 정보 확인
- **공시목록**: 최신 공시 정보와 보고서 목록 조회
- **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험
- **실시간 데이터**: DART API를 통한 최신 정보 제공

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: Styled Components
- **State Management**: React Query
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Deployment**: GitHub Pages

## 📋 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn
- OpenDART API 키

## 🔧 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone <repository-url>
   cd dart-disclosure-viewer
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경 변수 설정**
   ```bash
   cp env.example .env
   ```
   
   `.env` 파일에서 OpenDART API 키를 설정하세요:
   ```
   REACT_APP_DART_API_KEY=your_dart_api_key_here
   ```

4. **개발 서버 실행**

   **방법 1: 프록시 서버와 함께 실행 (권장)**
   ```bash
   npm run start:proxy
   ```

   **방법 2: 일반 실행 (CORS 오류 발생)**
   ```bash
   npm start
   ```

5. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

   > **참고**: CORS 정책으로 인해 개발 환경에서는 프록시 서버가 필요합니다. `npm run start:proxy`를 사용하면 프록시 서버(포트 8080)와 React 앱(포트 3000)이 동시에 실행됩니다.

## 🔑 OpenDART API 키 발급

1. [OpenDART 홈페이지](https://opendart.fss.or.kr)에 접속
2. 회원가입 후 로그인
3. [API 인증키 발급](https://opendart.fss.or.kr/uss/umt/EidActCnfmPage.do) 페이지에서 키 발급
4. 발급받은 키를 환경 변수에 설정

## 📦 빌드

```bash
npm run build
```

빌드된 파일은 `build` 폴더에 생성됩니다.

## 🚀 배포

### GitHub Pages 자동 배포

1. GitHub 저장소의 Settings > Secrets and variables > Actions에서 `DART_API_KEY` 시크릿 추가
2. `main` 브랜치에 푸시하면 자동으로 GitHub Pages에 배포됩니다.

### 수동 배포

```bash
npm run build
# build 폴더의 내용을 웹 서버에 업로드
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Common/         # 공통 컴포넌트
│   └── Layout/         # 레이아웃 컴포넌트
├── config/             # 설정 파일
├── hooks/              # 커스텀 훅
├── pages/              # 페이지 컴포넌트
├── services/           # API 서비스
├── styles/             # 전역 스타일
└── types/              # TypeScript 타입 정의
```

## 🔍 API 사용법

### 정기보고서 재무정보 조회

```typescript
import { useFinancialInfo } from './hooks/useDartApi';

const { data, isLoading, error } = useFinancialInfo(
  '00126380', // 기업코드
  '2023',     // 사업연도
  '11011',    // 보고서코드 (사업보고서)
  {
    fsDiv: 'CFS', // 연결재무제표
    sjDiv: 'BS'   // 재무상태표
  }
);
```

### 공시목록 조회

```typescript
import { useDisclosureList } from './hooks/useDartApi';

const { data, isLoading, error } = useDisclosureList(
  '00126380', // 기업코드
  {
    bgnDe: '20230101', // 시작일
    endDe: '20231231', // 종료일
    pageNo: 1,         // 페이지 번호
    pageCount: 20      // 페이지당 건수
  }
);
```

## 🎨 스타일링

이 프로젝트는 Styled Components를 사용하여 스타일링합니다. 주요 디자인 시스템:

- **색상**: 블루 계열의 그라데이션과 중성 색상 사용
- **타이포그래피**: 시스템 폰트 스택 사용
- **레이아웃**: CSS Grid와 Flexbox 활용
- **반응형**: 모바일 우선 접근법

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

## 🙏 감사의 말

- [금융감독원 DART](https://opendart.fss.or.kr) - 공개 API 제공
- [React](https://reactjs.org) - UI 라이브러리
- [Styled Components](https://styled-components.com) - CSS-in-JS 라이브러리
