import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { CodeBlock } from "@/components/kit/code-block";
import { HomePreview } from "./home-preview";

export default function HomePage() {
  const installCode = "npx shadcn@latest init";

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

      {/* Installation */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <p className="text-muted-foreground mb-4">
          Make sure you have shadcn/ui set up in your project:
        </p>
        <CodeBlock language="bash">{installCode}</CodeBlock>
      </div>

      {/* Preview */}
      <HomePreview />
    </div>
  );
}
