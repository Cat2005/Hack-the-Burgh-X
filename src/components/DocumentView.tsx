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
import { useEffect } from "react";

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
  useEffect(() => {
    fetch(documentUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const blobToBase64 = blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          return new Promise(resolve => {
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
        };
        // make the embed src the base64 string
        const documentUrl = blobToBase64(blob).then((res) => res)

        return documentUrl

      })
      .then((documentUrl) => {
        // set the embed src to the base64 string
        // document.getElementById('embed
        const embed = document.querySelector('embed')
        // replace octet-stream with pdf
        const url = documentUrl.replace('application/octet-stream', 'application/pdf')
        embed.setAttribute('type', "application/pdf")
        embed.setAttribute('src', url)
      })
  }, [])
  return (
    <Dialog aria-label="Edit Profile" defaultOpen>
      <DialogContent className="sm:max-w-[80vw] max-[50vw]: grid gap-4 grid-cols-3 h-[90vh] bg-gray-100">
        <div className="col-span-2 sm:col-span-2 rounded-lg">
          <embed
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
