import fs from "fs-extra";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const BASE_URL = "https://raw.githubusercontent.com/RamGoel/zato-ui/main";

export async function fetchComponent(componentName: string): Promise<string> {
  const url = `${BASE_URL}/components/kit/${componentName}.tsx`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${componentName}: ${response.statusText}`);
  }

  return response.text();
}

export async function writeFile(
  filePath: string,
  content: string,
): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.ensureDir(dir);
  await fs.writeFile(filePath, content, "utf-8");
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function detectPackageManager(): "npm" | "pnpm" | "yarn" | "bun" {
  if (fs.existsSync("bun.lockb")) return "bun";
  if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
  if (fs.existsSync("yarn.lock")) return "yarn";
  return "npm";
}

export async function installDependencies(deps: string[]): Promise<void> {
  if (deps.length === 0) return;

  const pm = detectPackageManager();
  const installCmd = pm === "npm" ? "npm install" : `${pm} add`;
  const cmd = `${installCmd} ${deps.join(" ")}`;

  await execAsync(cmd);
}

export async function runShadcnAdd(components: string[]): Promise<void> {
  if (components.length === 0) return;

  const pm = detectPackageManager();
  const npx = pm === "bun" ? "bunx" : pm === "pnpm" ? "pnpm dlx" : "npx";
  const cmd = `${npx} shadcn@latest add ${components.join(" ")} -y --overwrite`;

  await execAsync(cmd, { timeout: 60000 });
}

export function getProjectRoot(): string {
  return process.cwd();
}

export async function hasUtilsFile(): Promise<boolean> {
  const root = getProjectRoot();
  const paths = [
    path.join(root, "lib", "utils.ts"),
    path.join(root, "src", "lib", "utils.ts"),
  ];
  for (const p of paths) {
    if (await fileExists(p)) return true;
  }
  return false;
}

export async function findGlobalsCss(): Promise<string | null> {
  const root = getProjectRoot();
  const paths = [
    path.join(root, "app", "globals.css"),
    path.join(root, "src", "app", "globals.css"),
    path.join(root, "styles", "globals.css"),
    path.join(root, "src", "styles", "globals.css"),
  ];
  for (const p of paths) {
    if (await fileExists(p)) return p;
  }
  return null;
}

export async function appendCssToGlobals(cssSnippets: string[]): Promise<boolean> {
  const globalsPath = await findGlobalsCss();
  if (!globalsPath) return false;

  const content = await fs.readFile(globalsPath, "utf-8");
  const snippetsToAdd: string[] = [];

  for (const snippet of cssSnippets) {
    const keyframeName = snippet.match(/@keyframes\s+(\w+)/)?.[1];
    if (keyframeName && content.includes(`@keyframes ${keyframeName}`)) {
      continue;
    }
    if (!content.includes(snippet.trim())) {
      snippetsToAdd.push(snippet);
    }
  }

  if (snippetsToAdd.length === 0) return true;

  const newContent = content.trimEnd() + "\n\n/* Added by zatoui */\n" + snippetsToAdd.join("\n\n") + "\n";
  await fs.writeFile(globalsPath, newContent, "utf-8");
  return true;
}
