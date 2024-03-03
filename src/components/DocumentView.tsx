'use client'
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
import Tags from "./Tags";
import CommentInput from "./CommentInput";
import { useEffect, useRef } from "react";
import { SearchResults } from "@/lib/embedding";
import Comments from "./Comment";

export default function DocumentView(results
  : {
    results: SearchResults["results"][number];
  }) {
  const embedRef = useRef<HTMLEmbedElement>(null);

  useEffect(() => {
    console.log(results.results.url);
    fetch(results.results.url)
      .then((res) => res.blob())
      .then((blob) => {
        // @ts-ignore
        const blobToBase64 = (blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          return new Promise((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
        };
        // make the embed src the base64 string
        const documentUrl = blobToBase64(blob).then((res) => res);

        return documentUrl;
      })
      .then((documentUrl) => {
        // set the embed src to the base64 string
        // document.getElementById('embed
        if (embedRef.current === null) {
          return;
        }
        const embed = embedRef.current;
        // replace octet-stream with pdf
        const url = results.results.url.replace(
          "application/octet-stream",
          "application/pdf"
        );
        embed.setAttribute("type", "application/pdf");
        embed.setAttribute("src", url);
      });
  }, []);

  if (results.results === undefined) {
    return (
      <div>
        err
      </div>
    )
  }

  return (
    <Dialog aria-label="Edit Profile" defaultOpen>
      <DialogContent className="sm:max-w-[80vw] max-[50vw]: grid gap-4 grid-cols-3 h-[90vh] bg-gray-100">
        <div className="col-span-2 sm:col-span-2 rounded-lg">
          <embed
            ref={embedRef}
            width="100%"
            height="100%"
            className="rounded-lg"
          />
        </div>
        <div className="col-span-3 sm:col-span-1 max-h-[100%] flex flex-col justify-between bg-white p-3 rounded-lg">
          <div className="flex flex-col gap-4 overflow-y-auto">
            <h1 className="text-3xl font-bold">{results.results ? results.results.name : "Title"}</h1>
            <Tags text={results.results.tags} />

            <Comments comments={results.results.comments} />
          </div>
          <CommentInput documentId={results.results.documentId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
