export default function Home() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>📸</span>
          <span
            style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.02em" }}
          >
            <span className="gradient-text">Fin</span>
            <span style={{ color: "var(--text-primary)" }}>Snap</span>
          </span>
        </div>

        <div className="coming-soon">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#fbbf24",
              display: "inline-block",
            }}
          />
          개발 중
        </div>
      </header>

      {/* ── Hero Section ── */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: 80,
          paddingBottom: 60,
        }}
      >
        <div className="container">
          {/* Badge */}
          <div
            style={{ textAlign: "center", marginBottom: 28 }}
            className="anim-1"
          >
            <span className="badge badge-blue">
              <span>✨</span>
              AI 기반 금융 정보 스냅샷
            </span>
          </div>

          {/* Headline */}
          <h1
            className="anim-2"
            style={{
              fontSize: "clamp(36px, 6vw, 60px)",
              fontWeight: 800,
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: 18,
            }}
          >
            종목명 하나로
            <br />
            <span className="gradient-text">핵심 정보 즉시 파악</span>
          </h1>

          {/* Sub-headline */}
          <p
            className="anim-3"
            style={{
              textAlign: "center",
              color: "var(--text-secondary)",
              fontSize: "clamp(15px, 2vw, 18px)",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto 44px",
            }}
          >
            주식이나 ETF 종목명을 입력하면 AI가{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              PER, 배당수익률, 52주 고저가
            </strong>{" "}
            등 핵심 정보를 요약해드립니다.
          </p>

          {/* Search Bar (disabled) */}
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
                className="search-input"
                type="text"
                placeholder="삼성전자, AAPL, SCHD, QQQ …"
                disabled
                aria-label="종목명 또는 티커 검색"
              />

              <button className="search-btn" disabled aria-label="검색 (준비 중)">
                검색
              </button>
            </div>

            {/* Example tickers */}
            <div className="tickers" role="list" aria-label="검색 예시">
              {[
                "삼성전자",
                "AAPL",
                "SCHD",
                "QQQ",
                "005930",
                "NVDA",
                "KODEX 200",
              ].map((t) => (
                <span className="ticker-pill" key={t} role="listitem">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Feature Cards */}
          <div className="features-grid anim-5">
            <article className="card feature-card">
              <div className="feature-icon icon-blue" aria-hidden="true">
                🤖
              </div>
              <h2 className="feature-title">AI 요약 분석</h2>
              <p className="feature-desc">
                Gemini 또는 OpenAI를 선택해 종목 정보를 자연어로 즉시 요약받으세요.
              </p>
            </article>

            <article className="card feature-card">
              <div className="feature-icon icon-purple" aria-hidden="true">
                🔑
              </div>
              <h2 className="feature-title">API Key 직접 관리</h2>
              <p className="feature-desc">
                API Key는 내 브라우저에만 저장됩니다. 서버에 전송되거나 저장되지 않아 안전합니다.
              </p>
            </article>

            <article className="card feature-card">
              <div className="feature-icon icon-green" aria-hidden="true">
                ⚡
              </div>
              <h2 className="feature-title">즉각적인 스냅샷</h2>
              <p className="feature-desc">
                복잡한 리서치 대신, 투자 판단에 필요한 핵심 지표만 빠르게 확인하세요.
              </p>
            </article>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <p>
          © 2026 Fin-Snap &nbsp;·&nbsp; Powered by Gemini & OpenAI &nbsp;·&nbsp;
          <span style={{ color: "var(--text-muted)" }}>v0.1.0</span>
        </p>
      </footer>
    </>
  );
}
