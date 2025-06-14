export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#f9f2e8]">
      {children}
    </div>
  );
}
