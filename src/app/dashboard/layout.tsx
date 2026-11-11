import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-mesh bg-background">
      <Sidebar />
      <div className="mr-[272px] min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
