"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { StockSearchResult } from "@/types";
import { FinTrendChart } from "./FinTrendChart";

/* ─────────────────────────── Skeleton ─────────────────────────── */
export function ResultSkeleton() {
    return (
        <div className="result-container skeleton-container" aria-busy="true" aria-label="결과 불러오는 중">
            <div className="skeleton-header">
                <div className="skeleton-line w-60 h-8 mb-2" />
                <div className="skeleton-line w-40 h-4" />
            </div>

            <div className="skeleton-section">
                <div className="skeleton-line w-32 h-5 mb-3" />
                <div className="skeleton-line w-full h-4 mb-2" />
                <div className="skeleton-line w-full h-4 mb-2" />
                <div className="skeleton-line w-3/4 h-4" />
            </div>

            <div className="skeleton-section">
                <div className="skeleton-line w-32 h-5 mb-3" />
                {/* Table skeleton */}
                <div className="skeleton-table">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="skeleton-table-row">
                            <div className="skeleton-line w-1/3 h-4" />
                            <div className="skeleton-line w-1/4 h-4" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="skeleton-section">
                <div className="skeleton-line w-28 h-5 mb-3" />
                <div className="skeleton-line w-full h-4 mb-2" />
                <div className="skeleton-line w-5/6 h-4" />
            </div>

            <div className="loading-indicator">
                <div className="loading-dots">
                    <span />
                    <span />
                    <span />
                </div>
                <p className="loading-text">AI가 분석 중입니다…</p>
            </div>
        </div>
    );
}

/* ─────────────────────────── Result View ─────────────────────────── */
interface ResultViewProps {
    result: StockSearchResult;
    onReset: () => void;
}

const PROVIDER_LABEL = {
    gemini: "Google Gemini",
    openai: "OpenAI",
};

export function ResultView({ result, onReset }: ResultViewProps) {
    const [isSourcesOpen, setIsSourcesOpen] = useState(false);

    const date = new Date(result.createdAt).toLocaleString("ko-KR", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="result-container anim-fade-in">
            {/* Result meta bar */}
            <div className="result-meta">
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span className="result-query-chip">🔍 {result.query}</span>
                    <span className="result-provider-chip">
                        {result.provider === "gemini" ? "✨" : "🤖"}{" "}
                        {PROVIDER_LABEL[result.provider]}
                    </span>
                    <span className="result-time-chip">🕑 {date}</span>
                </div>
                <button className="btn-new-search" onClick={onReset} aria-label="새로 검색하기">
                    ← 새 검색
                </button>
            </div>

            {/* Markdown content */}
            <div className="markdown-body">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
                        h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
                        p: ({ children }) => <p className="md-p">{children}</p>,
                        ul: ({ children }) => <ul className="md-ul">{children}</ul>,
                        li: ({ children }) => <li className="md-li">{children}</li>,
                        blockquote: ({ children }) => (
                            <blockquote className="md-blockquote">{children}</blockquote>
                        ),
                        table: ({ children }) => (
                            <div className="md-table-wrap">
                                <table className="md-table">{children}</table>
                            </div>
                        ),
                        th: ({ children }) => <th className="md-th">{children}</th>,
                        td: ({ children }) => <td className="md-td">{children}</td>,
                        hr: () => <hr className="md-hr" />,
                        strong: ({ children }) => (
                            <strong className="md-strong">{children}</strong>
                        ),
                        a: ({ href, children }) => (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="md-link"
                            >
                                {children}
                            </a>
                        ),
                        code: ({ className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || "");
                            if (match && match[1] === "json") {
                                try {
                                    const parsed = JSON.parse(String(children));
                                    if (Array.isArray(parsed) && parsed.length > 0 && "revenue" in parsed[0]) {
                                        return <FinTrendChart data={parsed} />;
                                    }
                                } catch {
                                    // fallback to regular code block
                                }
                            }
                            return (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {result.content}
                </ReactMarkdown>
            </div>

            {/* Search Grounding Sources */}
            {result.sources && result.sources.length > 0 && (
                <div className="sources-section">
                    <button 
                        className="sources-header"
                        onClick={() => setIsSourcesOpen(!isSourcesOpen)}
                        style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", width: "100%", alignItems: "center", padding: 0 }}
                        aria-expanded={isSourcesOpen}
                        aria-label="출처 목록 토글"
                    >
                        <span className="sources-icon">🔗</span>
                        <span className="sources-label">참고 출처</span>
                        <span className="sources-badge">{result.sources.length}</span>
                        <span
                            style={{
                                marginLeft: "auto",
                                fontSize: "16px",
                                color: "var(--text-muted)",
                                transform: isSourcesOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s ease"
                            }}
                            aria-hidden="true"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </span>
                    </button>
                    {isSourcesOpen && (
                        <ul className="sources-list" style={{ marginTop: 12 }}>
                        {result.sources.map((source, idx) => {
                            const domain = (() => {
                                try { return new URL(source.url).hostname.replace("www.", ""); }
                                catch { return source.url; }
                            })();
                            return (
                                <li key={idx} className="sources-item">
                                    <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="sources-link"
                                    >
                                        <span className="sources-num">{idx + 1}</span>
                                        <span className="sources-text">
                                            <span className="sources-title">{source.title || domain}</span>
                                            <span className="sources-domain">{domain}</span>
                                        </span>
                                        <span className="sources-arrow">↗</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    )}
                </div>
            )}
        </div>
    );
}

/* ─────────────────────────── Error View ─────────────────────────── */
interface ErrorViewProps {
    message: string;
    onReset: () => void;
}

export function ErrorView({ message, onReset }: ErrorViewProps) {
    return (
        <div className="error-container anim-fade-in">
            <div className="error-icon">⚠️</div>
            <h3 className="error-title">오류가 발생했습니다</h3>
            <p className="error-message">{message}</p>
            <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-secondary" onClick={onReset}>
                    다시 시도
                </button>
            </div>
        </div>
    );
}
