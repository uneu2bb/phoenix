"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Plus, Building2, MapPin } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const branches = [
  { id: "1", name: "الفرع الرئيسي", city: "دمشق - المزة", sales: 8500000, orders: 420, employees: 12 },
  { id: "2", name: "فرع أبو رمانة", city: "دمشق - أبو رمانة", sales: 5200000, orders: 280, employees: 8 },
  { id: "3", name: "فرع حلب", city: "حلب - الفرقان", sales: 3100000, orders: 165, employees: 6 },
];

export default function BranchesPage() {
  return (
    <PageShell title="إدارة الفروع" action={<button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium"><Plus className="w-4 h-4" />فرع جديد</button>}>
      <div className="grid md:grid-cols-3 gap-6">
        {branches.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl border p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center"><Building2 className="w-6 h-6" /></div>
                <div><div className="font-bold">{b.name}</div><div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{b.city}</div></div>
              </div>
              <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">نشط</span>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2 border-t">
              <div className="text-center"><div className="text-lg font-bold text-brand-700">{formatNumber(b.sales)}</div><div className="text-[10px] text-muted-foreground">مبيعات الشهر</div></div>
              <div className="text-center"><div className="text-lg font-bold">{b.orders}</div><div className="text-[10px] text-muted-foreground">طلبات</div></div>
              <div className="text-center"><div className="text-lg font-bold">{b.employees}</div><div className="text-[10px] text-muted-foreground">موظفين</div></div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
