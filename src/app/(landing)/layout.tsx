import Header from "@/components/header";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      {children}
    </div>
  );
}
