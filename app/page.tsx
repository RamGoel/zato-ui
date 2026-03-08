"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserMessage } from "@/components/ui/user-message";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

function AiMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-2.5 bg-muted text-foreground">
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}

const navigation = {
  "Getting Started": [
    { id: "introduction", name: "Introduction" },
    { id: "installation", name: "Installation" },
    { id: "integration", name: "Integration" },
  ],
  "Components": [
    { id: "user-message", name: "User Message", status: "ready" },
    { id: "ai-message", name: "AI Message", status: "ready" },
    { id: "chat-input", name: "Chat Input", status: "soon" },
    { id: "streaming-text", name: "Streaming Text", status: "soon" },
    { id: "code-block", name: "Code Block", status: "soon" },
    { id: "typing-indicator", name: "Typing Indicator", status: "soon" },
  ],
};

function Sidebar() {
  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-20 space-y-6">
        {Object.entries(navigation).map(([section, items]) => (
          <div key={section}>
            <div className="text-sm font-medium mb-2">{section}</div>
            <nav className="space-y-0.5">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center justify-between px-3 py-1.5 text-sm rounded-md hover:bg-muted transition-colors"
                >
                  <span className={item.status === "soon" ? "text-muted-foreground" : "text-muted-foreground hover:text-foreground"}>
                    {item.name}
                  </span>
                  {item.status === "soon" && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">soon</Badge>
                  )}
                </a>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">aui-kit</span>
            <Badge variant="secondary" className="text-xs">beta</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex gap-10">
          <Sidebar />
          
          <main className="flex-1 min-w-0 py-10">
            {/* Hero */}
            <section className="pb-16">
              <div className="max-w-2xl space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  AI-first components for modern apps
                </h1>
                <p className="text-lg text-muted-foreground">
                  Beautiful, accessible chat UI components built on shadcn/ui. 
                  Copy and paste into your project.
                </p>
                <div className="flex gap-3">
                  <Button>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </div>
            </section>

            {/* Preview */}
            <section className="pb-16">
              <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">aui-kit demo</span>
                </div>
                <div className="p-6 space-y-4 min-h-[320px] bg-gradient-to-b from-muted/20 to-transparent">
                  <UserMessage>Can you help me build a chat interface?</UserMessage>
                  <AiMessage>
                    Of course! I can help you create a beautiful chat UI. Let's start with the message components.
                  </AiMessage>
                  <UserMessage>That sounds great!</UserMessage>
                  <AiMessage>
                    Perfect! The components are designed to be accessible and customizable. Just copy and paste.
                  </AiMessage>
                </div>
              </div>
            </section>

            {/* Components */}
            <section className="pb-16">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold">Components</h2>
                <p className="text-muted-foreground">Copy-paste components for AI interfaces</p>
              </div>
              
              <div className="space-y-8">
                <Card id="user-message">
                  <CardHeader>
                    <CardTitle className="text-base">User Message</CardTitle>
                    <CardDescription>Chat bubble for user input, aligned to the right</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <UserMessage>Hello, how can you help me?</UserMessage>
                    <UserMessage>This is another message from the user.</UserMessage>
                  </CardContent>
                </Card>

                <Card id="ai-message">
                  <CardHeader>
                    <CardTitle className="text-base">AI Message</CardTitle>
                    <CardDescription>Response bubble from AI, aligned to the left</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <AiMessage>Hi there! I'm here to help you with anything you need.</AiMessage>
                    <AiMessage>Feel free to ask me any questions.</AiMessage>
                  </CardContent>
                </Card>

                <Card id="chat-input" className="border-dashed opacity-60">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">Chat Input</CardTitle>
                      <Badge variant="outline" className="text-xs">coming soon</Badge>
                    </div>
                    <CardDescription>Input field with send button and attachments</CardDescription>
                  </CardHeader>
                </Card>

                <Card id="streaming-text" className="border-dashed opacity-60">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">Streaming Text</CardTitle>
                      <Badge variant="outline" className="text-xs">coming soon</Badge>
                    </div>
                    <CardDescription>Animated text that streams in word by word</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </section>

            {/* Getting Started */}
            <section id="introduction" className="pb-12 scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-muted-foreground">
                  aui-kit is a collection of beautifully designed, accessible components for building AI chat interfaces. 
                  Built on top of shadcn/ui, these components are designed to be copied and pasted into your project, 
                  giving you full control over the code.
                </p>
              </div>
            </section>

            <section id="installation" className="pb-12 scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">Installation</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Make sure you have shadcn/ui set up in your project, then copy the components you need.
                </p>
                <div className="rounded-lg bg-muted p-4 font-mono text-sm">
                  npx shadcn@latest init
                </div>
              </div>
            </section>

            <section id="integration" className="pb-12 scroll-mt-20">
              <h2 className="text-2xl font-semibold mb-4">Integration</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  aui-kit components work seamlessly with the Vercel AI SDK. Use them with <code className="bg-muted px-1.5 py-0.5 rounded text-sm">useChat</code> hook 
                  for streaming responses and real-time updates.
                </p>
                <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`import { useChat } from '@ai-sdk/react'
import { UserMessage, AiMessage } from '@/components/ui'

function Chat() {
  const { messages } = useChat()
  
  return messages.map(m => 
    m.role === 'user' 
      ? <UserMessage key={m.id}>{m.content}</UserMessage>
      : <AiMessage key={m.id}>{m.content}</AiMessage>
  )
}`}</pre>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
