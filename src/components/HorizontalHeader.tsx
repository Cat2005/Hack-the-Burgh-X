import { db } from "@/lib/db";

export default async function HorizontalHeader() {
  const res = await db.document.findMany({
    select: {
      id: true,
    },
  });
  const count = res.length;
  return (
    <div className="flex flex-row justify-between items-center align-middle h-7 bg-[#fff] border rounded-xl py-5 px-2 shadow-sm">
      <h1 className="text-lg px-2 text-neutral-600">
        ML ⋅ University of Edinburgh{" "}
      </h1>
      <h1 className="px-2 text-neutral-400">{count} documents</h1>
    </div>
  );
}
