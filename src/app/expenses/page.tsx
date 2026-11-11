"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Plus } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const expenses = [
  { id: "1", title: "فاتورة كهرباء", category: "مرافق", amount: 185000, date: "2026-11-10", method: "تحويل" },
  { id: "2", title: "صيانة ماكينة القهوة", category: "صيانة", amount: 45000, date: "2026-11-10", method: "نقدي" },
  { id: "3", title: "إيجار المحل", category: "إيجار", amount: 800000, date: "2026-11-01", method: "تحويل" },
  { id: "4", title: "مواد تنظيف", category: "تشغيلية", amount: 25000, date: "2026-11-09", method: "نقدي" },
  { id: "5", title: "إنترنت", category: "مرافق", amount: 35000, date: "2026-11-05", method: "تحويل" },
  { id: "6", title: "رواتب نوفمبر", category: "رواتب", amount: 1500000, date: "2026-11-07", method: "نقدي" },
];

export default function ExpensesPage() {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  return (
    <PageShell title="إدارة المصروفات" action={<button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium"><Plus className="w-4 h-4" />مصروف جديد</button>}>
      <div className="bg-white rounded-2xl border p-5 mb-6 max-w-sm"><div className="text-sm text-muted-foreground mb-1">إجمالي مصروفات الشهر</div><div className="text-3xl font-bold text-rose-600">{formatNumber(total)} ل.س</div></div>
      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-muted-foreground"><tr><th className="text-right px-4 py-3 font-medium">البيان</th><th className="text-right px-4 py-3 font-medium">التصنيف</th><th className="text-right px-4 py-3 font-medium">المبلغ</th><th className="text-right px-4 py-3 font-medium">التاريخ</th><th className="text-right px-4 py-3 font-medium">طريقة الدفع</th></tr></thead>
          <tbody>{expenses.map((e) => (<tr key={e.id} className="border-b last:border-0 hover:bg-slate-50/50"><td className="px-4 py-3 font-medium">{e.title}</td><td className="px-4 py-3"><span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{e.category}</span></td><td className="px-4 py-3 font-semibold text-rose-600">{formatNumber(e.amount)} ل.س</td><td className="px-4 py-3 text-muted-foreground">{e.date}</td><td className="px-4 py-3">{e.method}</td></tr>))}</tbody>
        </table>
      </div>
    </PageShell>
  );
}
