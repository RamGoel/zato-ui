// Auto-generated - do not edit
export const componentSources: Record<string, string> = {
  "user-message": `/**
 * @name User Message
 * @description Chat bubble for user messages with avatar, timestamp, status, and actions.
 * @css Add to your globals.css: @keyframes shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
 * @usage
 * import { UserMessage } from "@/components/kit/user-message"
 * 
 * <UserMessage
 *   avatar="JD"
 *   timestamp="2:45 PM"
 *   status="sent"
 *   onEdit={() => console.log("edit")}
 * >
 *   Hello, how can you help me today?
 * </UserMessage>
 */
"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageActions } from "./message-actions";

interface UserMessageProps {
  children: string;
  className?: string;
  avatar?: string;
  timestamp?: string;
  status?: "sending" | "sent" | "error";
  onRetry?: () => void;
  onEdit?: () => void;
}

const bubbleBase = "rounded-xl px-3 py-2 text-[13px]";
const errorStyle = "bg-destructive/10 text-destructive border border-destructive/20";
const sendingStyle = "opacity-60 relative overflow-hidden after:absolute after:inset-0 after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.6)_50%,transparent_100%)] after:animate-[shimmer_1s_linear_infinite]";

export function UserMessage({ 
  children, 
  className,
  avatar,
  timestamp,
  status,
  onRetry,
  onEdit,
}: UserMessageProps) {
  const isUrl = avatar?.startsWith("http");

  return (
    <div className="flex justify-end gap-2 group">
      <div className="flex flex-col items-end gap-1 max-w-[80%]">
        <div
          className={cn(
            bubbleBase,
            "rounded-br-sm bg-primary text-primary-foreground",
            status === "sending" && sendingStyle,
            status === "error" && errorStyle,
            className
          )}
        >
          {children}
        </div>
        
        <div className="flex items-center gap-1 px-1">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MessageActions 
              content={children}
              onEdit={onEdit}
              onRetry={onRetry}
              showRetry={status === "error"}
            />
          </div>
          
          {timestamp && status !== "sending" && (
            <span className="text-[10px] text-muted-foreground">{timestamp}</span>
          )}
        </div>
      </div>
      
      {avatar && (
        <Avatar>
          {isUrl && <AvatarImage src={avatar} alt="User" />}
          <AvatarFallback>{isUrl ? "U" : avatar}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
`,
  "agent-message": `/**
 * @name Agent Message
 * @description Chat bubble for AI/agent messages with avatar, timestamp, markdown support, and actions.
 * @usage
 * import { AgentMessage } from "@/components/kit/agent-message"
 * 
 * <AgentMessage
 *   avatar="AI"
 *   isStreaming={false}
 *   timestamp="2:45 PM"
 *   onRegenerate={() => console.log("regenerate")}
 * >
 *   Here's the answer with **markdown** support.
 * </AgentMessage>
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

const bubbleBase = "rounded-xl px-3 py-2 text-[13px]";
const errorStyle = "bg-destructive/10 text-destructive border border-destructive/20";
const proseStyle = "prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-li:marker:text-muted-foreground prose-h2:mt-3 prose-h2:mb-2 prose-h3:mt-2 prose-h3:mb-1 prose-blockquote:border-l-border prose-blockquote:my-2 prose-blockquote:pl-2 prose-pre:my-0 prose-pre:bg-transparent prose-code:before:content-none prose-code:after:content-none prose-code:bg-background/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-[12px] prose-table:my-2 prose-th:px-2 prose-th:py-1 prose-th:border-b prose-th:border-border prose-td:px-2 prose-td:py-1 prose-thead:border-border prose-tr:border-border";

const markdownComponents = {
  code({ className, children, ...props }: { className?: string; children?: React.ReactNode }) {
    const match = /language-(\\w+)/.exec(className || "");
    if (!match) return <code className={className} {...props}>{children}</code>;
    return (
      <CodeBlock language={match[1]} className="my-2 text-xs">
        {String(children).replace(/\\n$/, "")}
      </CodeBlock>
    );
  },
  pre({ children }: { children?: React.ReactNode }) {
    return <>{children}</>;
  },
};

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
  const content = isStreaming ? children + "▍" : children;

  return (
    <div className="flex justify-start gap-2 group">
      {avatar && (
        <Avatar>
          {isUrl && <AvatarImage src={avatar} alt="Agent" />}
          <AvatarFallback>{isUrl ? "AI" : avatar}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col items-start gap-1 max-w-[80%]">
        <div className={cn(bubbleBase, "rounded-bl-sm bg-muted text-foreground", isError && errorStyle, className)}>
          {isError ? (
            children
          ) : (
            <div className={proseStyle}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {!isStreaming && (
          <div className="flex flex-row-reverse items-center gap-1 px-1">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MessageActions
                content={children}
                onRegenerate={!isError ? onRegenerate : undefined}
                onRetry={isError ? onRegenerate : undefined}
                showRetry={isError}
              />
            </div>
            {timestamp && <span className="text-[10px] text-muted-foreground">{timestamp}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
`,
  "typing-indicator": `/**
 * @name Typing Indicator
 * @description Animated dots indicating the AI is thinking or typing.
 * @usage
 * import { TypingIndicator } from "@/components/kit/typing-indicator"
 * 
 * <TypingIndicator avatar="AI" />
 */
"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TypingIndicatorProps {
  className?: string;
  avatar?: string;
}

const dotBase = "w-2 h-2 bg-muted-foreground/60 rounded-full";
const bounceAnim = "animate-[bounce_1s_ease-in-out_infinite]";

export function TypingIndicator({ className, avatar }: TypingIndicatorProps) {
  const isUrl = avatar?.startsWith("http");

  return (
    <div className="flex justify-start gap-2">
      {avatar && (
        <Avatar>
          {isUrl && <AvatarImage src={avatar} alt="Agent" />}
          <AvatarFallback>{isUrl ? "AI" : avatar}</AvatarFallback>
        </Avatar>
      )}

      <div className={cn("rounded-xl rounded-bl-sm px-4 py-3 bg-muted", className)}>
        <div className="flex items-center gap-1">
          <span className={cn(dotBase, bounceAnim)} />
          <span className={cn(dotBase, bounceAnim, "[animation-delay:0.15s]")} />
          <span className={cn(dotBase, bounceAnim, "[animation-delay:0.3s]")} />
        </div>
      </div>
    </div>
  );
}
`,
  "message-actions": `/**
 * @name Message Actions
 * @description Reusable action buttons for chat messages (copy, edit, retry, regenerate).
 * @category primitives
 * @usage
 * import { MessageActions } from "@/components/kit/message-actions"
 * 
 * <MessageActions
 *   content="Message text to copy"
 *   onEdit={() => console.log("edit")}
 *   onRegenerate={() => console.log("regenerate")}
 * />
 */
"use client";

import { Button } from "@/components/ui/button";
import { Check, RotateCcw, Pencil, Copy, RefreshCw } from "lucide-react";
import { useState, useCallback } from "react";

interface MessageActionsProps {
  content: string;
  onEdit?: () => void;
  onRetry?: () => void;
  onRegenerate?: () => void;
  showRetry?: boolean;
}

const iconBtnClass = "cursor-pointer text-muted-foreground";
const iconClass = "h-3 w-3";

export function MessageActions({ content, onEdit, onRetry, onRegenerate, showRetry = false }: MessageActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [content]);

  return (
    <div className="flex items-center gap-0.5">
      {onEdit && (
        <Button variant="ghost" size="icon-xs" onClick={onEdit} aria-label="Edit" className={iconBtnClass}>
          <Pencil className={iconClass} />
        </Button>
      )}
      
      <Button variant="ghost" size="icon-xs" onClick={handleCopy} aria-label="Copy" className={iconBtnClass}>
        {copied ? <Check className={\`\${iconClass} text-green-500\`} /> : <Copy className={iconClass} />}
      </Button>

      {onRegenerate && (
        <Button variant="ghost" size="icon-xs" onClick={onRegenerate} aria-label="Regenerate" className={iconBtnClass}>
          <RefreshCw className={iconClass} />
        </Button>
      )}

      {showRetry && onRetry && (
        <Button variant="ghost" size="xs" onClick={onRetry} className="text-destructive hover:text-destructive h-auto py-0.5 px-1.5 cursor-pointer">
          <RotateCcw className={iconClass} />
          Retry
        </Button>
      )}
    </div>
  );
}
`,
  "code-block": `/**
 * @name Code Block
 * @description Syntax highlighted code block with copy button.
 * @category primitives
 * @usage
 * import { CodeBlock } from "@/components/kit/code-block"
 * 
 * <CodeBlock language="typescript" showLineNumbers>
 *   {\`function greet(name: string) {
 *   console.log(\\\`Hello, \\\${name}!\\\`);
 * }\`}
 * </CodeBlock>
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
            {children.split("\\n").map((line, i) => (
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
`,
  "chat-input": `/**
 * @name Chat Input
 * @description ChatGPT-style input with auto-expand, attachments, voice, and action menu.
 * @usage
 * import { ChatInput } from "@/components/kit/chat-input"
 * import { Globe, Brush } from "lucide-react"
 * 
 * const [webSearch, setWebSearch] = useState(false)
 * 
 * <ChatInput
 *   menuItems={[
 *     { id: "web", label: "Web Search", icon: <Globe className="h-4 w-4" />, active: webSearch, onClick: () => setWebSearch(!webSearch) },
 *     { id: "canvas", label: "Canvas", icon: <Brush className="h-4 w-4" />, onClick: () => {} },
 *   ]}
 *   onSubmit={(data) => console.log(data.text, data.files, data.audio)}
 * />
 */
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Plus, SendHorizontal, Paperclip, Mic, X, Check } from "lucide-react";
import { useState, useRef, useCallback, KeyboardEvent, ChangeEvent } from "react";

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

interface ChatInputProps {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  menuItems?: MenuItem[];
  onSubmit?: (data: { text: string; files?: File[]; audio?: Blob }) => void;
}

export function ChatInput({
  className,
  placeholder = "Message...",
  disabled = false,
  menuItems = [],
  onSubmit,
}: ChatInputProps) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const cancelledRef = useRef(false);

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed && files.length === 0 && !audioBlob) return;

    onSubmit?.({ 
      text: trimmed, 
      files: files.length > 0 ? files : undefined,
      audio: audioBlob || undefined,
    });
    
    setText("");
    setFiles([]);
    setAudioBlob(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }, [text, files, audioBlob, onSubmit]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      cancelledRef.current = false;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.3;
      source.connect(analyser);
      analyserRef.current = analyser;

      const updateLevels = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const levels = Array.from(dataArray.slice(0, 64)).map(v => v / 255);
        setAudioLevels(levels);
        animationRef.current = requestAnimationFrame(updateLevels);
      };
      updateLevels();

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        audioContext.close();
        if (!cancelledRef.current) {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          setAudioBlob(blob);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setAudioLevels([]);
      analyserRef.current = null;
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      cancelledRef.current = true;
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setAudioLevels([]);
      analyserRef.current = null;
    }
  };

  const removeAudio = () => {
    setAudioBlob(null);
  };

  const canSubmit = text.trim() || files.length > 0 || audioBlob;
  const iconBtnClass = "cursor-pointer text-muted-foreground hover:text-foreground";
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputWithExpand = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    const textarea = e.target;
    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.min(scrollHeight, 200);
    textarea.style.height = \`\${newHeight}px\`;
    
    if (!isExpanded && scrollHeight > 32) {
      setIsExpanded(true);
    } else if (isExpanded && newText.length === 0) {
      setIsExpanded(false);
    }
  }, [isExpanded]);

  const handleSubmitAndReset = useCallback(() => {
    handleSubmit();
    setIsExpanded(false);
  }, [handleSubmit]);

  const handleKeyDownWithReset = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitAndReset();
    }
  };

  const PlusMenu = menuItems.length > 0 ? (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled} className={cn("inline-flex items-center justify-center size-7 rounded-md hover:bg-muted data-popup-open:bg-muted transition-colors", iconBtnClass)}>
        <Plus className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[160px]">
        {menuItems.map((item) => (
          <DropdownMenuItem 
            key={item.id} 
            onClick={item.onClick} 
            className={cn(
              "cursor-pointer whitespace-nowrap",
              item.active && "bg-accent"
            )}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
            {item.active && <Check className="h-3 w-3 ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;

  const activeItems = menuItems.filter(item => item.active);
  const ModeBadges = activeItems.length > 0 ? (
    <div className="flex flex-wrap gap-1.5 mb-2">
      {activeItems.map(item => (
        <div 
          key={item.id} 
          className="flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium"
        >
          {item.icon && <span className="[&>svg]:h-3 [&>svg]:w-3">{item.icon}</span>}
          <span>{item.label}</span>
          <button 
            type="button" 
            onClick={item.onClick} 
            className="hover:text-primary/70 cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  ) : null;

  const ActionButtons = (
    <>
      <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} disabled={disabled} />
      <Button variant="ghost" size="icon-sm" onClick={() => fileInputRef.current?.click()} disabled={disabled} className={iconBtnClass}>
        <Paperclip className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={startRecording}
        disabled={disabled}
        className={cn("cursor-pointer text-muted-foreground hover:text-foreground")}
      >
        <Mic className="h-4 w-4" />
      </Button>
      <Button variant="default" size="icon-sm" onClick={handleSubmitAndReset} disabled={disabled || !canSubmit} className="cursor-pointer">
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </>
  );

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="rounded-2xl border border-border bg-background px-3 py-2 transition-all duration-200 ease-out">
        {/* Mode badges */}
        {ModeBadges}

        {/* Attachments preview */}
        {(files.length > 0 || audioBlob) && (
          <div className="flex flex-wrap gap-2 mb-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md text-xs">
                <span className="max-w-[150px] truncate">{file.name}</span>
                <button type="button" onClick={() => removeFile(index)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {audioBlob && (
              <div className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md text-xs">
                <span>Voice recording</span>
                <button type="button" onClick={removeAudio} className="text-muted-foreground hover:text-foreground cursor-pointer">
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Textarea row or Recording UI */}
        {isRecording ? (
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center justify-between h-6 min-w-0">
              {(audioLevels.length > 0 ? audioLevels : Array(64).fill(0.08)).map((level, i) => (
                <div
                  key={i}
                  className="w-[2px] bg-blue-500 rounded-[1px]"
                  style={{ height: \`\${Math.max(2, level * 22)}px\` }}
                />
              ))}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={cancelRecording}
                className="cursor-pointer text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="icon-sm"
                onClick={stopRecording}
                className="cursor-pointer"
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {!isExpanded && <div className="shrink-0">{PlusMenu}</div>}
              
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleInputWithExpand}
                onKeyDown={handleKeyDownWithReset}
                placeholder={placeholder}
                disabled={disabled}
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 min-h-[24px] max-h-[200px] py-0.5"
              />
              
              {!isExpanded && (
                <div className="flex items-center gap-1 shrink-0">
                  {ActionButtons}
                </div>
              )}
            </div>

            {isExpanded && (
              <div className="flex items-center justify-between">
                <div>{PlusMenu}</div>
                <div className="flex items-center gap-1">{ActionButtons}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
`,
};
