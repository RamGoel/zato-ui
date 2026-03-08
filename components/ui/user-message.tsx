import { cn } from "@/lib/utils";

interface UserMessageProps {
  children: React.ReactNode;
  className?: string;
}

export function UserMessage({ children, className }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div
        className={cn(
          "max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2.5",
          "bg-primary text-primary-foreground",
          className
        )}
      >
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
