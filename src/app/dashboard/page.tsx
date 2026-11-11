import { Header } from "@/components/layout/Header";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  { title: "مبيعات اليوم", value: "2,450,000", unit: "ل.س", change: "+12.5%", positive: true, icon: DollarSign, color: "bg-emerald-50 text-emerald-600" },
  { title: "عدد الطلبات", value: "148", unit: "طلب", change: "+8.2%", positive: true, icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
  { title: "متوسط الطلب", value: "16,554", unit: "ل.س", change: "+3.1%", positive: true, icon: TrendingUp, color: "bg-violet-50 text-violet-600" },
  { title: "منتجات منخفضة", value: "7", unit: "صنف", change: "تنبيه", positive: false, icon: AlertTriangle, color: "bg-amber-50 text-amber-600" },
];

const topProducts = [
  { name: "قهوة تركية", qty: 86, revenue: "258,000" },
  { name: "كبسة دجاج", qty: 42, revenue: "630,000" },
  { name: "عصير برتقال", qty: 71, revenue: "213,000" },
  { name: "شاورما لحم", qty: 38, revenue: "456,000" },
  { name: "وافل نوتيلا", qty: 29, revenue: "174,000" },
];

export default function DashboardPage() {
  return (
    <>
      <Header title="لوحة المعلومات" />
      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white dark:bg-brand-900 rounded-2xl border border-border p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold tracking-tight">
                      {stat.value}
                      <span className="text-sm font-normal text-muted-foreground mr-1">{stat.unit}</span>
                    </p>
                  </div>
                  <div className={`p-2.5 rounded-xl ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs">
                  {stat.positive ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 text-amber-500" />
                  )}
                  <span className={stat.positive ? "text-emerald-600" : "text-amber-600"}>{stat.change}</span>
                  <span className="text-muted-foreground">مقارنة بالأمس</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-brand-900 rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">مبيعات آخر 7 أيام</h2>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {[65, 40, 80, 55, 90, 70, 85].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-400" style={{ height: `${h}%` }} />
                  <span className="text-xs text-muted-foreground">{["س", "أ", "ث", "أ", "خ", "ج", "س"][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-brand-900 rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-5">الأكثر مبيعاً اليوم</h2>
            <div className="space-y-4">
              {topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center text-sm font-bold">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.qty} قطعة</div>
                  </div>
                  <div className="text-sm font-semibold text-brand-700">{p.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/pos" className="flex flex-col items-center justify-center gap-2 p-6 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl transition shadow-lg">
            <ShoppingBag className="w-8 h-8" />
            <span className="font-medium">فتح الكاشير</span>
          </a>
          <a href="/products" className="flex flex-col items-center justify-center gap-2 p-6 bg-white border border-border hover:border-brand-300 rounded-2xl transition">
            <Package className="w-8 h-8 text-brand-600" />
            <span className="font-medium">المنتجات</span>
          </a>
          <a href="/tables" className="flex flex-col items-center justify-center gap-2 p-6 bg-white border border-border hover:border-brand-300 rounded-2xl transition">
            <TrendingUp className="w-8 h-8 text-brand-600" />
            <span className="font-medium">الطاولات</span>
          </a>
          <a href="/kds" className="flex flex-col items-center justify-center gap-2 p-6 bg-white border border-border hover:border-brand-300 rounded-2xl transition">
            <Users className="w-8 h-8 text-brand-600" />
            <span className="font-medium">المطبخ</span>
          </a>
        </div>
      </main>
    </>
  );
}
