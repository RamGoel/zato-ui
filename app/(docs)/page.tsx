import { CodeBlock } from "@/components/kit/code-block";
import { HomePreview } from "@/components/docs/home-preview";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          AI-first components for modern apps
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Beautiful, accessible chat UI components built on shadcn/ui. 
          Copy and paste into your project.
        </p>
      </div>

      {/* Installation + Preview side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Requirements</h2>
            <div>
              <p className="text-muted-foreground mb-2">
                Make sure you have shadcn/ui set up:
              </p>
              <CodeBlock language="bash">npx shadcn@latest init</CodeBlock>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">CLI Commands</h3>
            <div className="space-y-6 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Add components:</p>
                <CodeBlock language="bash">npx zatoui add chat-input agent-message</CodeBlock>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">List all available components:</p>
                <CodeBlock language="bash">npx zatoui list</CodeBlock>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Check shadcn/ui setup:</p>
                <CodeBlock language="bash">npx zatoui init</CodeBlock>
              </div>
            </div>
          </div>
        </div>

        <HomePreview />
      </div>
    </div>
  );
}
