"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Settings, Users, Shield, Bell, Printer, Globe } from "lucide-react";

const sections = [
  { icon: Settings, title: "إعدادات عامة", desc: "اسم المنشأة، العملة، المنطقة الزمنية، الضريبة" },
  { icon: Users, title: "المستخدمون", desc: "حسابات الدخول وإدارة الأدوار" },
  { icon: Shield, title: "الصلاحيات", desc: "تحديد ما يمكن لكل دور الوصول إليه" },
  { icon: Bell, title: "التنبيهات", desc: "نقص المخزون، ارتفاع التكلفة، الطلبات المتأخرة" },
  { icon: Printer, title: "الطابعات", desc: "ربط الطابعات الحرارية للفواتير والمطبخ" },
  { icon: Globe, title: "اللغة والمظهر", desc: "عربي / إنجليزي، الوضع الليلي، الألوان" },
];

export default function SettingsPage() {
  return (
    <PageShell title="الإعدادات">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <button key={s.title} className="bg-white rounded-2xl border p-5 text-right hover:border-brand-300 hover:shadow-md transition group">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3 group-hover:bg-brand-100 transition"><Icon className="w-5 h-5" /></div>
              <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </button>
          );
        })}
      </div>
    </PageShell>
  );
}
