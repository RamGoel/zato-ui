# aui-kit

AI-first UI components built on [shadcn/ui](https://ui.shadcn.com). Copy and paste into your project.

## Components

- **User Message** - Chat bubble for user input
- **AI Message** - Response bubble from AI
- *Chat Input* - Coming soon
- *Streaming Text* - Coming soon
- *Code Block* - Coming soon
- *Typing Indicator* - Coming soon

## Installation

1. Set up shadcn/ui in your project:

```bash
npx shadcn@latest init
```

2. Copy the components you need from `components/ui/`

## Usage

```tsx
import { UserMessage } from '@/components/ui/user-message'

function Chat() {
  return (
    <div>
      <UserMessage>Hello, how can you help me?</UserMessage>
    </div>
  )
}
```

### With Vercel AI SDK

```tsx
import { useChat } from '@ai-sdk/react'
import { UserMessage } from '@/components/ui/user-message'

function Chat() {
  const { messages } = useChat()
  
  return messages.map(m => 
    m.role === 'user' 
      ? <UserMessage key={m.id}>{m.content}</UserMessage>
      : <AiMessage key={m.id}>{m.content}</AiMessage>
  )
}
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## License

MIT
