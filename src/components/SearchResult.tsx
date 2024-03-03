export default function SearchResult({
  image,
  docName,
  snippet,
}: {
  image: string;
  docName: string;
  snippet: React.ReactNode[];
}) {
  return (
    <div className="flex flex-row items-center justify-center border border-black-10 rounded-lg p-2 bg-[#fff] gap-2 w-fit shadow-sm">
      <div className="flex flex-col items-center justify-center gap-3">
        <img className="w-64 rounded border" src={image} alt={docName} />
        <p className="font-medium text-left w-full">{docName}</p>
      </div>
    </div>
  );
}
