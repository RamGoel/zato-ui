"use client";

import { UserMessage } from "@/components/kit/user-message";

export function HomePreview() {
  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">aui-kit demo</span>
      </div>
      <div className="p-6 space-y-4 bg-gradient-to-b from-muted/20 to-transparent">
        <UserMessage avatar="JD" timestamp="2:45 PM" status="sent">
          Can you help me build a chat interface?
        </UserMessage>
        <UserMessage avatar="JD" timestamp="2:46 PM" status="sent">
          That sounds great!
        </UserMessage>
        <UserMessage avatar="JD" timestamp="2:47 PM" status="sent">
          Thanks for the help!
        </UserMessage>
      </div>
    </div>
  );
}
