"use client";

import { useState, useEffect, useRef } from "react";
import type { AiProvider, ApiKeyConfig } from "@/types";

interface SettingsModalProps {
    isOpen: boolean;
    config: ApiKeyConfig;
    onClose: () => void;
    onSave: (provider: AiProvider, key: string) => void;
    onProviderChange: (provider: AiProvider) => void;
}

export function SettingsModal({
    isOpen,
    config,
    onClose,
    onSave,
    onProviderChange,
}: SettingsModalProps) {
    const [geminiKey, setGeminiKey] = useState(config.gemini ?? "");
    const [openaiKey, setOpenaiKey] = useState(config.openai ?? "");
    const [activeProvider, setActiveProvider] = useState<AiProvider>(
        config.activeProvider
    );
    const [showGemini, setShowGemini] = useState(false);
    const [showOpenAI, setShowOpenAI] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    // config 변경 시 폼 동기화
    useEffect(() => {
        setGeminiKey(config.gemini ?? "");
        setOpenaiKey(config.openai ?? "");
        setActiveProvider(config.activeProvider);
    }, [config, isOpen]);

    // ESC 키로 닫기
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (geminiKey.trim()) onSave("gemini", geminiKey.trim());
        if (openaiKey.trim()) onSave("openai", openaiKey.trim());
        onProviderChange(activeProvider);
        onClose();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) onClose();
    };

    const maskKey = (key: string) => {
        if (!key) return "";
        return key.slice(0, 6) + "•".repeat(Math.min(key.length - 10, 20)) + key.slice(-4);
    };

    return (
        <div
            ref={overlayRef}
            className="modal-overlay"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
        >
            <div className="modal-panel">
                {/* Header */}
                <div className="modal-header">
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 20 }}>🔑</span>
                        <h2 id="settings-title" className="modal-title">
                            API Key 설정
                        </h2>
                    </div>
                    <button
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="설정 닫기"
                    >
                        ✕
                    </button>
                </div>

                {/* Security notice */}
                <div className="modal-notice">
                    <span style={{ fontSize: 14 }}>🔒</span>
                    <p>API Key는 <strong>내 브라우저에만</strong> 저장됩니다. 서버로 전송되거나 외부에 공유되지 않습니다.</p>
                </div>

                {/* Provider Selector */}
                <div className="modal-section">
                    <label className="modal-label">사용할 AI 제공자</label>
                    <div className="provider-tabs">
                        {(["gemini", "openai"] as AiProvider[]).map((p) => (
                            <button
                                key={p}
                                className={`provider-tab ${activeProvider === p ? "active" : ""}`}
                                onClick={() => setActiveProvider(p)}
                            >
                                {p === "gemini" ? (
                                    <>
                                        <span className="provider-icon">✨</span>
                                        Google Gemini
                                    </>
                                ) : (
                                    <>
                                        <span className="provider-icon">🤖</span>
                                        OpenAI
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gemini Key Input */}
                <div className="modal-section">
                    <label htmlFor="gemini-key" className="modal-label">
                        Gemini API Key
                        {config.gemini && (
                            <span className="key-saved-badge">✓ 저장됨</span>
                        )}
                    </label>
                    <div className="key-input-wrap">
                        <input
                            id="gemini-key"
                            type={showGemini ? "text" : "password"}
                            className="modal-input"
                            placeholder={config.gemini ? maskKey(config.gemini) : "AIza..."}
                            value={geminiKey}
                            onChange={(e) => setGeminiKey(e.target.value)}
                            autoComplete="off"
                            spellCheck={false}
                        />
                        <button
                            className="key-toggle-btn"
                            onClick={() => setShowGemini(!showGemini)}
                            aria-label={showGemini ? "숨기기" : "보기"}
                            type="button"
                        >
                            {showGemini ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <p className="modal-hint">
                        <a
                            href="https://aistudio.google.com/app/apikey"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google AI Studio
                        </a>에서 무료로 발급받을 수 있습니다.
                    </p>
                </div>

                {/* OpenAI Key Input */}
                <div className="modal-section">
                    <label htmlFor="openai-key" className="modal-label">
                        OpenAI API Key
                        {config.openai && (
                            <span className="key-saved-badge">✓ 저장됨</span>
                        )}
                    </label>
                    <div className="key-input-wrap">
                        <input
                            id="openai-key"
                            type={showOpenAI ? "text" : "password"}
                            className="modal-input"
                            placeholder={config.openai ? maskKey(config.openai) : "sk-..."}
                            value={openaiKey}
                            onChange={(e) => setOpenaiKey(e.target.value)}
                            autoComplete="off"
                            spellCheck={false}
                        />
                        <button
                            className="key-toggle-btn"
                            onClick={() => setShowOpenAI(!showOpenAI)}
                            aria-label={showOpenAI ? "숨기기" : "보기"}
                            type="button"
                        >
                            {showOpenAI ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <p className="modal-hint">
                        <a
                            href="https://platform.openai.com/api-keys"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            OpenAI Platform
                        </a>에서 발급받을 수 있습니다.
                    </p>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>
                        취소
                    </button>
                    <button className="btn-primary" onClick={handleSave}>
                        저장하기
                    </button>
                </div>
            </div>
        </div>
    );
}
