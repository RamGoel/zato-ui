/**
 * @name User Message
 * @description Chat bubble for user messages with avatar, timestamp, status, and actions.
 * @css Add to your globals.css: @keyframes shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
 */
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, RotateCcw, Pencil, Copy } from "lucide-react";
import { useState } from "react";

interface UserMessageProps {
  children: React.ReactNode;
  className?: string;
  avatar?: string;
  timestamp?: Date | string;
  status?: "sending" | "sent" | "error";
  onRetry?: () => void;
  onEdit?: () => void;
}

export function UserMessage({ 
  children, 
  className,
  avatar,
  timestamp,
  status,
  onRetry,
  onEdit,
}: UserMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = typeof children === "string" ? children : "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isUrl = avatar?.startsWith("http");

  return (
    <div className="flex justify-end gap-2 group">
      <div className="flex flex-col items-end gap-1 max-w-[80%]">
        <div
          className={cn(
            "rounded-xl rounded-br-sm px-3 py-2",
            "bg-primary text-primary-foreground",
            status === "sending" && "opacity-60 relative overflow-hidden after:absolute after:inset-0 after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.6)_50%,transparent_100%)] after:animate-[shimmer_1s_linear_infinite]",
            status === "error" && "bg-destructive/10 text-destructive border border-destructive/20",
            className
          )}
        >
          <div className="text-[13px]">{children}</div>
        </div>
        
        <div className="flex items-center gap-1 px-1">
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <Button variant="ghost" size="icon-xs" onClick={onEdit} aria-label="Edit">
                <Pencil className="h-3 w-3" />
              </Button>
            )}
            <Button variant="ghost" size="icon-xs" onClick={handleCopy} aria-label="Copy">
              {copied ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
          
          {timestamp && status !== "sending" && (
            <span className="text-[10px] text-muted-foreground">
              {formatTime(timestamp)}
            </span>
          )}
          
          {status === "error" && onRetry && (
            <Button 
              variant="ghost" 
              size="xs" 
              onClick={onRetry}
              className="text-destructive hover:text-destructive h-auto py-0.5 px-1.5"
            >
              <RotateCcw className="h-3 w-3" />
              Retry
            </Button>
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
