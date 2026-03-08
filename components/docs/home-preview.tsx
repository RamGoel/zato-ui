"use client";

import { useState } from "react";
import { UserMessage } from "@/components/kit/user-message";
import { AgentMessage } from "@/components/kit/agent-message";
import { TypingIndicator } from "@/components/kit/typing-indicator";
import { ChatInput } from "@/components/kit/chat-input";
import { Globe, Brush } from "lucide-react";

export function HomePreview() {
  const [webSearch, setWebSearch] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const handleSubmit = () => {
    setShowTyping(true);
    setTimeout(() => setShowTyping(false), 2000);
  };

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">zato demo</span>
      </div>
      <div className="p-3 space-y-4 bg-linear-to-b from-muted/20 to-transparent">
        <UserMessage timestamp="2:45 PM" status="sent">
          How do I center a div in CSS?
        </UserMessage>
        
        <AgentMessage timestamp="2:45 PM">
          {`Here are the main ways to **center a div**:

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

You can also use \`place-items: center\` with CSS Grid!`}
        </AgentMessage>


        {showTyping && <TypingIndicator />}

        <div className="pt-2">
          <ChatInput
            placeholder="Try the input..."
            menuItems={[
              { id: "web", label: "Web Search", icon: <Globe className="h-4 w-4" />, active: webSearch, onClick: () => setWebSearch(!webSearch) },
              { id: "canvas", label: "Canvas", icon: <Brush className="h-4 w-4" />, onClick: () => {} },
            ]}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
