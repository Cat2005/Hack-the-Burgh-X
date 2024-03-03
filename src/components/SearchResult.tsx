export default function SearchResult({
  image,
  docName,
  snippet,
}: {
  image: string
  docName: string
  snippet: React.ReactNode[]
}) {
  return (
    <div className="flex flex-row items-center justify-center border border-black-10 rounded-lg p-2 bg-[#fff] gap-3">
      <div className="flex flex-col items-center justify-center ">
        <img className="w-64 rounded shadow-sm" src={image} alt={docName} />
        <p>{docName}</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        {snippet.map((s, i) => (
          <div key={i} className="flex flex-row gap-1">
            <span className="text-4xl">{'"'}</span>
            <div>{s}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
