import fs from "fs";
import path from "path";

const KIT_DIR = path.join(process.cwd(), "components/kit");

export interface ComponentMeta {
  slug: string;
  name: string;
  description: string;
  category: "components" | "primitives";
  file: string;
  code: string;
  props: { name: string; type: string }[];
  usage: string;
}

function parseMetadata(code: string): { name: string; description: string; category: "components" | "primitives"; usage: string } {
  const nameMatch = code.match(/@name\s+(.+)/);
  const descMatch = code.match(/@description\s+(.+)/);
  const categoryMatch = code.match(/@category\s+(.+)/);
  const usageMatch = code.match(/@usage\s*\n([\s\S]*?)(?=\n\s*\*\/|\n\s*\* @)/);
  return {
    name: nameMatch?.[1] || "Untitled",
    description: descMatch?.[1] || "",
    category: (categoryMatch?.[1]?.trim() as "primitives") || "components",
    usage: usageMatch?.[1]?.replace(/^\s*\* ?/gm, "").trim() || "",
  };
}

function stripComments(code: string): string {
  return code
    .replace(/\/\*\*[\s\S]*?\*\/\n?/g, "") // block comments
    .replace(/^\s*\/\/.*\n?/gm, "") // single line comments on their own line
    .trim();
}

function parseProps(code: string): { name: string; type: string }[] {
  const interfaceStart = code.match(/interface \w+Props \{/);
  if (!interfaceStart) return [];

  const startIndex = interfaceStart.index! + interfaceStart[0].length;
  let braceCount = 1;
  let endIndex = startIndex;
  
  for (let i = startIndex; i < code.length && braceCount > 0; i++) {
    if (code[i] === "{") braceCount++;
    else if (code[i] === "}") braceCount--;
    endIndex = i;
  }

  const interfaceBody = code.slice(startIndex, endIndex);
  const props: { name: string; type: string }[] = [];
  
  let depth = 0;
  let currentProp = "";
  
  for (const char of interfaceBody) {
    if (char === "{" || char === "(") depth++;
    else if (char === "}" || char === ")") depth--;
    
    if (char === ";" && depth === 0) {
      const propMatch = currentProp.match(/^\s*(\w+)(\?)?:\s*(.+)/s);
      if (propMatch) {
        props.push({
          name: propMatch[1] + (propMatch[2] || ""),
          type: propMatch[3].trim(),
        });
      }
      currentProp = "";
    } else {
      currentProp += char;
    }
  }
  
  if (currentProp.trim()) {
    const propMatch = currentProp.match(/^\s*(\w+)(\?)?:\s*(.+)/s);
    if (propMatch) {
      props.push({
        name: propMatch[1] + (propMatch[2] || ""),
        type: propMatch[3].trim(),
      });
    }
  }
  
  return props;
}

export function getComponent(slug: string): ComponentMeta | null {
  const file = `${slug}.tsx`;
  const filePath = path.join(KIT_DIR, file);
  
  if (!fs.existsSync(filePath)) return null;
  
  const code = fs.readFileSync(filePath, "utf-8");
  const { name, description, category, usage } = parseMetadata(code);
  const props = parseProps(code);

  const cleanCode = stripComments(code);

  return { slug, name, description, category, file, code: cleanCode, props, usage };
}

export function getAllComponents(): ComponentMeta[] {
  const files = fs.readdirSync(KIT_DIR).filter((f) => f.endsWith(".tsx"));
  
  return files
    .map((file) => getComponent(file.replace(".tsx", "")))
    .filter((c): c is ComponentMeta => c !== null);
}
