# zato

AI-first UI components built on [shadcn/ui](https://ui.shadcn.com). Copy and paste into your project.

## Quick Start

```bash
npx zatoui add chat-input
```

## Components

- **Chat Input** - ChatGPT-style input with attachments, voice, and action menu
- **User Message** - Chat bubble for user messages with avatar, timestamp, and actions
- **Agent Message** - AI response bubble with markdown, streaming, and actions
- **Typing Indicator** - Animated dots showing the AI is thinking
- **Code Block** - Syntax highlighted code with copy button
- **Message Actions** - Reusable action buttons (copy, edit, retry, regenerate)

## Installation

1. Set up shadcn/ui in your project:

```bash
npx shadcn@latest init
```

2. Add components using the CLI:

```bash
npx zatoui add agent-message
```

Or add all components:

```bash
npx zatoui add user-message agent-message chat-input typing-indicator
```

## Usage

```tsx
import { ChatInput } from '@/components/kit/chat-input'
import { AgentMessage } from '@/components/kit/agent-message'
import { UserMessage } from '@/components/kit/user-message'

function Chat() {
  return (
    <div>
      <UserMessage avatar="JD" timestamp="2:45 PM">
        How do I center a div?
      </UserMessage>
      <AgentMessage avatar="AI">
        Use **flexbox**: `display: flex; justify-content: center;`
      </AgentMessage>
      <ChatInput onSubmit={(data) => console.log(data)} />
    </div>
  )
}
```

## CLI Commands

```bash
npx zatoui list          # List available components
npx zatoui add <name>    # Add a component
npx zatoui init          # Check shadcn/ui setup
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## License

MIT
