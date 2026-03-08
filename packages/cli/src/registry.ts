export interface ComponentDef {
  name: string;
  description: string;
  files: string[];
  dependencies: string[];
  devDependencies?: string[];
  primitives: string[];
  shadcn?: string[];
}

export const registry: Record<string, ComponentDef> = {
  "user-message": {
    name: "User Message",
    description: "Chat bubble for user messages with avatar, timestamp, and actions",
    files: ["components/kit/user-message.tsx"],
    dependencies: [],
    primitives: ["message-actions"],
    shadcn: ["avatar", "button"],
  },
  "agent-message": {
    name: "Agent Message",
    description: "Chat bubble for AI messages with markdown, streaming, and actions",
    files: ["components/kit/agent-message.tsx"],
    dependencies: ["react-markdown", "remark-gfm", "highlight.js"],
    primitives: ["message-actions", "code-block"],
    shadcn: ["avatar", "button"],
  },
  "typing-indicator": {
    name: "Typing Indicator",
    description: "Animated dots showing the AI is thinking",
    files: ["components/kit/typing-indicator.tsx"],
    dependencies: [],
    primitives: [],
    shadcn: ["avatar"],
  },
  "message-actions": {
    name: "Message Actions",
    description: "Reusable action buttons for messages (copy, edit, retry)",
    files: ["components/kit/message-actions.tsx"],
    dependencies: [],
    primitives: [],
    shadcn: ["button"],
  },
  "code-block": {
    name: "Code Block",
    description: "Syntax highlighted code with copy button",
    files: ["components/kit/code-block.tsx"],
    dependencies: ["highlight.js"],
    primitives: [],
    shadcn: ["button"],
  },
};

export function getComponent(name: string): ComponentDef | undefined {
  return registry[name];
}

export function getAllComponents(): string[] {
  return Object.keys(registry);
}

export function resolveDependencies(componentName: string): {
  components: string[];
  npmDeps: string[];
  shadcnDeps: string[];
} {
  const visited = new Set<string>();
  const npmDeps = new Set<string>();
  const shadcnDeps = new Set<string>();

  function resolve(name: string) {
    if (visited.has(name)) return;
    visited.add(name);

    const component = registry[name];
    if (!component) return;

    component.dependencies.forEach((dep) => npmDeps.add(dep));
    component.shadcn?.forEach((dep) => shadcnDeps.add(dep));
    component.primitives.forEach((prim) => resolve(prim));
  }

  resolve(componentName);

  return {
    components: Array.from(visited),
    npmDeps: Array.from(npmDeps),
    shadcnDeps: Array.from(shadcnDeps),
  };
}
