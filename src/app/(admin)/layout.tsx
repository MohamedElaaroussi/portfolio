
export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex h-full w-full bg-BG">
      {children}
    </div>
  )
}