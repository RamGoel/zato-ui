/**
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
