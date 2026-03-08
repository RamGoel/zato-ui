import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../..");
const KIT_DIR = path.join(ROOT, "components/kit");
const OUTPUT = path.join(__dirname, "../src/components.ts");

const components = [
  "user-message",
  "agent-message", 
  "typing-indicator",
  "message-actions",
  "code-block",
  "chat-input",
];

function escapeTemplate(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

const sources: Record<string, string> = {};

for (const name of components) {
  const filePath = path.join(KIT_DIR, `${name}.tsx`);
  if (fs.existsSync(filePath)) {
    sources[name] = fs.readFileSync(filePath, "utf-8");
  }
}

const output = `// Auto-generated - do not edit
export const componentSources: Record<string, string> = {
${Object.entries(sources)
  .map(([name, code]) => `  "${name}": \`${escapeTemplate(code)}\`,`)
  .join("\n")}
};
`;

fs.writeFileSync(OUTPUT, output);
console.log(`Generated ${OUTPUT}`);
