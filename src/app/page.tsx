"use client";

import { useState, useEffect } from "react";
import { useApiKey } from "@/hooks/useApiKey";
import { useSearch } from "@/hooks/useSearch";
import { useOutputConfig } from "@/hooks/useOutputConfig";
import { SettingsModal } from "@/components/SettingsModal";
import { ResultView, ResultSkeleton, ErrorView } from "@/components/ResultView";
import { OutputConfigPanel } from "@/components/OutputConfigPanel";
import { useRouter, useSearchParams } from "next/navigation";

const EXAMPLE_TICKERS = ["삼성전자", "AAPL", "SCHD", "QQQ", "005930", "NVDA", "KODEX 200"];

export default function Home() {
  const { config, setKey, setProvider, hasKey } = useApiKey();
  const { status, result, error, search, reset } = useSearch();
  const { config: outputConfig, toggle: toggleSection } = useOutputConfig();
  const [query, setQuery] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    if (!query.trim()) return;
    if (!hasKey()) {
      setIsSettingsOpen(true);
      return;
    }
    const apiKey = config[config.activeProvider] ?? "";
    // Update URL for deep linking
    router.replace(`/?q=${encodeURIComponent(query)}`);
    search(query, config.activeProvider, apiKey, outputConfig);
  };

  // Mount effect and URL param handling
  useEffect(() => {
    setMounted(true);
    const q = searchParams?.get("q");
    if (q) {
      setQuery(q);
      setTimeout(() => {
        handleSearch();
      }, 0);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleTickerClick = (ticker: string) => {
    setQuery(ticker);
    if (!hasKey()) {
      setIsSettingsOpen(true);
      return;
    }
    const apiKey = config[config.activeProvider] ?? "";
    search(ticker, config.activeProvider, apiKey, outputConfig);
  };

  const handleReset = () => {
    reset();
    setQuery("");
    router.replace("/");
  };

  const isLoading = status === "loading";
  const isResult = status === "success" && result !== null;
  const isError = status === "error";

  if (!mounted) {
    // SSR 렌더링 시에는 최소의 빈 골격만 보여주거나 null 반환
    return <main style={{ minHeight: "100dvh", backgroundColor: "var(--bg-deep)" }} />;
  }

  return (
    <>
      {/* Decorative backgrounds */}
      <div className="bg-animated" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      {/* ── Header ── */}
      <header
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 32px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <a
          href="/"
          onClick={(e) => {
            // 수정자 키(Ctrl/Shift/Meta)나 마우스 중간버튼이면 브라우저에 위임
            if (e.ctrlKey || e.shiftKey || e.metaKey || e.button === 1) return;
            e.preventDefault();
            handleReset();
          }}
          style={{ textDecoration: "none", display: "inline-flex" }}
          aria-label="홈으로"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22, lineHeight: 1 }}>📸</span>
            <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.02em" }}>
              <span className="gradient-text">Fin</span>
              <span style={{ color: "var(--text-primary)" }}>Snap</span>
            </span>
          </div>
        </a>

        <button
          id="settings-btn"
          className="settings-btn"
          onClick={() => setIsSettingsOpen(true)}
          aria-label="API Key 설정"
        >
          <span style={{ fontSize: 14 }}>⚙️</span>
          <span>설정</span>
          {hasKey() && <span className="settings-key-dot" title="API Key 저장됨" />}
        </button>
      </header>

      {/* ── Main ── */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: isResult || isLoading || isError ? 40 : 80,
          paddingBottom: 60,
          transition: "padding-top 0.4s ease",
        }}
      >
        <div className="container">
          {/* ── Landing Spacer (idle 상태) ── */}
          {!isResult && !isLoading && !isError && (
             <div style={{ minHeight: "20vh" }} />
          )}

          {/* ── Search Bar (항상 표시) ── */}
          {!isResult && !isLoading && !isError && (
            <div className="anim-4" style={{ maxWidth: 600, margin: "0 auto" }}>
              <div className="search-wrap">
                {/* Search Icon */}
                <svg
                  className="search-icon"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>

                <input
                  id="stock-search"
                  className="search-input search-input--active"
                  type="text"
                  placeholder="삼성전자, AAPL, SCHD, QQQ …"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="종목명 또는 티커 검색"
                  autoComplete="off"
                  autoFocus
                />

                <button
                  id="search-submit-btn"
                  className="search-btn search-btn--active"
                  onClick={handleSearch}
                  disabled={!query.trim()}
                  aria-label="검색"
                >
                  검색
                </button>
              </div>

              {/* 출력 항목 커스터마이징 */}
              <OutputConfigPanel config={outputConfig} onToggle={toggleSection} />

              {/* API Key 미설정 안내 */}
              {!hasKey() && (
                <div className="api-key-notice" role="alert">
                  <span>⚠️</span>
                  <span>
                    검색하려면 먼저{" "}
                    <button
                      className="inline-link"
                      onClick={() => setIsSettingsOpen(true)}
                    >
                      API Key를 설정
                    </button>
                    해주세요.
                  </span>
                </div>
              )}

            </div>
          )}


          {/* ── Skeleton Loading ── */}
          {isLoading && (
            <ResultSkeleton />
          )}

          {/* ── Result ── */}
          {isResult && result && (
            <ResultView result={result} onReset={handleReset} />
          )}

          {/* ── Error ── */}
          {isError && (
            <ErrorView message={error ?? "알 수 없는 오류"} onReset={handleReset} />
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <p>
          © 2026 Fin-Snap &nbsp;·&nbsp; Powered by Gemini & OpenAI &nbsp;·&nbsp;
          <span style={{ color: "var(--text-muted)" }}>v0.2.0</span>
        </p>
      </footer>

      {/* ── Settings Modal ── */}
      <SettingsModal
        isOpen={isSettingsOpen}
        config={config}
        onClose={() => setIsSettingsOpen(false)}
        onSave={setKey}
        onProviderChange={setProvider}
      />
    </>
  );
}
