"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

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
    <div className="min-h-screen bg-slate-50">
      <div className="h-14 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        {action}
      </div>
      <main className="p-6">{children}</main>
    </div>
  );
}
