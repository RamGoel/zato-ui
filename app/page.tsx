"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn, themes } from "@/lib/design-system";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
            theme === t.name
              ? "bg-ai-primary text-white"
              : "bg-surface-overlay text-secondary hover:bg-interactive-hover"
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-primary border-b border-subtle pb-2">{title}</h2>
      {children}
    </section>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn("h-2 w-2 rounded-full bg-streaming-dot ai-animate-typing-dot", `ai-typing-dot-${i}`)}
        />
      ))}
    </div>
  );
}

export default function DesignSystemDemo() {
  return (
    <div className="min-h-screen bg-surface-base">
      <div className="mx-auto max-w-3xl px-6 py-12 space-y-12">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold ai-gradient-text">AI Kit</h1>
          <p className="text-secondary">Design system for AI-first components</p>
          <ThemeSwitcher />
        </header>

        <Section title="Colors">
          <div className="grid grid-cols-4 gap-3">
            <div className="h-12 rounded-lg bg-ai-primary" />
            <div className="h-12 rounded-lg bg-ai-secondary" />
            <div className="h-12 rounded-lg bg-status-success" />
            <div className="h-12 rounded-lg bg-status-error" />
          </div>
        </Section>

        <Section title="Message Bubbles">
          <div className="space-y-3 max-w-md">
            <div className="flex justify-end">
              <div className="px-4 py-2 rounded-2xl rounded-br-sm bg-message-user text-message-user">
                How does this work?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-2xl rounded-bl-sm bg-message-ai text-message-ai shadow-sm">
                It uses semantic tokens that adapt to the theme.
              </div>
            </div>
          </div>
        </Section>

        <Section title="Loading States">
          <div className="flex items-center gap-6">
            <div className="bg-surface-overlay rounded-full shadow-sm">
              <TypingIndicator />
            </div>
            <div className="h-6 w-6 border-2 border-ai-primary border-t-transparent rounded-full ai-animate-spin" />
            <div className="h-4 w-32 rounded ai-animate-shimmer" />
          </div>
        </Section>

        <Section title="Buttons">
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-ai-primary text-white hover:bg-ai-primary-hover transition-colors ai-focus-ring">
              Primary
            </button>
            <button className="px-4 py-2 rounded-lg bg-surface-overlay text-primary border border-default hover:bg-interactive-hover transition-colors ai-focus-ring">
              Secondary
            </button>
            <button className="px-4 py-2 rounded-lg bg-status-error-subtle text-status-error hover:bg-status-error hover:text-white transition-colors ai-focus-ring">
              Danger
            </button>
          </div>
        </Section>

        <Section title="Code">
          <pre className="p-4 rounded-lg bg-code text-code text-sm font-mono overflow-x-auto">
            <code>
              <span style={{ color: "var(--code-keyword)" }}>const</span>{" "}
              <span style={{ color: "var(--code-function)" }}>stream</span> ={" "}
              <span style={{ color: "var(--code-keyword)" }}>await</span> fetch(
              <span style={{ color: "var(--code-string)" }}>"/api/chat"</span>);
            </code>
          </pre>
        </Section>
      </div>
    </div>
  );
}
