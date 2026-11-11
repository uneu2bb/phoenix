"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Clock, Check, ChefHat } from "lucide-react";

type KitchenStatus = "pending" | "preparing" | "ready";

interface KitchenOrder {
  id: string;
  orderNumber: string;
  tableName?: string;
  orderType: string;
  items: { name: string; qty: number; notes?: string }[];
  status: KitchenStatus;
  elapsedMinutes: number;
}

const initialOrders: KitchenOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-00124",
    tableName: "طاولة 2",
    orderType: "dine_in",
    items: [{ name: "كبسة دجاج", qty: 2 }, { name: "عصير برتقال", qty: 2 }],
    status: "preparing",
    elapsedMinutes: 12,
  },
  {
    id: "2",
    orderNumber: "ORD-00125",
    tableName: "طاولة 4",
    orderType: "dine_in",
    items: [{ name: "شاورما لحم", qty: 1, notes: "بدون بصل" }, { name: "بطاطس مقلية", qty: 1 }],
    status: "pending",
    elapsedMinutes: 4,
  },
  {
    id: "3",
    orderNumber: "ORD-00126",
    orderType: "takeaway",
    items: [{ name: "وافل نوتيلا", qty: 2 }, { name: "كابتشينو", qty: 1 }],
    status: "ready",
    elapsedMinutes: 18,
  },
];

const statusConfig = {
  pending: { label: "جديد", color: "bg-amber-500", next: "preparing" as KitchenStatus | null },
  preparing: { label: "قيد التحضير", color: "bg-blue-500", next: "ready" as KitchenStatus | null },
  ready: { label: "جاهز", color: "bg-emerald-500", next: null },
};

export default function KDSPage() {
  const [orders, setOrders] = useState(initialOrders);

  function advanceStatus(id: string) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = statusConfig[o.status].next;
        if (!next) return o;
        return { ...o, status: next };
      })
    );
  }

  function removeOrder(id: string) {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  const columns: KitchenStatus[] = ["pending", "preparing", "ready"];

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden">
      <div className="h-14 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <ChefHat className="w-6 h-6 text-brand-400" />
          <h1 className="text-xl font-bold">شاشة المطبخ · KDS</h1>
        </div>
        <div className="text-sm text-slate-400">{orders.length} طلبات نشطة</div>
      </div>
      <div className="flex-1 grid grid-cols-3 gap-4 p-4 overflow-hidden">
        {columns.map((status) => {
          const colOrders = orders.filter((o) => o.status === status);
          const config = statusConfig[status];
          return (
            <div key={status} className="flex flex-col overflow-hidden">
              <div className={cn("flex items-center gap-2 px-3 py-2 rounded-t-xl text-sm font-semibold", config.color)}>
                <span>{config.label}</span>
                <span className="bg-black/20 px-2 py-0.5 rounded-full text-xs">{colOrders.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pt-3">
                {colOrders.map((order) => (
                  <div
                    key={order.id}
                    className={cn(
                      "bg-slate-800 rounded-xl border border-slate-700 p-4",
                      order.elapsedMinutes > 15 && status !== "ready" && "border-rose-500/50"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-bold text-lg">{order.orderNumber}</div>
                        <div className="text-sm text-slate-400">
                          {order.tableName || (order.orderType === "takeaway" ? "سفري" : "توصيل")}
                        </div>
                      </div>
                      <div className={cn("flex items-center gap-1 text-xs px-2 py-1 rounded-full", order.elapsedMinutes > 15 ? "bg-rose-500/20 text-rose-300" : "bg-slate-700 text-slate-300")}>
                        <Clock className="w-3.5 h-3.5" />
                        {order.elapsedMinutes} د
                      </div>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {order.items.map((item, i) => (
                        <li key={i} className="flex items-baseline gap-2 text-sm">
                          <span className="font-bold text-brand-400">{item.qty}×</span>
                          <span>{item.name}</span>
                          {item.notes && <span className="text-amber-400 text-xs">({item.notes})</span>}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2">
                      {statusConfig[order.status].next ? (
                        <button onClick={() => advanceStatus(order.id)} className="flex-1 h-10 rounded-lg bg-brand-600 hover:bg-brand-500 text-sm font-medium transition flex items-center justify-center gap-1.5">
                          <Check className="w-4 h-4" />
                          {status === "pending" ? "بدء التحضير" : "جاهز للتسليم"}
                        </button>
                      ) : (
                        <button onClick={() => removeOrder(order.id)} className="flex-1 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-medium transition">
                          تم التسليم
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {colOrders.length === 0 && <div className="text-center text-slate-500 text-sm py-10">لا توجد طلبات</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
