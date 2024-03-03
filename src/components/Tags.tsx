function Tag({ text }: { text: string }) {
  return (
    <span className="bg-[#000000] text-white rounded-full px-2 py-1">
      {text}
    </span>
  )
}

export default function Tags({ text }: { text: string[] }) {
  return (
    <div className="flex flex-row gap-2">
      {text.map((t, i) => (
        <Tag key={i} text={t} />
      ))}
    </div>
  )
}
