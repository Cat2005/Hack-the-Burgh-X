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

export default function DocumentView({
  documentName,
  documentTags,
  documentUrl,
  comments,
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
      <DialogContent className="sm:max-w-[80vw] max-[50vw]: grid gap-4 grid-cols-3 h-[90vh] bg-gray-100">
        <div className="col-span-2 sm:col-span-2 rounded-lg">
          <embed
            src={documentUrl + "#toolbar=0&navpanes=0&scrollbar=0"}
            width="100%"
            height="100%"
            className="rounded-lg"
          />
        </div>
        <div className="col-span-3 sm:col-span-1 max-h-[100%] flex flex-col justify-between bg-white p-3 rounded-lg">
          <div className="flex flex-col gap-4 overflow-y-auto">
            <h1 className="text-3xl font-bold">{documentName}</h1>
            <Tags text={documentTags} />

            <Comments comments={comments} />
          </div>
          <CommentInput />
        </div>
      </DialogContent>
    </Dialog>
  );
}
