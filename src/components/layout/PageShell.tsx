"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export function PageShell({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-mesh bg-background">
      <Sidebar />
      <div className="mr-[272px] min-h-screen flex flex-col">
        <div className="h-14 glass-strong border-b border-border/60 flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3 animate-fade-in">
            <Link
              href="/dashboard"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold tracking-tight">{title}</h1>
          </div>
          {action && <div className="animate-fade-in">{action}</div>}
        </div>
        <main className="p-6 animate-fade-up">{children}</main>
      </div>
    </div>
  );
}
