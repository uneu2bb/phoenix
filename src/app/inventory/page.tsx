"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Plus, Search, AlertTriangle, Package } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

const stock = [
  { id: "1", name: "بن مطحون", warehouse: "المستودع الرئيسي", qty: 12.5, unit: "كغ", min: 5, cost: 45000 },
  { id: "2", name: "حليب طازج", warehouse: "المستودع الرئيسي", qty: 8, unit: "لتر", min: 10, cost: 12000 },
  { id: "3", name: "سكر", warehouse: "المستودع الرئيسي", qty: 25, unit: "كغ", min: 10, cost: 8000 },
  { id: "4", name: "دجاج طازج", warehouse: "ثلاجة اللحوم", qty: 15, unit: "كغ", min: 8, cost: 180000 },
  { id: "5", name: "أرز بسمتي", warehouse: "المستودع الرئيسي", qty: 40, unit: "كغ", min: 15, cost: 60000 },
  { id: "6", name: "أكواب ورقية", warehouse: "المستودع الرئيسي", qty: 350, unit: "قطعة", min: 200, cost: 3 },
  { id: "7", name: "نوتيلا", warehouse: "المستودع الرئيسي", qty: 4, unit: "كغ", min: 5, cost: 85000 },
  { id: "8", name: "بطاطس", warehouse: "ثلاجة الخضار", qty: 30, unit: "كغ", min: 10, cost: 5000 },
];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const filtered = stock.filter((s) => s.name.includes(search) || s.warehouse.includes(search));
  const lowStock = stock.filter((s) => s.qty <= s.min).length;

  return (
    <PageShell title="المخزون والمستودعات" action={<div className="flex gap-2"><button className="flex items-center gap-2 border bg-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50">جرد</button><button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium"><Plus className="w-4 h-4" />إضافة مادة</button></div>}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border p-5 flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center"><Package className="w-6 h-6" /></div><div><div className="text-sm text-muted-foreground">إجمالي الأصناف</div><div className="text-2xl font-bold">{stock.length}</div></div></div>
        <div className="bg-white rounded-2xl border p-5 flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><AlertTriangle className="w-6 h-6" /></div><div><div className="text-sm text-muted-foreground">تحت الحد الأدنى</div><div className="text-2xl font-bold text-amber-600">{lowStock}</div></div></div>
        <div className="bg-white rounded-2xl border p-5 flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Package className="w-6 h-6" /></div><div><div className="text-sm text-muted-foreground">المستودعات</div><div className="text-2xl font-bold">3</div></div></div>
      </div>
      <div className="relative max-w-md mb-4"><Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="بحث في المخزون..." className="w-full h-10 pr-10 pl-4 rounded-xl border bg-white text-sm" /></div>
      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b text-muted-foreground"><tr><th className="text-right px-4 py-3 font-medium">المادة</th><th className="text-right px-4 py-3 font-medium">المستودع</th><th className="text-right px-4 py-3 font-medium">الكمية</th><th className="text-right px-4 py-3 font-medium">الحد الأدنى</th><th className="text-right px-4 py-3 font-medium">تكلفة الوحدة</th><th className="text-right px-4 py-3 font-medium">الحالة</th></tr></thead>
          <tbody>{filtered.map((s) => { const isLow = s.qty <= s.min; return (<tr key={s.id} className="border-b last:border-0 hover:bg-slate-50/50"><td className="px-4 py-3 font-medium">{s.name}</td><td className="px-4 py-3 text-muted-foreground">{s.warehouse}</td><td className="px-4 py-3"><span className={cn(isLow && "text-amber-600 font-semibold")}>{s.qty} {s.unit}</span></td><td className="px-4 py-3 text-muted-foreground">{s.min} {s.unit}</td><td className="px-4 py-3">{formatNumber(s.cost)} ل.س</td><td className="px-4 py-3">{isLow ? (<span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full"><AlertTriangle className="w-3 h-3" />منخفض</span>) : (<span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">متوفر</span>)}</td></tr>); })}</tbody>
        </table>
      </div>
    </PageShell>
  );
}
