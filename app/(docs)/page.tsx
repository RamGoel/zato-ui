import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { CodeBlock } from "@/components/kit/code-block";
import { HomePreview } from "./home-preview";

export default function HomePage() {
  const shadcnCode = "npx shadcn@latest init";
  const zatoCode = "npx zatoui add user-message agent-message";

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
            href="https://github.com/RamGoel/zato-ui" 
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
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <div>
          <p className="text-muted-foreground mb-2">
            1. Make sure you have shadcn/ui set up:
          </p>
          <CodeBlock language="bash">{shadcnCode}</CodeBlock>
        </div>
        <div>
          <p className="text-muted-foreground mb-2">
            2. Add components:
          </p>
          <CodeBlock language="bash">{zatoCode}</CodeBlock>
        </div>
      </div>

      {/* Preview */}
      <HomePreview />
    </div>
  );
}
