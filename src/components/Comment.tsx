import { Comment } from "@prisma/client";

function Comment({ title, content }: { title: string; content: string }) {
  return (
    <div className="px-3 border-black-10 rounded-lg p-2 bg-[#fff] border">
      <p className="text-sm text-gray-500">{title}</p>
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
        <Comment key={i} title={c.title} content={c.content} />
      ))}
    </div>
  )
}
