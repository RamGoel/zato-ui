import { getNavigation } from "@/lib/navigation";
import { DocsLayout as DocsLayoutClient } from "@/components/docs/docs-layout";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = getNavigation();
  
  return (
    <DocsLayoutClient navigation={navigation}>
      {children}
    </DocsLayoutClient>
  );
}
