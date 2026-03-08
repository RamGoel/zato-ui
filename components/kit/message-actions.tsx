/**
 * @name Message Actions
 * @description Reusable action buttons for chat messages (copy, edit, retry, regenerate).
 */
"use client";

import { Button } from "@/components/ui/button";
import { Check, RotateCcw, Pencil, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";

interface MessageActionsProps {
  content: string;
  onEdit?: () => void;
  onRetry?: () => void;
  onRegenerate?: () => void;
  showRetry?: boolean;
}

export function MessageActions({
  content,
  onEdit,
  onRetry,
  onRegenerate,
  showRetry = false,
}: MessageActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-0.5">
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

      {onRegenerate && (
        <Button variant="ghost" size="icon-xs" onClick={onRegenerate} aria-label="Regenerate">
          <RefreshCw className="h-3 w-3" />
        </Button>
      )}

      {showRetry && onRetry && (
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
  );
}
