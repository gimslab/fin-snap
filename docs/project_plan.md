# Fin-Snap: AI 기반 금융 정보 스냅샷

## 개요
사용자가 주식이나 ETF 종목명을 입력하면 AI(Gemini/OpenAI)를 사용하여 가장 핵심적인 관련 정보를 요약하여 제공하는 웹 애플리케이션입니다.

## 기술 스택 (제안)
- **Frontend/Framework**: Next.js (React) 또는 Vite (React)
- **Styling**: Modern CSS (Vanilla CSS Modules or Styled Components)
- **Deployment**: Vercel
- **State Management**: React Hooks & Context API (API Key 및 검색 기록 관리)
- **Storage**: LocalStorage (사용자 브라우저에 API Key 저장)

## 프로젝트 마일스톤

### 1단계: 프로젝트 초기화 및 기반 설정 (Project Setup)
- [x] Git 저장소 초기화
- [x] Next.js 프로젝트 생성 (`npx create-next-app`)
- [x] 기본 디렉토리 구조 및 설정 파일 구성
- [x] Vercel 배포 환경 구성 → https://fin-snap.vercel.app

### 2단계: 핵심 기능 설계 및 구현 (Core Logic)
- [ ] **AI Service Layer 구현**:
    - [ ] Gemini API 연동
    - [ ] OpenAI API 연동
    - [x] API Key 관리 로직 (브라우저 저장소 활용)
- [x] **Data Model 정의**:
    - [x] 주식 정보 요청/응답 구조 설계

### 3단계: UI/UX 디자인 및 구현 (Frontend Implementation)
- [x] **메인 페이지 (Landing)**:
    - [x] 깔끔하고 집중도 높은 검색창 디자인
    - [x] 동적 배경 또는 미려한 인터랙션
- [ ] **결과 페이지 (Result View)**:
    - 마크다운 렌더링을 통한 가독성 높은 정보 표시
    - 로딩 애니메이션 (Skeleton loading)
- [ ] **설정 모달 (Settings)**:
    - API Key 입력 및 검증 UI

### 4단계: 테스트 및 배포 (Polish & Deploy)
- [ ] 브라우저 호환성 테스트
- [ ] 모바일 반응형 디자인 최적화
- [ ] Vercel 배포 및 도메인 연결

## 진행 방식
1. **문서화**: `docs/` 디렉토리에 진행 상황을 기록하며 개발합니다.
2. **반복적 개발**:
    - 먼저 간단한 Hello World를 띄우고,
    - API 연동을 확인한 뒤,
    - UI를 입히는 순서로 진행합니다.
