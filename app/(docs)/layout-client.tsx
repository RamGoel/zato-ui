"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Navigation } from "@/lib/navigation";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      suppressHydrationWarning
    >
      {mounted ? (
        resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
      ) : (
        <div className="h-4 w-4" />
      )}
    </Button>
  );
}

function Sidebar({ navigation }: { navigation: Navigation }) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-20 pt-5 space-y-6">
        {Object.entries(navigation).map(([section, items]) => (
          <div key={section}>
            <div className="text-sm font-medium mb-2">{section}</div>
            <nav className="space-y-0.5">
              {items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    item.status === "soon" && "pointer-events-none"
                  )}
                >
                  <span>{item.name}</span>
                  {item.status === "soon" && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">soon</Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function DocsLayoutClient({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: Navigation;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-lg font-semibold">zato</Link>
            <Badge variant="secondary" className="text-xs">beta</Badge>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center size-8 rounded-lg hover:bg-muted transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex gap-10">
          <Sidebar navigation={navigation} />
          <main className="flex-1 min-w-0 py-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
