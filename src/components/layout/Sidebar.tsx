"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Table2,
  ChefHat,
  Package,
  BookOpen,
  Truck,
  Users,
  Wallet,
  FileText,
  Settings,
  Building2,
  UserCog,
  Receipt,
  Boxes,
  BarChart3,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const groups = [
  {
    title: "التشغيل",
    items: [
      { href: "/dashboard", label: "لوحة المعلومات", icon: LayoutDashboard },
      { href: "/pos", label: "الكاشير", icon: ShoppingCart },
      { href: "/tables", label: "الطاولات", icon: Table2 },
      { href: "/kds", label: "شاشة المطبخ", icon: ChefHat },
    ],
  },
  {
    title: "المخزون والمنتجات",
    items: [
      { href: "/products", label: "المنتجات", icon: Package },
      { href: "/recipes", label: "الوصفات", icon: BookOpen },
      { href: "/inventory", label: "المخزون", icon: Boxes },
      { href: "/purchases", label: "المشتريات", icon: Truck },
    ],
  },
  {
    title: "العملاء والتوصيل",
    items: [
      { href: "/customers", label: "العملاء", icon: Users },
      { href: "/delivery", label: "التوصيل", icon: Truck },
    ],
  },
  {
    title: "المالية والموظفين",
    items: [
      { href: "/employees", label: "الموظفين", icon: UserCog },
      { href: "/cashbox", label: "الخزينة", icon: Wallet },
      { href: "/expenses", label: "المصروفات", icon: Receipt },
      { href: "/accounting", label: "المحاسبة", icon: FileText },
      { href: "/reports", label: "التقارير", icon: BarChart3 },
    ],
  },
  {
    title: "النظام",
    items: [
      { href: "/branches", label: "الفروع", icon: Building2 },
      { href: "/settings", label: "الإعدادات", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 w-[272px] flex flex-col bg-[#0a1219] text-white border-l border-white/[0.06]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute bottom-32 -left-16 w-48 h-48 rounded-full bg-gold-500/5 blur-3xl" />
      </div>

      <div className="relative flex items-center gap-3 px-5 py-6 border-b border-white/[0.06]">
        <div className="relative">
          <div className="w-11 h-11 rounded-2xl premium-gradient flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -left-0.5 w-3.5 h-3.5 rounded-full bg-gold-400 border-2 border-[#0a1219]" />
        </div>
        <div>
          <div className="font-bold text-[17px] tracking-tight leading-none">Phoenix</div>
          <div className="text-[11px] text-white/40 mt-1 font-medium tracking-wide">POS & ERP System</div>
        </div>
      </div>

      <nav className="relative flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {groups.map((group) => (
          <div key={group.title}>
            <div className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30">
              {group.title}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200",
                      isActive
                        ? "bg-brand-600/90 text-white shadow-lg shadow-brand-600/20"
                        : "text-white/55 hover:text-white hover:bg-white/[0.06]"
                    )}
                  >
                    {isActive && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-gold-400" />
                    )}
                    <Icon
                      className={cn(
                        "w-[18px] h-[18px] shrink-0 transition-transform duration-200",
                        isActive ? "opacity-100" : "opacity-60 group-hover:opacity-90",
                        "group-hover:scale-105"
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="relative p-4 border-t border-white/[0.06]">
        <div className="mb-3 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-xs font-bold">
              م
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">مدير النظام</div>
              <div className="text-[11px] text-white/40 truncate">الفرع الرئيسي</div>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200">
          <LogOut className="w-[18px] h-[18px]" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
