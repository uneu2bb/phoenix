"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Plus } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const employees = [
  { id: "1", name: "محمد أحمد", position: "كاشير", branch: "الرئيسي", salary: 450000, status: "active", shift: "صباحي" },
  { id: "2", name: "علي حسن", position: "طاهي", branch: "الرئيسي", salary: 600000, status: "active", shift: "مسائي" },
  { id: "3", name: "ياسر خليل", position: "مندوب توصيل", branch: "الرئيسي", salary: 350000, status: "active", shift: "مسائي" },
  { id: "4", name: "فادي سامي", position: "مندوب توصيل", branch: "الرئيسي", salary: 350000, status: "active", shift: "صباحي" },
  { id: "5", name: "نور محمد", position: "مشرف صالة", branch: "الرئيسي", salary: 500000, status: "active", shift: "صباحي" },
  { id: "6", name: "سامر دياب", position: "كاشير", branch: "فرع 2", salary: 400000, status: "leave", shift: "—" },
];

export default function EmployeesPage() {
  return (
    <PageShell title="إدارة الموظفين" action={<button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium"><Plus className="w-4 h-4" />موظف جديد</button>}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border p-4 text-center"><div className="text-2xl font-bold">{employees.length}</div><div className="text-xs text-muted-foreground mt-1">إجمالي الموظفين</div></div>
        <div className="bg-white rounded-2xl border p-4 text-center"><div className="text-2xl font-bold text-emerald-600">{employees.filter((e) => e.status === "active").length}</div><div className="text-xs text-muted-foreground mt-1">نشطون</div></div>
        <div className="bg-white rounded-2xl border p-4 text-center"><div className="text-2xl font-bold text-amber-600">{employees.filter((e) => e.status === "leave").length}</div><div className="text-xs text-muted-foreground mt-1">إجازة</div></div>
        <div className="bg-white rounded-2xl border p-4 text-center"><div className="text-2xl font-bold text-brand-700">{formatNumber(employees.reduce((s, e) => s + e.salary, 0))}</div><div className="text-xs text-muted-foreground mt-1">إجمالي الرواتب</div></div>
      </div>
      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-muted-foreground"><tr><th className="text-right px-4 py-3 font-medium">الموظف</th><th className="text-right px-4 py-3 font-medium">الوظيفة</th><th className="text-right px-4 py-3 font-medium">الفرع</th><th className="text-right px-4 py-3 font-medium">الوردية</th><th className="text-right px-4 py-3 font-medium">الراتب</th><th className="text-right px-4 py-3 font-medium">الحالة</th></tr></thead>
          <tbody>{employees.map((e) => (<tr key={e.id} className="border-b last:border-0 hover:bg-slate-50/50"><td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">{e.name.charAt(0)}</div><span className="font-medium">{e.name}</span></div></td><td className="px-4 py-3">{e.position}</td><td className="px-4 py-3 text-muted-foreground">{e.branch}</td><td className="px-4 py-3">{e.shift}</td><td className="px-4 py-3 font-semibold">{formatNumber(e.salary)} ل.س</td><td className="px-4 py-3"><span className={`text-xs font-medium px-2 py-1 rounded-full ${e.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{e.status === "active" ? "نشط" : "إجازة"}</span></td></tr>))}</tbody>
        </table>
      </div>
    </PageShell>
  );
}
