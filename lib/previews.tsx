"use client";

import { useState, useEffect } from "react";
import { AgentMessage } from "@/components/kit/agent-message";
import { CodeBlock } from "@/components/kit/code-block";
import { MessageActions } from "@/components/kit/message-actions";
import { UserMessage } from "@/components/kit/user-message";
import { TypingIndicator } from "@/components/kit/typing-indicator";
import { ChatInput } from "@/components/kit/chat-input";
import { ImageIcon, FileText, Globe, Brush } from "lucide-react";

function ChatInputPreview() {
  const [webSearch, setWebSearch] = useState(false);
  const [canvas, setCanvas] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-muted-foreground mb-2">Default</p>
        <ChatInput 
          onSubmit={(data) => alert(`Text: ${data.text}\nFiles: ${data.files?.length || 0}\nAudio: ${data.audio ? 'yes' : 'no'}`)} 
        />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">With toggle modes (Web Search, Canvas)</p>
        <ChatInput 
          menuItems={[
            { id: "web-search", label: "Web Search", icon: <Globe className="h-4 w-4" />, active: webSearch, onClick: () => setWebSearch(!webSearch) },
            { id: "canvas", label: "Canvas", icon: <Brush className="h-4 w-4" />, active: canvas, onClick: () => setCanvas(!canvas) },
            { id: "upload-image", label: "Upload image", icon: <ImageIcon className="h-4 w-4" />, onClick: () => alert("Upload image") },
            { id: "upload-file", label: "Upload file", icon: <FileText className="h-4 w-4" />, onClick: () => alert("Upload file") },
          ]}
          onSubmit={(data) => alert(`Text: ${data.text}`)} 
        />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Disabled</p>
        <ChatInput disabled placeholder="Chat disabled..." />
      </div>
    </div>
  );
}

const fullMarkdownMessage = `Here's how to **center a div** using different methods:

## Using Flexbox

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

You can also use the shorthand \`place-items: center\` with *CSS Grid*.

### Steps to implement:

1. Add a container element
2. Apply the CSS above
3. Your content is now centered!

**Benefits:**
- Easy to use
- Works with *any* content
- Great [browser support](https://caniuse.com/flexbox)

| Method | Support | Complexity |
|--------|---------|------------|
| Flexbox | 98% | Low |
| Grid | 95% | Medium |
| Position | 100% | High |

> **Pro tip:** Use \`margin: auto\` for simple cases!`;

function AgentMessagePreview() {
  const words = fullMarkdownMessage.split(" ");
  const [wordCount, setWordCount] = useState(0);
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    if (isStreaming && wordCount < words.length) {
      const timeout = setTimeout(() => {
        setWordCount(wordCount + 1);
      }, 50);
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
        <p className="text-xs text-muted-foreground mb-2">Streaming with markdown</p>
        <AgentMessage
          avatar="AI"
          isStreaming={isStreaming}
          timestamp={!isStreaming ? "2:45 PM" : undefined}
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

const jsCode = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");`;

const cssCode = `display: flex;
justify-content: center;
align-items: center;`;

export const previews: Record<string, React.ReactNode> = {
  "agent-message": <AgentMessagePreview />,
  "code-block": (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-muted-foreground mb-2">JavaScript</p>
        <CodeBlock language="javascript">{jsCode}</CodeBlock>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">CSS</p>
        <CodeBlock language="css">{cssCode}</CodeBlock>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">With line numbers</p>
        <CodeBlock language="javascript" showLineNumbers>{jsCode}</CodeBlock>
      </div>
    </div>
  ),
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
  "typing-indicator": (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-muted-foreground mb-2">With avatar</p>
        <TypingIndicator avatar="AI" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Without avatar</p>
        <TypingIndicator />
      </div>
    </div>
  ),
  "chat-input": <ChatInputPreview />,
};
