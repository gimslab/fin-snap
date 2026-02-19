# Fin-Snap 💹

> AI 기반 금융 정보 스냅샷 서비스

주식 또는 ETF 종목명을 입력하면 AI(Gemini / OpenAI)가 핵심 관련 정보를 즉시 요약해드리는 웹 애플리케이션입니다.

---

## 주요 기능

- 🔍 **종목 검색**: 주식·ETF 종목명 입력 한 번으로 AI 요약 정보 제공
- 🤖 **AI 멀티 지원**: Google Gemini / OpenAI 중 선택 사용
- 🔑 **API Key 관리**: 사용자 브라우저(LocalStorage)에 키를 저장 — 서버에 전송되지 않음
- 📱 **반응형 UI**: 모바일 / 데스크탑 모두 최적화
- 🚀 **Vercel 배포**: Edge-ready Next.js App Router 기반

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Vanilla CSS (CSS Modules) |
| AI | Google Gemini API / OpenAI API |
| Storage | Browser LocalStorage |
| Deployment | Vercel |

---

## 로컬 개발 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/YOUR_USERNAME/fin-snap.git
cd fin-snap
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정 (선택 사항)

```bash
cp .env.local.example .env.local
# .env.local 파일을 열어 필요한 값을 입력하세요
```

> ⚠️ API Key는 브라우저 LocalStorage에 저장되므로, 서버 측 환경 변수는 필수가 아닙니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

---

## 프로젝트 구조

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # 루트 레이아웃
│   ├── page.tsx          # 메인 페이지 (검색)
│   └── globals.css       # 전역 스타일
├── components/           # 재사용 UI 컴포넌트
│   ├── SearchBar/
│   ├── ResultCard/
│   ├── SettingsModal/
│   └── LoadingSkeleton/
├── lib/                  # 비즈니스 로직
│   ├── ai/
│   │   ├── gemini.ts     # Gemini API 클라이언트
│   │   └── openai.ts     # OpenAI API 클라이언트
│   └── storage.ts        # LocalStorage 유틸리티
├── hooks/                # 커스텀 React Hooks
│   ├── useApiKey.ts
│   └── useSearch.ts
└── types/                # TypeScript 타입 정의
    └── index.ts
```

---

## 문서

자세한 개발 계획은 [`docs/project_plan.md`](./docs/project_plan.md)를 참고하세요.

---

## 배포

[Vercel](https://vercel.com)을 통해 배포됩니다. `main` 브랜치에 Push하면 자동으로 배포됩니다.
