"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

type TableStatus = "available" | "occupied" | "reserved" | "dirty";

const initialTables = [
  { id: "1", name: "1", capacity: 4, status: "available" as TableStatus, area: "الصالة الرئيسية" },
  { id: "2", name: "2", capacity: 4, status: "occupied" as TableStatus, area: "الصالة الرئيسية", orderTotal: 45000, duration: "32 د" },
  { id: "3", name: "3", capacity: 2, status: "available" as TableStatus, area: "الصالة الرئيسية" },
  { id: "4", name: "4", capacity: 6, status: "occupied" as TableStatus, area: "الصالة الرئيسية", orderTotal: 78000, duration: "1س 05د" },
  { id: "5", name: "5", capacity: 4, status: "dirty" as TableStatus, area: "الصالة الرئيسية" },
  { id: "6", name: "VIP 1", capacity: 8, status: "reserved" as TableStatus, area: "VIP", duration: "15 د" },
  { id: "7", name: "VIP 2", capacity: 6, status: "available" as TableStatus, area: "VIP" },
  { id: "8", name: "6", capacity: 4, status: "occupied" as TableStatus, area: "التراس", orderTotal: 22000, duration: "18 د" },
];

const statusLabels: Record<TableStatus, string> = {
  available: "متاحة",
  occupied: "مشغولة",
  reserved: "محجوزة",
  dirty: "تحتاج تنظيف",
};

const statusColors: Record<TableStatus, string> = {
  available: "bg-emerald-50 text-emerald-800 border-emerald-300",
  occupied: "bg-rose-50 text-rose-800 border-rose-300",
  reserved: "bg-amber-50 text-amber-800 border-amber-300",
  dirty: "bg-slate-100 text-slate-600 border-slate-300",
};

export default function TablesPage() {
  const [tables] = useState(initialTables);
  const [filter, setFilter] = useState<TableStatus | "all">("all");
  const filtered = filter === "all" ? tables : tables.filter((t) => t.status === filter);
  const counts = {
    all: tables.length,
    available: tables.filter((t) => t.status === "available").length,
    occupied: tables.filter((t) => t.status === "occupied").length,
    reserved: tables.filter((t) => t.status === "reserved").length,
    dirty: tables.filter((t) => t.status === "dirty").length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-14 bg-white border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-semibold">إدارة الطاولات</h1>
        </div>
      </div>
      <main className="p-6 space-y-6">
        <div className="flex flex-wrap gap-2">
          {(["all", "available", "occupied", "reserved", "dirty"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition",
                filter === key ? "bg-brand-600 text-white" : "bg-white border border-border text-muted-foreground hover:bg-slate-50"
              )}
            >
              {key === "all" ? "الكل" : statusLabels[key]} ({counts[key]})
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((table) => (
            <button
              key={table.id}
              className={cn("relative p-5 rounded-2xl border-2 text-center transition hover:shadow-md active:scale-[0.98]", statusColors[table.status])}
            >
              <div className="text-2xl font-bold mb-1">{table.name}</div>
              <div className="text-xs opacity-80 mb-2">{table.area}</div>
              <div className="text-sm font-medium">{statusLabels[table.status]}</div>
              <div className="text-xs mt-1 opacity-70">{table.capacity} مقاعد</div>
              {table.orderTotal && (
                <div className="mt-2 text-sm font-semibold">{table.orderTotal.toLocaleString("ar-SY")} ل.س</div>
              )}
              {table.duration && (
                <div className="absolute top-2 left-2 text-[10px] bg-black/10 px-1.5 py-0.5 rounded">{table.duration}</div>
              )}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
