import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-950">
      <Sidebar />
      <div className="mr-64 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
