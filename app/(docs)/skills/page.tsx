import { CodeBlock } from "@/components/kit/code-block";

export default function SkillsPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Agent Skills</h1>
        <p className="text-muted-foreground max-w-2xl">
          Skills that teach your editor how to build with zato. Install a skill and let the agent
          scaffold chat UIs for you.
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What are Skills?</h2>
          <p className="text-muted-foreground">
            Agent skills are markdown files that live in your project and teach your AI agent how to
            use specific tools and libraries. The{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
              build-with-zato
            </code>{" "}
            skill gives the agent full knowledge of every zato component &mdash; props, patterns,
            and composition recipes &mdash; so it can build chat interfaces fast.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Install</h2>
          <p className="text-muted-foreground">
            Add the agent skill to your project using the CLI:
          </p>
          <CodeBlock language="bash">npx zatoui add-skill</CodeBlock>
          <p className="text-sm text-muted-foreground">
            This downloads the skill to{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
              .cursor/skills/build-with-zato/SKILL.md
            </code>
            . If you cloned the repo, it&apos;s already there.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What the Agent Learns</h2>
          <p className="text-muted-foreground mb-4">
            Once installed, the agent automatically knows how to:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Set up zato", desc: "Run the CLI, resolve deps, configure CSS" },
              {
                title: "Use every component",
                desc: "ChatInput, AgentMessage, UserMessage, TypingIndicator, CodeBlock, MessageActions",
              },
              {
                title: "Compose full pages",
                desc: "Scaffold chat pages with message lists, input, and streaming",
              },
              {
                title: "Handle streaming",
                desc: "Wire up ReadableStream responses with the isStreaming prop",
              },
              {
                title: "Add toggle modes",
                desc: "Web search, canvas, and custom menu items on ChatInput",
              },
              {
                title: "Follow conventions",
                desc: "Correct imports, cn() usage, theme tokens, and file structure",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border p-4 space-y-1">
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
