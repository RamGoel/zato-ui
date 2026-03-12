"use client";

import { previews } from "@/lib/previews";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PreviewWrapper({ slug }: { slug: string }) {
  const preview = previews[slug];

  if (!preview) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Preview</CardTitle>
      </CardHeader>
      <CardContent>{preview}</CardContent>
    </Card>
  );
}
