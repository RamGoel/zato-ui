import { UserMessage } from "@/components/kit/user-message";

export const previews: Record<string, React.ReactNode> = {
  "user-message": (
    <div className="space-y-3">
      <UserMessage>Hello, how can you help me?</UserMessage>
      <UserMessage>This is another message.</UserMessage>
    </div>
  ),
};
