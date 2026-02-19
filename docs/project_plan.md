# Fin-Snap: AI 기반 금융 정보 스냅샷

## 개요
사용자가 주식이나 ETF 종목명을 입력하면 AI(Gemini/OpenAI)를 사용하여 가장 핵심적인 관련 정보를 요약하여 제공하는 웹 애플리케이션입니다.

## 기술 스택
- **Frontend/Framework**: Next.js (React)
- **Styling**: Modern CSS (Vanilla CSS Modules)
- **Deployment**: Vercel
- **State Management**: React Hooks & Context API (API Key 및 검색 기록 관리)
- **Storage**: LocalStorage (사용자 브라우저에 API Key 저장)
- **AI 모델**: Gemini 2.5 Flash (`gemini-2.5-flash`)
- **데이터 수집 전략**:
  - **Phase 1 (현재)**: Gemini Search Grounding — Gemini가 Google 검색을 통해 최신 정보를 직접 수집
  - **Phase 2 (예정)**: 외부 전문 금융 API 연동 — 정확한 실시간 데이터를 직접 가져온 후 Gemini는 분석/정리만 담당

## 프로젝트 마일스톤

### 1단계: 프로젝트 초기화 및 기반 설정 (Project Setup)
- [x] Git 저장소 초기화
- [x] Next.js 프로젝트 생성 (`npx create-next-app`)
- [x] 기본 디렉토리 구조 및 설정 파일 구성
- [x] Vercel 배포 환경 구성 → https://fin-snap.vercel.app

### 2단계: 핵심 기능 설계 및 구현 (Core Logic)
- [x] **AI Service Layer 구현**:
    - [x] Gemini API 연동 (`gemini-2.5-flash`)
    - [x] Gemini Search Grounding 적용 (최신 데이터 수집)
    - [ ] OpenAI API 연동 (추후)
    - [x] API Key 관리 로직 (브라우저 저장소 활용)
- [x] **Data Model 정의**:
    - [x] 주식 정보 요청/응답 구조 설계

### 2.5단계: 데이터 수집 고도화 (Data Layer Upgrade)
> 📌 Search Grounding 동작 확인 후, 외부 전문 금융 API로 전환 예정 (문제 유무와 무관하게 반드시 진행)

- [ ] **외부 금융 API 연동 (Phase 2)**:
    - [ ] 후보 API 선정 (Yahoo Finance / Alpha Vantage / Financial Modeling Prep 등)
    - [ ] 종목 검색 → 실시간 데이터 fetch 로직 구현
    - [ ] Gemini 프롬프트에 실시간 데이터를 주입하는 파이프라인 구성
    - [ ] Search Grounding 제거 후 Gemini는 분석/정리 전담으로 전환
    - [ ] 한국 종목(KRX) 데이터 지원 확인

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
