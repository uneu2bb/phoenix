"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Plus, Search, BookOpen, Edit2 } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const recipes = [
  { id: "1", product: "قهوة تركية", cost: 800, sellPrice: 3000, margin: 73, ingredients: [{ name: "بن مطحون", qty: 7, unit: "غ" }, { name: "سكر", qty: 5, unit: "غ" }, { name: "ماء", qty: 80, unit: "مل" }, { name: "كوب ورقي", qty: 1, unit: "قطعة" }] },
  { id: "2", product: "كابتشينو", cost: 1200, sellPrice: 4500, margin: 73, ingredients: [{ name: "إسبرسو", qty: 18, unit: "غ" }, { name: "حليب", qty: 120, unit: "مل" }, { name: "كوب ورقي", qty: 1, unit: "قطعة" }] },
  { id: "3", product: "كبسة دجاج", cost: 6500, sellPrice: 15000, margin: 57, ingredients: [{ name: "أرز بسمتي", qty: 200, unit: "غ" }, { name: "دجاج", qty: 250, unit: "غ" }, { name: "بهارات كبسة", qty: 10, unit: "غ" }] },
  { id: "4", product: "وافل نوتيلا", cost: 2100, sellPrice: 6000, margin: 65, ingredients: [{ name: "خليط وافل", qty: 80, unit: "غ" }, { name: "نوتيلا", qty: 30, unit: "غ" }] },
];

export default function RecipesPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(recipes[0]);
  const filtered = recipes.filter((r) => r.product.includes(search));

  return (
    <PageShell title="إدارة الوصفات" action={<button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium"><Plus className="w-4 h-4" />وصفة جديدة</button>}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="بحث..." className="w-full h-10 pr-10 pl-4 rounded-xl border bg-white text-sm" />
          </div>
          <div className="bg-white rounded-2xl border overflow-hidden">
            {filtered.map((r) => (
              <button key={r.id} onClick={() => setSelected(r)} className={`w-full text-right px-4 py-3 border-b last:border-0 hover:bg-slate-50 transition ${selected?.id === r.id ? "bg-brand-50 border-r-4 border-r-brand-600" : ""}`}>
                <div className="font-medium text-sm">{r.product}</div>
                <div className="text-xs text-muted-foreground mt-0.5">تكلفة {formatNumber(r.cost)} · هامش {r.margin}%</div>
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          {selected && (
            <div className="bg-white rounded-2xl border p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-brand-600 mb-1"><BookOpen className="w-5 h-5" /><span className="text-sm font-medium">وصفة المنتج</span></div>
                  <h2 className="text-2xl font-bold">{selected.product}</h2>
                </div>
                <button className="p-2 rounded-lg border hover:bg-slate-50"><Edit2 className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center"><div className="text-xs text-muted-foreground mb-1">التكلفة</div><div className="text-lg font-bold text-brand-700">{formatNumber(selected.cost)} ل.س</div></div>
                <div className="bg-slate-50 rounded-xl p-4 text-center"><div className="text-xs text-muted-foreground mb-1">سعر البيع</div><div className="text-lg font-bold">{formatNumber(selected.sellPrice)} ل.س</div></div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center"><div className="text-xs text-emerald-600 mb-1">هامش الربح</div><div className="text-lg font-bold text-emerald-700">{selected.margin}%</div></div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">المكونات</h3>
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-muted-foreground"><tr><th className="text-right px-3 py-2 font-medium">المادة</th><th className="text-right px-3 py-2 font-medium">الكمية</th><th className="text-right px-3 py-2 font-medium">الوحدة</th></tr></thead>
                  <tbody>{selected.ingredients.map((ing, i) => (<tr key={i} className="border-b last:border-0"><td className="px-3 py-2.5 font-medium">{ing.name}</td><td className="px-3 py-2.5">{ing.qty}</td><td className="px-3 py-2.5 text-muted-foreground">{ing.unit}</td></tr>))}</tbody>
                </table>
              </div>
              <p className="text-xs bg-amber-50 text-amber-800 rounded-lg p-3">عند بيع هذا المنتج يتم خصم المكونات تلقائياً من المخزون حسب الكميات أعلاه.</p>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
