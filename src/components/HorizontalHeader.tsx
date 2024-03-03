export default function HorizontalHeader({
  documentCount,
}: {
  documentCount: number
}) {
  return (
    <div className="flex flex-row justify-between items-center align-middle h-10 bg-[#fff] border rounded-xl py-7 px-2 shadow-sm">
      <h1 className="text-2xl px-2">NLP ⋅ University of Edinburgh </h1>
      <h1 className="text-l px-2">{documentCount} documents</h1>
    </div>
  )
}
