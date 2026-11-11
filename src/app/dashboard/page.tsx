"use client";

import { Header } from "@/components/layout/Header";
import {
  TrendingUp,
  ShoppingBag,
  AlertTriangle,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ChefHat,
} from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

const stats = [
  {
    title: "مبيعات اليوم",
    value: "2,450,000",
    unit: "ل.س",
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
    accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-600",
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "عدد الطلبات",
    value: "148",
    unit: "طلب",
    change: "+8.2%",
    positive: true,
    icon: ShoppingBag,
    accent: "from-sky-500/15 to-sky-500/5 text-sky-600",
    iconBg: "bg-sky-500/10 text-sky-600",
  },
  {
    title: "متوسط الطلب",
    value: "16,554",
    unit: "ل.س",
    change: "+3.1%",
    positive: true,
    icon: TrendingUp,
    accent: "from-violet-500/15 to-violet-500/5 text-violet-600",
    iconBg: "bg-violet-500/10 text-violet-600",
  },
  {
    title: "منتجات منخفضة",
    value: "7",
    unit: "صنف",
    change: "تنبيه",
    positive: false,
    icon: AlertTriangle,
    accent: "from-amber-500/15 to-amber-500/5 text-amber-600",
    iconBg: "bg-amber-500/10 text-amber-600",
  },
];

const topProducts = [
  { name: "قهوة تركية", qty: 86, revenue: 258000 },
  { name: "كبسة دجاج", qty: 42, revenue: 630000 },
  { name: "عصير برتقال", qty: 71, revenue: 213000 },
  { name: "شاورما لحم", qty: 38, revenue: 456000 },
  { name: "وافل نوتيلا", qty: 29, revenue: 174000 },
];

const recentOrders = [
  { id: "#1842", type: "صالة", total: 45000, status: "مكتمل", time: "منذ 2 د" },
  { id: "#1841", type: "توصيل", total: 72000, status: "قيد التحضير", time: "منذ 5 د" },
  { id: "#1840", type: "سفري", total: 28000, status: "مكتمل", time: "منذ 8 د" },
  { id: "#1839", type: "صالة", total: 95000, status: "قيد التحضير", time: "منذ 12 د" },
  { id: "#1838", type: "توصيل", total: 34000, status: "مكتمل", time: "منذ 18 د" },
];

export default function DashboardPage() {
  return (
    <>
      <Header title="لوحة المعلومات" />
      <main className="flex-1 p-6 space-y-6 bg-mesh min-h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className={cn("premium-card p-5 relative overflow-hidden animate-fade-up", `stagger-${i + 1}`)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-60 pointer-events-none`} />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1.5">{stat.title}</p>
                    <p className="text-2xl font-bold tracking-tight">
                      {stat.value}
                      <span className="text-sm font-normal text-muted-foreground mr-1.5">{stat.unit}</span>
                    </p>
                    <div className={cn("inline-flex items-center gap-0.5 text-xs font-semibold mt-2", stat.positive ? "text-emerald-600" : "text-amber-600")}>
                      {stat.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center", stat.iconBg)}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 premium-card p-6 animate-fade-up stagger-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-base">الأكثر مبيعاً اليوم</h2>
              <span className="text-xs text-muted-foreground">آخر 24 ساعة</span>
            </div>
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center text-xs font-bold">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.qty} قطعة</div>
                  </div>
                  <div className="text-sm font-bold text-brand-700">{formatNumber(p.revenue)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 premium-card p-6 animate-fade-up stagger-3">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-base">آخر الطلبات</h2>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                مباشر
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b border-border/60">
                    <th className="text-right font-medium pb-3 px-2">الطلب</th>
                    <th className="text-right font-medium pb-3 px-2">النوع</th>
                    <th className="text-right font-medium pb-3 px-2">المبلغ</th>
                    <th className="text-right font-medium pb-3 px-2">الحالة</th>
                    <th className="text-right font-medium pb-3 px-2">الوقت</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2 font-semibold text-brand-700">{o.id}</td>
                      <td className="py-3 px-2 text-muted-foreground">{o.type}</td>
                      <td className="py-3 px-2 font-medium">{formatNumber(o.total)} ل.س</td>
                      <td className="py-3 px-2">
                        <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", o.status === "مكتمل" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground text-xs">{o.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 animate-fade-up stagger-4">
          <a href="/pos" className="premium-card p-5 flex items-center gap-4 hover:border-brand-300 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold">فتح الكاشير</div>
              <div className="text-xs text-muted-foreground mt-0.5">بدء طلب جديد</div>
            </div>
          </a>
          <a href="/kds" className="premium-card p-5 flex items-center gap-4 hover:border-brand-300 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold">شاشة المطبخ</div>
              <div className="text-xs text-muted-foreground mt-0.5">متابعة الطلبات</div>
            </div>
          </a>
          <a href="/reports" className="premium-card p-5 flex items-center gap-4 hover:border-brand-300 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold">التقارير</div>
              <div className="text-xs text-muted-foreground mt-0.5">تحليل الأداء</div>
            </div>
          </a>
        </div>
      </main>
    </>
  );
}
