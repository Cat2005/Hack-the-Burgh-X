import { Comment } from "@prisma/client";

function Comment({ content }: { content: string }) {
  return (
    <div className="px-3 border-black-10 rounded-lg p-2 bg-[#fff] border">
      <p>{content}</p>
    </div>
  )
}

export default function Comments({
  comments,
}: {
  comments: Comment[]
}) {
  return (
    <div className="grid gap-4">
      {comments.map((c, i) => (
        <Comment key={i} content={c.content} />
      ))}
    </div>
  )
}
