"use client";

import { useSearch } from "@/context/SearchContext";
import { Comment } from "@prisma/client";
import { useInterval } from "./Thumbnails";
import { search } from "@/lib/embedding";

function Comment({ content }: { content: string }) {
  return (
    <div className="px-3 border-black-10 rounded-lg p-2 bg-[#fff] border">
      <p>{content}</p>
    </div>
  );
}

export default function Comments({ comments }: { comments: Comment[] }) {
  const [results, setResults] = useSearch();

  useInterval(async () => {
    setResults(await search(results?.query ?? ""));
  }, 1000);
  console.log(comments);

  return (
    <div className="grid gap-4">
      {comments.map((c, i) => (
        <Comment key={i} content={c.content} />
      ))}
    </div>
  );
}
