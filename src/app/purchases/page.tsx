"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Plus, Truck } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const purchases = [
  { id: "PO-001", supplier: "مؤسسة الأغذية المتحدة", date: "2026-11-10", total: 450000, status: "received", payment: "paid" },
  { id: "PO-002", supplier: "مورد الألبان", date: "2026-11-09", total: 120000, status: "received", payment: "partial" },
  { id: "PO-003", supplier: "شركة التعبئة", date: "2026-11-08", total: 85000, status: "pending", payment: "unpaid" },
  { id: "PO-004", supplier: "مؤسسة الأغذية المتحدة", date: "2026-11-05", total: 320000, status: "received", payment: "paid" },
];

const suppliers = [
  { name: "مؤسسة الأغذية المتحدة", balance: 0, phone: "0933xxx" },
  { name: "مورد الألبان", balance: 45000, phone: "0944xxx" },
  { name: "شركة التعبئة", balance: 85000, phone: "0955xxx" },
];

export default function PurchasesPage() {
  return (
    <PageShell title="المشتريات والموردين" action={<button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium"><Plus className="w-4 h-4" />طلب شراء جديد</button>}>
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {suppliers.map((s) => (
          <div key={s.name} className="bg-white rounded-2xl border p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center"><Truck className="w-5 h-5" /></div>
              <div><div className="font-semibold text-sm">{s.name}</div><div className="text-xs text-muted-foreground">{s.phone}</div></div>
            </div>
            <div className="text-sm">الرصيد: <span className={s.balance > 0 ? "text-rose-600 font-semibold" : "text-emerald-600 font-semibold"}>{formatNumber(s.balance)} ل.س</span></div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-4 py-3 border-b font-semibold">آخر أوامر الشراء</div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-muted-foreground"><tr><th className="text-right px-4 py-3 font-medium">الرقم</th><th className="text-right px-4 py-3 font-medium">المورد</th><th className="text-right px-4 py-3 font-medium">التاريخ</th><th className="text-right px-4 py-3 font-medium">الإجمالي</th><th className="text-right px-4 py-3 font-medium">الاستلام</th><th className="text-right px-4 py-3 font-medium">الدفع</th></tr></thead>
          <tbody>{purchases.map((p) => (<tr key={p.id} className="border-b last:border-0 hover:bg-slate-50/50"><td className="px-4 py-3 font-medium text-brand-700">{p.id}</td><td className="px-4 py-3">{p.supplier}</td><td className="px-4 py-3 text-muted-foreground">{p.date}</td><td className="px-4 py-3 font-semibold">{formatNumber(p.total)} ل.س</td><td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${p.status === "received" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{p.status === "received" ? "مستلم" : "قيد الانتظار"}</span></td><td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${p.payment === "paid" ? "bg-emerald-50 text-emerald-700" : p.payment === "partial" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}`}>{p.payment === "paid" ? "مدفوع" : p.payment === "partial" ? "جزئي" : "غير مدفوع"}</span></td></tr>))}</tbody>
        </table>
      </div>
    </PageShell>
  );
}
