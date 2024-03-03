"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { uploadToS3 } from "./s3-actions";
import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
export function DropZone({ children }: Props) {
  const [openModal, setOpenModal] = React.useState(false);
  const [tags, setTags] = React.useState<string[]>([]);
  const { getRootProps, isDragAccept, isDragReject, acceptedFiles } =
    useDropzone({
      accept: { "application/pdf": [] },
      noClick: true,
      onDropAccepted(files, event) {
        setOpenModal(true);
      },
    });

  async function upload() {
    setTags([]);
    const file = acceptedFiles[0];
    setOpenModal(false);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await uploadToS3(formData, tags);
      toast.success("File uploaded successfully");
    } catch (e) {
      toast.error("File upload failed");
    }
  }
  const tagRef = React.useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        "transition-all h-full rounded-sm outline outline-[#fff0]",
        isDragAccept && "outline outline-offset-1 outline-4 outline-green-400",
        isDragReject && "outline outline-offset-1 outline-4 outline-red-500"
      )}
      {...getRootProps()}
    >
      {isDragAccept}
      {isDragReject}

      {openModal && acceptedFiles[0] && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload File</DialogTitle>
              <DialogDescription>
                Uploading file {acceptedFiles[0].name}?
              </DialogDescription>
            </DialogHeader>

            <form className="flex flex-col gap-5">
              <div className="w-full flex flex-col">
                <label className="text-sm" htmlFor="title">
                  TITLE
                </label>
                <input
                  required
                  placeholder={acceptedFiles[0].name}
                  className="border rounded-md p-2"
                  name="title"
                />
              </div>

              <div className="w-full flex flex-col">
                <label className="text-sm" htmlFor="tags">
                  TAGS
                </label>
                <input
                  required
                  type="text"
                  ref={tagRef}
                  className="border rounded-md p-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (tagRef.current !== null) {
                        e.preventDefault();
                        const t = tagRef.current;
                        setTags((tags) => [...tags, t.value]);
                        t.value = "";
                      }
                    }
                  }}
                />
                <div className="flex gap-2 pt-2">
                  {tags.map((tag) => (
                    <div
                      className="items-center flex rounded-full bg-neutral-200 px-2 py-1 font-mono gap-1"
                      key={tag}
                    >
                      <p>{tag}</p>{" "}
                      <X
                        className="w-4 h-4 hover:cursor-pointer"
                        onClick={() => {
                          setTags((tags) => tags.filter((t) => t !== tag));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={upload}>Upload</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
      {children}
    </div>
  );
}
