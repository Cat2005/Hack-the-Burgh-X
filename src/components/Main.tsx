// For lack of a better name
export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-gray-100 gap-3 p-3">
      {children}
    </div>
  )
}
