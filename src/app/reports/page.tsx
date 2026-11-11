"use client";

import { PageShell } from "@/components/layout/PageShell";
import { FileText, Download } from "lucide-react";

const reports = [
  { title: "تقرير المبيعات اليومية", desc: "ملخص مبيعات اليوم حسب المنتج والطريقة" },
  { title: "تقرير المبيعات الشهرية", desc: "مقارنة الأيام والأسابيع خلال الشهر" },
  { title: "تقرير الأرباح والخسائر", desc: "إيرادات ومصروفات وصافي الربح" },
  { title: "تقرير المخزون", desc: "الكميات الحالية والحركة والتنبيهات" },
  { title: "تقرير المنتجات الأكثر مبيعاً", desc: "ترتيب المنتجات حسب الكمية والإيراد" },
  { title: "تقرير طرق الدفع", desc: "نقدي / بطاقة / تحويل / مختلط" },
  { title: "تقرير الموظفين والورديات", desc: "أداء الكاشير والمبيعات حسب الموظف" },
  { title: "تقرير العملاء", desc: "الإنفاق ونقاط الولاء وأعلى العملاء" },
  { title: "تقرير الموردين والمشتريات", desc: "أوامر الشراء والأرصدة" },
  { title: "تقرير التوصيل", desc: "الطلبات والمندوبين والرسوم" },
  { title: "تقرير الهدر والتالف", desc: "الكميات المفقودة وتكلفتها" },
  { title: "تقرير تكلفة المنتجات", desc: "تكلفة الوصفة وهامش الربح لكل صنف" },
];

export default function ReportsPage() {
  return (
    <PageShell title="التقارير والتحليلات">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r) => (
          <div key={r.title} className="bg-white rounded-2xl border p-5 hover:border-brand-300 hover:shadow-md transition group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center"><FileText className="w-5 h-5" /></div>
              <button className="p-2 rounded-lg text-muted-foreground hover:bg-slate-100"><Download className="w-4 h-4" /></button>
            </div>
            <h3 className="font-semibold text-sm mb-1">{r.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
            <div className="flex gap-2 mt-4">
              <button className="text-xs px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 font-medium">عرض</button>
              <button className="text-xs px-3 py-1.5 rounded-lg border text-muted-foreground">PDF</button>
              <button className="text-xs px-3 py-1.5 rounded-lg border text-muted-foreground">Excel</button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
