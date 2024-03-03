"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { createComment } from "./comment-actions";

export default function CommentInput({ documentId }: { documentId: string }) {
  const [content, setContent] = useState("");
  const handleSubmit = () => {
    createComment(content, documentId);
    toast.success("Comment submitted!");
  };

  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." className="resize-none" value={content} onChange={(e) => setContent(e.target.value)} />
      <Button onClick={handleSubmit}>Send comment</Button>
    </div>
  );
}
