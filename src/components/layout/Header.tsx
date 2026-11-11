"use client";

import { Bell, Search, Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";

export function Header({ title }: { title: string }) {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-brand-950/80 backdrop-blur border-b border-border flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
            online ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
          }`}
        >
          {online ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
          <span>{online ? "متصل" : "غير متصل"}</span>
        </div>
        <div className="relative hidden md:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="بحث سريع..."
            className="w-56 h-9 pr-9 pl-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-muted transition">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 left-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-medium">
            م
          </div>
          <div className="hidden sm:block text-sm">
            <div className="font-medium">مدير النظام</div>
            <div className="text-xs text-muted-foreground">الفرع الرئيسي</div>
          </div>
        </div>
      </div>
    </header>
  );
}
