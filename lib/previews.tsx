"use client";

import { useState, useEffect } from "react";
import { AgentMessage } from "@/components/kit/agent-message";
import { MessageActions } from "@/components/kit/message-actions";
import { UserMessage } from "@/components/kit/user-message";

function StreamingDemo() {
  const fullText = "I can help you with that! Here's how you can center a div using flexbox: use display: flex, justify-content: center, and align-items: center on the parent container.";
  const words = fullText.split(" ");
  const [wordCount, setWordCount] = useState(0);
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    if (isStreaming && wordCount < words.length) {
      const timeout = setTimeout(() => {
        setWordCount(wordCount + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else if (wordCount >= words.length) {
      setIsStreaming(false);
    }
  }, [wordCount, words.length, isStreaming]);

  const handleRegenerate = () => {
    setWordCount(0);
    setIsStreaming(true);
  };

  const text = words.slice(0, wordCount).join(" ");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-muted-foreground mb-2">Code block & inline code</p>
        <AgentMessage avatar="AI" timestamp="2:45 PM" onRegenerate={() => {}}>
          {"Here's how to center a div:\n\n```css\ndisplay: flex;\njustify-content: center;\nalign-items: center;\n```\n\nYou can also use **grid**: `place-items: center`"}
        </AgentMessage>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2">Lists</p>
        <AgentMessage avatar="AI" timestamp="2:46 PM" onRegenerate={() => {}}>
          {"Here are the steps:\n\n1. Install the package\n2. Import the component\n3. Use it in your app\n\nBenefits:\n- Easy to use\n- Fully customizable\n- Works with dark mode"}
        </AgentMessage>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2">Links & emphasis</p>
        <AgentMessage avatar="AI" timestamp="2:47 PM" onRegenerate={() => {}}>
          {"Check out the [documentation](https://example.com) for more details.\n\nThis is **bold**, this is *italic*, and this is ***both***."}
        </AgentMessage>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2">Table</p>
        <AgentMessage avatar="AI" timestamp="2:48 PM" onRegenerate={() => {}}>
          {`Here's a comparison:

| Method | Browser Support | Complexity |
|--------|-----------------|------------|
| Flexbox | 98% | Low |
| Grid | 95% | Medium |
| Position | 100% | High |`}
        </AgentMessage>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2">Streaming</p>
        <AgentMessage
          avatar="AI"
          isStreaming={isStreaming}
          timestamp={!isStreaming ? "2:48 PM" : undefined}
          onRegenerate={!isStreaming ? handleRegenerate : undefined}
        >
          {text || " "}
        </AgentMessage>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2">Error state</p>
        <AgentMessage avatar="AI" isError onRegenerate={() => alert("Retrying...")}>
          Failed to generate response. Please try again.
        </AgentMessage>
      </div>
    </div>
  );
}

export const previews: Record<string, React.ReactNode> = {
  "agent-message": <StreamingDemo />,
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
