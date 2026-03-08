"use client";

import { MessageActions } from "@/components/kit/message-actions";
import { UserMessage } from "@/components/kit/user-message";

export const previews: Record<string, React.ReactNode> = {
  "message-actions": (
    <div className="space-y-6">
      <div className="flex justify-end group">
        <div className="flex flex-col items-end gap-1">
          <div className="bg-primary text-primary-foreground rounded-xl rounded-br-sm px-3 py-2 text-[13px]">
            How do I center a div?
          </div>
          <div className="opacity-100">
            <MessageActions 
              content="How do I center a div?" 
              onEdit={() => alert("Edit clicked")} 
            />
          </div>
        </div>
      </div>

      <div className="flex justify-start group">
        <div className="flex flex-col items-start gap-1">
          <div className="bg-muted rounded-xl rounded-bl-sm px-3 py-2 text-[13px]">
            You can use flexbox: display: flex; justify-content: center; align-items: center;
          </div>
          <div className="opacity-100">
            <MessageActions 
              content="You can use flexbox..." 
              onRegenerate={() => alert("Regenerate clicked")} 
            />
          </div>
        </div>
      </div>
    </div>
  ),
  "user-message": (
    <div className="space-y-4">
      <UserMessage 
        avatar="JD" 
        timestamp="2:45 PM" 
        status="sent"
        onEdit={() => alert("Edit clicked")}
      >
        Hello, how can you help me today?
      </UserMessage>
      
      <UserMessage 
        avatar="JD" 
        status="sending"
      >
        This message is being sent...
      </UserMessage>
      
      <UserMessage 
        avatar="JD" 
        status="error"
        onRetry={() => alert("Retrying...")}
      >
        This message failed to send.
      </UserMessage>
    </div>
  ),
};
