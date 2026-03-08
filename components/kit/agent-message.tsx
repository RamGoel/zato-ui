/**
 * @name Agent Message
 * @description Chat bubble for AI/agent messages with avatar, timestamp, markdown support, and actions.
 */
"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageActions } from "./message-actions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface AgentMessageProps {
  children: string;
  className?: string;
  avatar?: string;
  timestamp?: string;
  isStreaming?: boolean;
  isError?: boolean;
  onRegenerate?: () => void;
}

function CodeBlock({ children, className, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = (children as React.ReactElement)?.props?.children || "";
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group/code">
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={handleCopy}
        className="absolute right-1 top-1 opacity-0 group-hover/code:opacity-100 transition-opacity cursor-pointer"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-3 w-3 text-green-500" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </Button>
      <pre className={cn("!p-2 !rounded-md overflow-x-auto !bg-background/80", className)} {...props}>
        {children}
      </pre>
    </div>
  );
}

export function AgentMessage({
  children,
  className,
  avatar,
  timestamp,
  isStreaming,
  isError,
  onRegenerate,
}: AgentMessageProps) {
  const isUrl = avatar?.startsWith("http");

  return (
    <div className="flex justify-start gap-2 group">
      {avatar && (
        <Avatar>
          {isUrl && <AvatarImage src={avatar} alt="Agent" />}
          <AvatarFallback>{isUrl ? "AI" : avatar}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col items-start gap-1 max-w-[80%]">
        <div
          className={cn(
            "rounded-xl rounded-bl-sm px-3 py-2",
            "bg-muted text-foreground",
            isError && "bg-destructive/10 text-destructive border border-destructive/20",
            className
          )}
        >
          {isError ? (
            <p className="text-[13px]">{children}</p>
          ) : (
            <div className="text-[13px] prose prose-sm dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-li:marker:text-muted-foreground prose-pre:my-2 prose-code:before:content-none prose-code:after:content-none prose-code:bg-background/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-[12px] prose-table:my-2 prose-th:px-2 prose-th:py-1 prose-th:border-b prose-th:border-border prose-td:px-2 prose-td:py-1 prose-thead:border-border prose-tr:border-border max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeHighlight]}
                components={{
                  pre: CodeBlock,
                }}
              >
                {isStreaming ? children + "▍" : children}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div className="flex flex-row-reverse items-center gap-1 px-1">
          {!isStreaming && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MessageActions
                content={children}
                onRegenerate={!isError ? onRegenerate : undefined}
                onRetry={isError ? onRegenerate : undefined}
                showRetry={isError}
              />
            </div>
          )}

          {timestamp && !isStreaming && (
            <span className="text-[10px] text-muted-foreground">
              {timestamp}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
