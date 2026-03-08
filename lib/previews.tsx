"use client";

import { UserMessage } from "@/components/kit/user-message";

export const previews: Record<string, React.ReactNode> = {
  "user-message": (
    <div className="space-y-4">
      <UserMessage 
        avatar="JD" 
        timestamp={new Date()} 
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
