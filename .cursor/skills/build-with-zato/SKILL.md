---
name: build-with-zato
description: Build AI chat interfaces using the zato component kit. Use when the user wants to create chat UIs, add zato components to a project, scaffold AI features, or build conversational interfaces. Covers CLI setup via `npx zatoui` and composing components like ChatInput, AgentMessage, UserMessage, TypingIndicator, CodeBlock, and MessageActions.
---

# Build with zato

zato is a copy-paste AI chat UI component library (like shadcn/ui). Components live in `components/kit/` and are installed via the `zatoui` CLI.

## Setup — Adding zato to a project

### Prerequisites

- Next.js project with Tailwind CSS v4
- shadcn/ui initialized (`npx shadcn@latest init`)
- `lib/utils.ts` must exist with the `cn()` helper

### Install components

```bash
# Add specific components
npx zatoui add chat-input agent-message user-message

# List all available components
npx zatoui list

# Check shadcn setup
npx zatoui init
```

The CLI automatically resolves dependencies — primitives, npm packages, shadcn components, and required CSS keyframes.

### Required CSS

If adding `user-message`, ensure `globals.css` includes:

```css
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}
```

The CLI appends this automatically, but verify if installing manually.

---

## Component Reference

### ChatInput

ChatGPT-style input with auto-expand, file attachments, voice recording, and action menu.

```tsx
import { ChatInput } from "@/components/kit/chat-input"

<ChatInput
  placeholder="Ask anything..."
  menuItems={[
    { id: "web", label: "Web Search", icon: <Globe className="h-4 w-4" />, active: webSearch, onClick: () => setWebSearch(!webSearch) },
    { id: "canvas", label: "Canvas", icon: <Brush className="h-4 w-4" />, onClick: () => {} },
  ]}
  onSubmit={(data) => {
    // data.text — message string
    // data.files — File[] attachments
    // data.audio — Blob voice recording
  }}
  disabled={false}
/>
```

**Props**: `placeholder?`, `disabled?`, `className?`, `menuItems?`, `onSubmit`

- `menuItems` supports toggle modes (`active` state) and one-shot actions
- Attachments are file inputs; voice uses MediaRecorder + AudioContext
- Auto-expands textarea up to a max height, then scrolls

### AgentMessage

AI response bubble with markdown rendering, streaming cursor, and actions.

```tsx
import { AgentMessage } from "@/components/kit/agent-message"

<AgentMessage
  avatar="AI"
  isStreaming={isStreaming}
  timestamp={!isStreaming ? "2:45 PM" : undefined}
  onRegenerate={() => regenerate()}
>
  {responseText}
</AgentMessage>
```

**Props**: `children` (string — rendered as markdown), `avatar?`, `timestamp?`, `isStreaming?`, `isError?`, `className?`, `onRegenerate?`

- Pass `isStreaming={true}` while tokens arrive — appends a `▍` cursor
- Uses ReactMarkdown + remark-gfm; fenced code blocks render as `CodeBlock`
- `isError` shows destructive styling with regenerate option
- `avatar` accepts initials (e.g. `"AI"`) or an image URL

### UserMessage

User chat bubble with status states and actions.

```tsx
import { UserMessage } from "@/components/kit/user-message"

<UserMessage
  avatar="JD"
  timestamp="2:45 PM"
  status="sent"
  onEdit={() => handleEdit()}
  onRetry={() => handleRetry()}
>
  How do I center a div?
</UserMessage>
```

**Props**: `children` (string), `avatar?`, `timestamp?`, `status?`, `className?`, `onRetry?`, `onEdit?`

- `status`: `"sending"` (shimmer animation), `"sent"` (default), `"error"` (red + retry)
- `onEdit` shows a pencil icon via MessageActions
- `onRetry` appears only when `status="error"`

### TypingIndicator

Animated bouncing dots showing the AI is thinking.

```tsx
import { TypingIndicator } from "@/components/kit/typing-indicator"

<TypingIndicator avatar="AI" />
```

**Props**: `avatar?`, `className?`

### CodeBlock

Syntax-highlighted code with copy button. Used automatically inside AgentMessage for fenced code blocks, but also usable standalone.

```tsx
import { CodeBlock } from "@/components/kit/code-block"

<CodeBlock language="typescript" showLineNumbers>
  {codeString}
</CodeBlock>
```

**Props**: `children` (string), `language?`, `showLineNumbers?`, `className?`

- Uses highlight.js with `stackoverflow-dark` theme
- Custom bash/shell highlighting for common CLI commands

### MessageActions

Action buttons (copy, edit, regenerate, retry) shared by UserMessage and AgentMessage. Rarely used directly — it's embedded in the message components.

```tsx
import { MessageActions } from "@/components/kit/message-actions"

<MessageActions
  content="Text to copy"
  onEdit={() => {}}
  onRegenerate={() => {}}
/>
```

**Props**: `content`, `onEdit?`, `onRetry?`, `onRegenerate?`, `showRetry?`

---

## Composition Patterns

### Full chat page

```tsx
"use client"

import { useState } from "react"
import { ChatInput } from "@/components/kit/chat-input"
import { AgentMessage } from "@/components/kit/agent-message"
import { UserMessage } from "@/components/kit/user-message"
import { TypingIndicator } from "@/components/kit/typing-indicator"

type Message = { role: "user" | "agent"; content: string; status?: "sending" | "sent" | "error" }

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(data: { text: string }) {
    const userMsg: Message = { role: "user", content: data.text, status: "sent" }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    // Call your AI API, stream tokens into agentMsg.content
    // ...

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <UserMessage key={i} avatar="U" status={msg.status}>{msg.content}</UserMessage>
          ) : (
            <AgentMessage key={i} avatar="AI">{msg.content}</AgentMessage>
          )
        )}
        {isLoading && <TypingIndicator avatar="AI" />}
      </div>
      <div className="p-4 border-t">
        <ChatInput onSubmit={handleSubmit} disabled={isLoading} />
      </div>
    </div>
  )
}
```

### Streaming pattern

```tsx
const [streamText, setStreamText] = useState("")
const [isStreaming, setIsStreaming] = useState(false)

async function streamResponse(prompt: string) {
  setIsStreaming(true)
  setStreamText("")

  const res = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  })

  const reader = res.body!.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    setStreamText(prev => prev + decoder.decode(value))
  }

  setIsStreaming(false)
}

// In JSX:
<AgentMessage avatar="AI" isStreaming={isStreaming}>
  {streamText}
</AgentMessage>
```

### Chat with toggle modes

```tsx
const [webSearch, setWebSearch] = useState(false)

<ChatInput
  menuItems={[
    { id: "web", label: "Web Search", icon: <Globe className="h-4 w-4" />, active: webSearch, onClick: () => setWebSearch(!webSearch) },
  ]}
  onSubmit={(data) => {
    sendMessage(data.text, { webSearch })
  }}
/>
```

---

## Dependency Map

| Component | npm deps | Primitives | shadcn |
|-----------|----------|------------|--------|
| chat-input | — | — | button, dropdown-menu |
| agent-message | react-markdown, remark-gfm, highlight.js | message-actions, code-block | avatar, button |
| user-message | — | message-actions | avatar, button |
| typing-indicator | — | — | avatar |
| code-block | highlight.js | — | button |
| message-actions | — | — | button |

## Key Conventions

- All components are `"use client"` — they use hooks and browser APIs
- Import from `@/components/kit/<name>` for kit components, `@/components/ui/<name>` for primitives
- Styling uses `cn()` from `@/lib/utils` (clsx + tailwind-merge)
- Theme colors use CSS variables: `bg-primary`, `text-muted-foreground`, `bg-muted`, etc.
- Icons from `lucide-react`
- Fonts: DM Sans (body) + JetBrains Mono (code)
