"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserMessage } from "@/components/ui/user-message";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex gap-2">
      <Button
        variant={theme === "light" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("light")}
      >
        Light
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("dark")}
      >
        Dark
      </Button>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold leading-3">aui-kit</h1>
          <p className="text-muted-foreground">
            AI-first components built on shadcn/ui
          </p>
          <ThemeSwitcher />
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>User Message</CardTitle>
              <CardDescription>
                Message bubble for user input in chat interfaces.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <UserMessage>Hello, how can you help me today?</UserMessage>
              <UserMessage>Can you explain how this component works?</UserMessage>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
