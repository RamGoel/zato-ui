import { notFound } from "next/navigation";
import { getComponent, getAllComponents } from "@/lib/registry";
import { CodeBlock } from "@/components/kit/code-block";
import { PreviewWrapper } from "./preview-wrapper";

export function generateStaticParams() {
  return getAllComponents().map((c) => ({ component: c.slug }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component: slug } = await params;
  const component = getComponent(slug);

  if (!component) {
    notFound();
  }

  const usageCode = `import { ${component.name.replace(/\s/g, "")} } from "@/components/ui/${slug}"

<${component.name.replace(/\s/g, "")}>Your content</${component.name.replace(/\s/g, "")}>`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{component.name}</h1>
        <p className="text-muted-foreground mt-2">{component.description}</p>
      </div>

      <PreviewWrapper slug={slug} />

      <div>
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <p className="text-muted-foreground mb-4">
          Copy to <code className="bg-muted px-1.5 py-0.5 rounded text-sm">components/ui/{component.file}</code>
        </p>
        <CodeBlock language="tsx">{component.code}</CodeBlock>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Usage</h2>
        <CodeBlock language="tsx">{usageCode}</CodeBlock>
      </div>

      {component.props.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Props</h2>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">Prop</th>
                  <th className="text-left px-4 py-2 font-medium">Type</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop) => (
                  <tr key={prop.name} className="border-t">
                    <td className="px-4 py-2 font-mono text-xs">{prop.name}</td>
                    <td className="px-4 py-2 font-mono text-xs">{prop.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
