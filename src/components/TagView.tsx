import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Comment from "./Comment";
import Comments from "./Comment";
import Tags from "./Tags";
import CommentInput from "./CommentInput";

export default function TagView({
  Tag,
}: {
  documentName: string;
  documentTags: string[];
  documentUrl: string;
  comments: { title: string; content: string }[];
}) {
  return (
    <Dialog aria-label="Edit Profile" asChild>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80vw] max-[50vw]: grid gap-4 grid-cols-3 h-[90vh] bg-gray-100"></DialogContent>
    </Dialog>
  );
}
