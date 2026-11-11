"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { cn, formatNumber } from "@/lib/utils";
import { MapPin, Phone, Clock } from "lucide-react";

type DeliveryStatus = "pending" | "assigned" | "picked" | "delivered";

const orders = [
  { id: "D-101", customer: "أحمد محمد", phone: "0933 111 222", address: "المزة - شارع الجلاء", fee: 5000, total: 45000, status: "pending" as DeliveryStatus, time: "12 د" },
  { id: "D-102", customer: "سارة علي", phone: "0944 333 444", address: "أبو رمانة", fee: 4000, total: 28000, status: "assigned" as DeliveryStatus, driver: "ياسر", time: "8 د" },
  { id: "D-103", customer: "خالد حسن", phone: "0955 555 666", address: "المالكي", fee: 6000, total: 72000, status: "picked" as DeliveryStatus, driver: "فادي", time: "22 د" },
  { id: "D-104", customer: "ريم يوسف", phone: "0977 999 000", address: "الشعلان", fee: 3500, total: 19000, status: "delivered" as DeliveryStatus, driver: "ياسر", time: "35 د" },
];

const statusLabel: Record<DeliveryStatus, string> = { pending: "بانتظار التعيين", assigned: "تم التعيين", picked: "في الطريق", delivered: "تم التسليم" };
const statusColor: Record<DeliveryStatus, string> = { pending: "bg-amber-50 text-amber-700", assigned: "bg-blue-50 text-blue-700", picked: "bg-violet-50 text-violet-700", delivered: "bg-emerald-50 text-emerald-700" };

export default function DeliveryPage() {
  const [filter, setFilter] = useState<DeliveryStatus | "all">("all");
  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <PageShell title="إدارة التوصيل">
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "pending", "assigned", "picked", "delivered"] as const).map((key) => (
          <button key={key} onClick={() => setFilter(key)} className={cn("px-4 py-2 rounded-xl text-sm font-medium transition", filter === key ? "bg-brand-600 text-white" : "bg-white border text-muted-foreground hover:bg-slate-50")}>
            {key === "all" ? "الكل" : statusLabel[key]}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((o) => (
          <div key={o.id} className="bg-white rounded-2xl border p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div><div className="font-bold text-brand-700">{o.id}</div><div className="font-medium mt-0.5">{o.customer}</div></div>
              <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", statusColor[o.status])}>{statusLabel[o.status]}</span>
            </div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /><span>{o.phone}</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /><span>{o.address}</span></div>
              <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /><span>{o.time}</span>{o.driver && <span className="text-brand-600">· المندوب: {o.driver}</span>}</div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t text-sm">
              <span>رسوم التوصيل: {formatNumber(o.fee)} ل.س</span>
              <span className="font-bold text-brand-700">{formatNumber(o.total)} ل.س</span>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
