"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Plus, Search, Users } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const customers = [
  { id: "1", name: "أحمد محمد", phone: "0933 111 222", orders: 24, spent: 1850000, points: 185 },
  { id: "2", name: "سارة علي", phone: "0944 333 444", orders: 18, spent: 920000, points: 92 },
  { id: "3", name: "خالد حسن", phone: "0955 555 666", orders: 31, spent: 2400000, points: 240 },
  { id: "4", name: "نور الدين", phone: "0966 777 888", orders: 7, spent: 310000, points: 31 },
  { id: "5", name: "ريم يوسف", phone: "0977 999 000", orders: 12, spent: 580000, points: 58 },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const filtered = customers.filter((c) => c.name.includes(search) || c.phone.includes(search));

  return (
    <PageShell title="إدارة العملاء" action={<button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium"><Plus className="w-4 h-4" />عميل جديد</button>}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border p-5 flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center"><Users className="w-6 h-6" /></div><div><div className="text-sm text-muted-foreground">إجمالي العملاء</div><div className="text-2xl font-bold">{customers.length}</div></div></div>
        <div className="bg-white rounded-2xl border p-5"><div className="text-sm text-muted-foreground mb-1">إجمالي الإنفاق</div><div className="text-2xl font-bold text-brand-700">{formatNumber(customers.reduce((s, c) => s + c.spent, 0))} ل.س</div></div>
        <div className="bg-white rounded-2xl border p-5"><div className="text-sm text-muted-foreground mb-1">نقاط الولاء</div><div className="text-2xl font-bold">{customers.reduce((s, c) => s + c.points, 0)}</div></div>
      </div>
      <div className="relative max-w-md mb-4"><Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="بحث بالاسم أو الرقم..." className="w-full h-10 pr-10 pl-4 rounded-xl border bg-white text-sm" /></div>
      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-muted-foreground"><tr><th className="text-right px-4 py-3 font-medium">العميل</th><th className="text-right px-4 py-3 font-medium">الهاتف</th><th className="text-right px-4 py-3 font-medium">الطلبات</th><th className="text-right px-4 py-3 font-medium">إجمالي الإنفاق</th><th className="text-right px-4 py-3 font-medium">النقاط</th></tr></thead>
          <tbody>{filtered.map((c) => (<tr key={c.id} className="border-b last:border-0 hover:bg-slate-50/50"><td className="px-4 py-3 font-medium">{c.name}</td><td className="px-4 py-3 text-muted-foreground">{c.phone}</td><td className="px-4 py-3">{c.orders}</td><td className="px-4 py-3 font-semibold text-brand-700">{formatNumber(c.spent)} ل.س</td><td className="px-4 py-3"><span className="bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full">{c.points} نقطة</span></td></tr>))}</tbody>
        </table>
      </div>
    </PageShell>
  );
}
