"use client";

import { Bell, Search, Wifi, WifiOff, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export function Header({ title }: { title: string }) {
  const [online, setOnline] = useState(true);
  const [dark, setDark] = useState(false);

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

  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-30 h-16 glass-strong border-b border-border/60 flex items-center justify-between px-6">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full transition-colors ${
            online
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-rose-500/10 text-rose-600"
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
            className="w-52 h-9 pr-9 pl-3 rounded-xl border border-border/80 bg-white/60 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/25 focus:border-brand-400/50 placeholder:text-muted-foreground/70 transition-all duration-200"
          />
        </div>

        <button
          onClick={toggleDark}
          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200"
          aria-label="تبديل الوضع"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 left-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-[#0a1219]" />
        </button>

        <div className="flex items-center gap-2.5 pr-1 border-r border-border/60 mr-1">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white flex items-center justify-center text-sm font-bold shadow-soft">
            م
          </div>
          <div className="hidden sm:block text-sm leading-tight">
            <div className="font-semibold text-foreground">مدير النظام</div>
            <div className="text-[11px] text-muted-foreground">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
