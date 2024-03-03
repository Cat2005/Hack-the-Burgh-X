"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function CommentInput() {
  const handleSubmit = () => {
    toast.success("Comment submitted!");
  };

  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." className="resize-none" />
      <Button onClick={handleSubmit}>Send comment</Button>
    </div>
  );
}
