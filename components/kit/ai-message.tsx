/**
 * @name AI Message
 * @description Response bubble from AI, aligned to the left.
 */
import { cn } from "@/lib/utils";

interface AiMessageProps {
  children: React.ReactNode;
  className?: string;
}

export function AiMessage({ children, className }: AiMessageProps) {
  return (
    <div className="flex justify-start">
      <div
        className={cn(
          "max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-2.5",
          "bg-muted text-foreground",
          className
        )}
      >
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
