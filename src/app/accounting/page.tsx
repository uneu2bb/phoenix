"use client";

import { PageShell } from "@/components/layout/PageShell";
import { formatNumber } from "@/lib/utils";
import { TrendingUp, TrendingDown, Scale } from "lucide-react";

export default function AccountingPage() {
  return (
    <PageShell title="المحاسبة والحسابات">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border p-5"><div className="flex items-center gap-2 text-emerald-600 text-sm mb-2"><TrendingUp className="w-4 h-4" />الإيرادات (الشهر)</div><div className="text-2xl font-bold text-emerald-700">{formatNumber(18500000)} ل.س</div></div>
        <div className="bg-white rounded-2xl border p-5"><div className="flex items-center gap-2 text-rose-600 text-sm mb-2"><TrendingDown className="w-4 h-4" />المصروفات (الشهر)</div><div className="text-2xl font-bold text-rose-600">{formatNumber(6200000)} ل.س</div></div>
        <div className="bg-white rounded-2xl border p-5"><div className="flex items-center gap-2 text-brand-600 text-sm mb-2"><Scale className="w-4 h-4" />صافي الربح</div><div className="text-2xl font-bold text-brand-700">{formatNumber(12300000)} ل.س</div></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-semibold mb-4">ملخص الأرباح والخسائر</h2>
          <div className="space-y-3 text-sm">
            {[["مبيعات نقدية", 12500000, true], ["مبيعات بطاقة", 4800000, true], ["مبيعات توصيل", 1200000, true], ["تكلفة البضاعة", -4800000, false], ["رواتب", -2100000, false], ["إيجار ومرافق", -1050000, false]].map(([label, amount, isIncome]) => (
              <div key={label as string} className="flex justify-between py-2 border-b last:border-0"><span className="text-muted-foreground">{label as string}</span><span className={`font-semibold ${isIncome ? "text-emerald-600" : "text-rose-600"}`}>{formatNumber(Math.abs(amount as number))} ل.س</span></div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-semibold mb-4">أرصدة الحسابات</h2>
          <div className="space-y-3 text-sm">
            {[["الخزينة الرئيسية", 2450000], ["صناديق الكاشير", 277000], ["البنك", 5200000], ["ذمم عملاء", 180000], ["ذمم موردين", -130000]].map(([label, amount]) => (
              <div key={label as string} className="flex justify-between py-2 border-b last:border-0"><span className="text-muted-foreground">{label as string}</span><span className={`font-semibold ${(amount as number) >= 0 ? "text-brand-700" : "text-rose-600"}`}>{formatNumber(Math.abs(amount as number))} ل.س</span></div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
