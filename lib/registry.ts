import fs from "fs";
import path from "path";

const KIT_DIR = path.join(process.cwd(), "components/kit");

export interface ComponentMeta {
  slug: string;
  name: string;
  description: string;
  file: string;
  code: string;
  props: { name: string; type: string }[];
}

function parseMetadata(code: string): { name: string; description: string } {
  const nameMatch = code.match(/@name\s+(.+)/);
  const descMatch = code.match(/@description\s+(.+)/);
  return {
    name: nameMatch?.[1] || "Untitled",
    description: descMatch?.[1] || "",
  };
}

function parseProps(code: string): { name: string; type: string }[] {
  const interfaceMatch = code.match(/interface \w+Props \{([^}]+)\}/);
  if (!interfaceMatch) return [];

  const props: { name: string; type: string }[] = [];
  const propMatches = interfaceMatch[1].matchAll(/(\w+)(\?)?:\s*([^;\n]+)/g);
  
  for (const match of propMatches) {
    props.push({
      name: match[1] + (match[2] || ""),
      type: match[3].trim(),
    });
  }
  return props;
}

export function getComponent(slug: string): ComponentMeta | null {
  const file = `${slug}.tsx`;
  const filePath = path.join(KIT_DIR, file);
  
  if (!fs.existsSync(filePath)) return null;
  
  const code = fs.readFileSync(filePath, "utf-8");
  const { name, description } = parseMetadata(code);
  const props = parseProps(code);

  return { slug, name, description, file, code, props };
}

export function getAllComponents(): ComponentMeta[] {
  const files = fs.readdirSync(KIT_DIR).filter((f) => f.endsWith(".tsx"));
  
  return files
    .map((file) => getComponent(file.replace(".tsx", "")))
    .filter((c): c is ComponentMeta => c !== null);
}
