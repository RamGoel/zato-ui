import { getNavigation } from "@/lib/navigation";
import { DocsLayoutClient } from "./layout-client";

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
