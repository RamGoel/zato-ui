/**
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
