"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  html: string;
  code: string;
}

export function CodeBlock({ html, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-2 rounded-md bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-zinc-400" />
        )}
      </button>
      <div 
        className="rounded-lg overflow-hidden text-sm [&_pre]:p-4 [&_pre]:m-0 [&_pre]:overflow-x-auto [&_code]:bg-transparent border border-border"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    </div>
  );
}
