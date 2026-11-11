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
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "لوحة المعلومات", icon: LayoutDashboard },
  { href: "/pos", label: "الكاشير", icon: ShoppingCart },
  { href: "/tables", label: "الطاولات", icon: Table2 },
  { href: "/kds", label: "شاشة المطبخ", icon: ChefHat },
  { href: "/products", label: "المنتجات", icon: Package },
  { href: "/recipes", label: "الوصفات", icon: BookOpen },
  { href: "/inventory", label: "المخزون", icon: Boxes },
  { href: "/purchases", label: "المشتريات", icon: Truck },
  { href: "/customers", label: "العملاء", icon: Users },
  { href: "/delivery", label: "التوصيل", icon: Truck },
  { href: "/employees", label: "الموظفين", icon: UserCog },
  { href: "/cashbox", label: "الخزينة", icon: Wallet },
  { href: "/expenses", label: "المصروفات", icon: Receipt },
  { href: "/accounting", label: "المحاسبة", icon: FileText },
  { href: "/reports", label: "التقارير", icon: BarChart3 },
  { href: "/branches", label: "الفروع", icon: Building2 },
  { href: "/settings", label: "الإعدادات", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 w-64 bg-brand-950 text-white border-l border-brand-800 flex flex-col">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-brand-800">
        <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-lg">
          P
        </div>
        <div>
          <div className="font-bold text-lg leading-tight">Phoenix</div>
          <div className="text-xs text-brand-300">Phoenix POS & ERP</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-brand-100 hover:bg-brand-900 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5 shrink-0 opacity-80" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-brand-800">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-brand-200 hover:bg-brand-900 hover:text-white transition">
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
