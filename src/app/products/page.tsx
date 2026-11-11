"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Plus, Search, Edit2, ToggleLeft, ToggleRight } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

const sampleProducts = [
  { id: "1", name: "قهوة تركية", category: "مشروبات ساخنة", price: 3000, cost: 800, stock: 120, active: true },
  { id: "2", name: "كابتشينو", category: "مشروبات ساخنة", price: 4500, cost: 1200, stock: 85, active: true },
  { id: "3", name: "كبسة دجاج", category: "وجبات", price: 15000, cost: 6500, stock: 40, active: true },
  { id: "4", name: "شاورما لحم", category: "وجبات", price: 12000, cost: 5200, stock: 35, active: true },
  { id: "5", name: "وافل نوتيلا", category: "حلويات", price: 6000, cost: 2100, stock: 28, active: true },
  { id: "6", name: "تشيز كيك", category: "حلويات", price: 7000, cost: 2800, stock: 15, active: false },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [products] = useState(sampleProducts);
  const filtered = products.filter((p) => p.name.includes(search) || p.category.includes(search));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-14 bg-white border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-semibold">المنتجات والقائمة</h1>
        </div>
        <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition">
          <Plus className="w-4 h-4" />
          إضافة منتج
        </button>
      </div>
      <main className="p-6 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="بحث بالاسم أو التصنيف..." className="w-full h-10 pr-10 pl-4 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
        </div>
        <div className="bg-white rounded-2xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b text-muted-foreground">
              <tr>
                <th className="text-right px-4 py-3 font-medium">المنتج</th>
                <th className="text-right px-4 py-3 font-medium">التصنيف</th>
                <th className="text-right px-4 py-3 font-medium">سعر البيع</th>
                <th className="text-right px-4 py-3 font-medium">التكلفة</th>
                <th className="text-right px-4 py-3 font-medium">المخزون</th>
                <th className="text-right px-4 py-3 font-medium">الحالة</th>
                <th className="text-right px-4 py-3 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3 font-semibold text-brand-700">{formatNumber(p.price)} ل.س</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatNumber(p.cost)} ل.س</td>
                  <td className="px-4 py-3"><span className={cn(p.stock < 20 && "text-amber-600 font-medium")}>{p.stock}</span></td>
                  <td className="px-4 py-3">
                    {p.active ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium"><ToggleRight className="w-4 h-4" /> نشط</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 text-xs font-medium"><ToggleLeft className="w-4 h-4" /> متوقف</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
