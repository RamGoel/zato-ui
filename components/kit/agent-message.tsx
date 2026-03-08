/**
 * @name Agent Message
 * @description Chat bubble for AI/agent messages with avatar, timestamp, markdown support, and actions.
 */
"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageActions } from "./message-actions";
import { CodeBlock } from "./code-block";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AgentMessageProps {
  children: string;
  className?: string;
  avatar?: string;
  timestamp?: string;
  isStreaming?: boolean;
  isError?: boolean;
  onRegenerate?: () => void;
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
            <div className="text-[13px] prose prose-sm dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-li:marker:text-muted-foreground prose-h2:mt-3 prose-h2:mb-2 prose-h3:mt-2 prose-h3:mb-1 prose-blockquote:border-l-border prose-blockquote:my-2 prose-blockquote:pl-2 prose-pre:my-0 prose-pre:bg-transparent prose-code:before:content-none prose-code:after:content-none prose-code:bg-background/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-[12px] prose-table:my-2 prose-th:px-2 prose-th:py-1 prose-th:border-b prose-th:border-border prose-td:px-2 prose-td:py-1 prose-thead:border-border prose-tr:border-border max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !match;
                    
                    if (isInline) {
                      return <code className={className} {...props}>{children}</code>;
                    }
                    
                    return (
                      <CodeBlock language={match[1]} className="my-2 text-xs">
                        {String(children).replace(/\n$/, "")}
                      </CodeBlock>
                    );
                  },
                  pre({ children }) {
                    return <>{children}</>;
                  },
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
