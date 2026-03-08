/**
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
        {copied ? <Check className={`${iconClass} text-green-500`} /> : <Copy className={iconClass} />}
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
