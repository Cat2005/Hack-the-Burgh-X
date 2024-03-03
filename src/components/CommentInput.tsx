"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
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
