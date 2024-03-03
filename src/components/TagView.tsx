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

export default function TagView({ tagName }: { tagName: string }) {
  return (
    <Dialog aria-label="Edit Profile" asChild>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80vw] max-[50vw]: h-[90vh] bg-gray-100">
        <DialogHeader>
          <h1 className="text-3xl font-bold text-center w-full">{tagName}</h1>
        </DialogHeader>
        <div>
          <div className="w-10 h-10 bg-neutral-500"></div>
          <div className="w-10 h-10 bg-neutral-500"></div>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, asperiores. Eius, explicabo neque quisquam reprehenderit, vitae ad placeat provident mollitia, numquam omnis qui nemo. Animi doloremque eveniet rem sed suscipit.
        </div>
      </DialogContent>
    </Dialog>
  );
}
