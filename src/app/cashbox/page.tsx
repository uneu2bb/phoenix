"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const cashboxes = [
  { name: "الخزينة الرئيسية", balance: 2450000 },
  { name: "صندوق الكاشير 1", balance: 185000 },
  { name: "صندوق الكاشير 2", balance: 92000 },
  { name: "حساب البنك", balance: 5200000 },
];

const transactions = [
  { id: "1", type: "in", label: "مبيعات وردية صباحية", amount: 1250000, time: "10:30", box: "صندوق الكاشير 1" },
  { id: "2", type: "out", label: "صرف راتب - محمد أحمد", amount: 450000, time: "11:00", box: "الخزينة الرئيسية" },
  { id: "3", type: "out", label: "مصروف صيانة", amount: 35000, time: "11:45", box: "الخزينة الرئيسية" },
  { id: "4", type: "in", label: "تحصيل من مندوب", amount: 180000, time: "12:20", box: "صندوق الكاشير 1" },
  { id: "5", type: "out", label: "شراء مواد خام", amount: 320000, time: "13:00", box: "الخزينة الرئيسية" },
];

export default function CashboxPage() {
  return (
    <PageShell title="الخزينة والصناديق">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cashboxes.map((c) => (
          <div key={c.name} className="bg-white rounded-2xl border p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2"><Wallet className="w-4 h-4" />{c.name}</div>
            <div className="text-2xl font-bold text-brand-700">{formatNumber(c.balance)} ل.س</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium"><ArrowDownLeft className="w-4 h-4" />إيداع</button>
        <button className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-sm font-medium"><ArrowUpRight className="w-4 h-4" />سحب</button>
        <button className="flex items-center gap-2 border bg-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50">تحويل بين الصناديق</button>
        <button className="flex items-center gap-2 border bg-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50">إقفال اليومية</button>
      </div>
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="px-4 py-3 border-b font-semibold">حركة اليوم</div>
        <div className="divide-y">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${t.type === "in" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                  {t.type === "in" ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div><div className="font-medium text-sm">{t.label}</div><div className="text-xs text-muted-foreground">{t.box} · {t.time}</div></div>
              </div>
              <div className={`font-bold text-sm ${t.type === "in" ? "text-emerald-600" : "text-rose-600"}`}>{t.type === "in" ? "+" : "-"}{formatNumber(t.amount)} ل.س</div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
