import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { getAllComponents } from "@/lib/registry";
import { highlight } from "@/lib/highlight";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { UserMessage } from "@/components/kit/user-message";

export default async function HomePage() {
  const components = getAllComponents();
  const installCode = "npx shadcn@latest init";
  const installHtml = await highlight(installCode, "bash");

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          AI-first components for modern apps
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Beautiful, accessible chat UI components built on shadcn/ui. 
          Copy and paste into your project.
        </p>
        <div className="flex gap-3">
          <Link 
            href="/components/user-message"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-muted-foreground ml-2">aui-kit demo</span>
        </div>
        <div className="p-6 space-y-4 bg-gradient-to-b from-muted/20 to-transparent">
          <UserMessage>Can you help me build a chat interface?</UserMessage>
          <UserMessage>That sounds great!</UserMessage>
          <UserMessage>Thanks for the help!</UserMessage>
        </div>
      </div>

      {/* Components */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Components</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {components.map((component) => (
            <Link key={component.slug} href={`/components/${component.slug}`}>
              <Card className="hover:border-foreground/20 transition-colors h-full">
                <CardHeader>
                  <CardTitle className="text-base">{component.name}</CardTitle>
                  <CardDescription>{component.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Installation */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <p className="text-muted-foreground mb-4">
          Make sure you have shadcn/ui set up in your project:
        </p>
        <CodeBlock html={installHtml} code={installCode} />
      </div>
    </div>
  );
}
