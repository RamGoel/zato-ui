interface CodeBlockProps {
  html: string;
}

export function CodeBlock({ html }: CodeBlockProps) {
  return (
    <div 
      className="rounded-lg overflow-x-auto text-sm [&_pre]:p-4 [&_pre]:m-0 [&_code]:bg-transparent border border-border"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}
