/**
 * @name Code Block
 * @description Syntax highlighted code block with copy button.
 * @category primitives
 */
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

const preStyle = "p-0 rounded-lg overflow-x-auto bg-zinc-950 text-zinc-50 text-sm font-mono";

function highlight(code: string, lang?: string) {
  if (!lang) return hljs.highlightAuto(code).value;
  try {
    return hljs.highlight(code, { language: lang }).value;
  } catch {
    return hljs.highlightAuto(code).value;
  }
}

export function CodeBlock({ children, language, className, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const highlighted = useMemo(() => highlight(children, language), [children, language]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [children]);

  return (
    <div className={cn("relative group/code", className)}>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={handleCopy}
        className="absolute right-2 top-2 opacity-0 group-hover/code:opacity-100 transition-opacity cursor-pointer z-10"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
      </Button>
      <pre className={preStyle}>
        {showLineNumbers ? (
          <code className="hljs grid">
            {children.split("\n").map((line, i) => (
              <span key={i} className="flex">
                <span className="select-none text-zinc-600 w-8 text-right pr-4">{i + 1}</span>
                <span dangerouslySetInnerHTML={{ __html: highlight(line || " ", language) }} />
              </span>
            ))}
          </code>
        ) : (
          <code className="hljs" dangerouslySetInnerHTML={{ __html: highlighted }} />
        )}
      </pre>
    </div>
  );
}
