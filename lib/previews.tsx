import { UserMessage } from "@/components/kit/user-message";
import { AiMessage } from "@/components/kit/ai-message";

export const previews: Record<string, React.ReactNode> = {
  "user-message": (
    <div className="space-y-3">
      <UserMessage>Hello, how can you help me?</UserMessage>
      <UserMessage>This is another message.</UserMessage>
    </div>
  ),
  "ai-message": (
    <div className="space-y-3">
      <AiMessage>Hi! I&apos;m here to help.</AiMessage>
      <AiMessage>Feel free to ask anything.</AiMessage>
    </div>
  ),
};
