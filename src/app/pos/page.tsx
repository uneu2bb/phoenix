"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  Split,
  Pause,
  Printer,
  X,
  ChevronLeft,
  User,
  Table2,
  Gift,
  Percent,
  Play,
  Check,
  ArrowRightLeft,
  Bike,
  UtensilsCrossed,
  ShoppingBag,
} from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

const categories = [
  { id: "all", name: "الكل" },
  { id: "hot", name: "مشروبات ساخنة" },
  { id: "cold", name: "مشروبات باردة" },
  { id: "food", name: "وجبات" },
  { id: "desserts", name: "حلويات" },
  { id: "extras", name: "إضافات" },
];

const products = [
  { id: "1", name: "قهوة تركية", category: "hot", price: 3000 },
  { id: "2", name: "كابتشينو", category: "hot", price: 4500 },
  { id: "3", name: "لاتيه", category: "hot", price: 5000 },
  { id: "4", name: "شاي أخضر", category: "hot", price: 2500 },
  { id: "5", name: "إسبريسو", category: "hot", price: 3500 },
  { id: "6", name: "عصير برتقال", category: "cold", price: 3000 },
  { id: "7", name: "ليموناضة", category: "cold", price: 2500 },
  { id: "8", name: "آيس تي", category: "cold", price: 3500 },
  { id: "9", name: "موخيتو", category: "cold", price: 5000 },
  { id: "10", name: "كبسة دجاج", category: "food", price: 15000 },
  { id: "11", name: "شاورما لحم", category: "food", price: 12000 },
  { id: "12", name: "برغر لحم", category: "food", price: 10000 },
  { id: "13", name: "فتة حمص", category: "food", price: 8000 },
  { id: "14", name: "وافل نوتيلا", category: "desserts", price: 6000 },
  { id: "15", name: "تشيز كيك", category: "desserts", price: 7000 },
  { id: "16", name: "آيس كريم", category: "desserts", price: 4000 },
  { id: "17", name: "بطاطس مقلية", category: "extras", price: 3500 },
  { id: "18", name: "صلصة إضافية", category: "extras", price: 1000 },
];

const tables = [
  { id: "t1", name: "طاولة 1", seats: 4, status: "available" },
  { id: "t2", name: "طاولة 2", seats: 2, status: "occupied" },
  { id: "t3", name: "طاولة 3", seats: 6, status: "available" },
  { id: "t4", name: "طاولة 4", seats: 4, status: "available" },
  { id: "t5", name: "طاولة 5", seats: 8, status: "reserved" },
  { id: "t6", name: "طاولة 6", seats: 2, status: "available" },
  { id: "t7", name: "طاولة 7", seats: 4, status: "available" },
  { id: "t8", name: "طاولة 8", seats: 4, status: "dirty" },
];

type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  qty: number;
  notes?: string;
  complimentary?: boolean;
};

type HeldOrder = {
  id: string;
  label: string;
  cart: CartItem[];
  orderType: "dine_in" | "takeaway" | "delivery";
  tableId?: string;
  discountPct: number;
  discountFixed: number;
  heldAt: string;
};

type PayMethod = "cash" | "card" | "mixed";

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<"dine_in" | "takeaway" | "delivery">("dine_in");
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showTables, setShowTables] = useState(false);
  const [discountPct, setDiscountPct] = useState(0);
  const [discountFixed, setDiscountFixed] = useState(0);
  const [showDiscount, setShowDiscount] = useState(false);
  const [heldOrders, setHeldOrders] = useState<HeldOrder[]>([]);
  const [showHeld, setShowHeld] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [payMethod, setPayMethod] = useState<PayMethod>("cash");
  const [cashAmount, setCashAmount] = useState(0);
  const [cardAmount, setCardAmount] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastPaidTotal, setLastPaidTotal] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch = !search || p.name.includes(search);
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const subtotal = cart.reduce(
    (sum, i) => sum + (i.complimentary ? 0 : i.price * i.qty),
    0
  );
  const discountFromPct = (subtotal * discountPct) / 100;
  const totalDiscount = Math.min(subtotal, discountFromPct + discountFixed);
  const total = Math.max(0, subtotal - totalDiscount);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  function addToCart(product: (typeof products)[0]) {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === product.id && !i.complimentary && !i.notes
      );
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          productId: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
        },
      ];
    });
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function removeItem(id: string) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function toggleComplimentary(id: string) {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, complimentary: !i.complimentary } : i
      )
    );
  }

  function clearCart() {
    setCart([]);
    setDiscountPct(0);
    setDiscountFixed(0);
    setSelectedTable(null);
  }

  function holdOrder() {
    if (cart.length === 0) return;
    const label =
      orderType === "dine_in" && selectedTable
        ? tables.find((t) => t.id === selectedTable)?.name || "طلب معلق"
        : orderType === "takeaway"
        ? "سفري"
        : "توصيل";
    setHeldOrders((prev) => [
      {
        id: crypto.randomUUID(),
        label,
        cart: [...cart],
        orderType,
        tableId: selectedTable || undefined,
        discountPct,
        discountFixed,
        heldAt: new Date().toLocaleTimeString("ar-SY", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...prev,
    ]);
    clearCart();
    flash("تم تعليق الطلب");
  }

  function resumeOrder(order: HeldOrder) {
    setCart(order.cart);
    setOrderType(order.orderType);
    setSelectedTable(order.tableId || null);
    setDiscountPct(order.discountPct);
    setDiscountFixed(order.discountFixed);
    setHeldOrders((prev) => prev.filter((o) => o.id !== order.id));
    setShowHeld(false);
    flash("تم استرجاع الطلب");
  }

  function openPay(method: PayMethod) {
    if (cart.length === 0) return;
    setPayMethod(method);
    if (method === "cash") {
      setCashAmount(total);
      setCardAmount(0);
    } else if (method === "card") {
      setCashAmount(0);
      setCardAmount(total);
    } else {
      const half = Math.ceil(total / 2 / 1000) * 1000;
      setCashAmount(half);
      setCardAmount(total - half);
    }
    setShowPay(true);
  }

  function confirmPay() {
    setLastPaidTotal(total);
    setShowPay(false);
    setShowReceipt(true);
    clearCart();
    flash("تم الدفع بنجاح");
  }

  const paidSum = cashAmount + cardAmount;
  const change = Math.max(
    0,
    cashAmount - (payMethod === "cash" ? total : Math.max(0, total - cardAmount))
  );

  return (
    <div className="h-screen flex flex-col bg-[#0b1220] text-white overflow-hidden select-none">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 rounded-2xl bg-brand-500 text-white text-sm font-medium shadow-glow animate-fade-up">
          {toast}
        </div>
      )}

      <div className="h-14 bg-[#0a1219] border-b border-white/[0.06] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <a href="/dashboard" className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition">
            <ChevronLeft className="w-4 h-4" />
            العودة
          </a>
          <div className="h-5 w-px bg-white/10" />
          <span className="font-bold tracking-tight">
            Phoenix <span className="text-brand-400">POS</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl">
          {(
            [
              { id: "dine_in" as const, label: "طاولة", icon: UtensilsCrossed },
              { id: "takeaway" as const, label: "سفري", icon: ShoppingBag },
              { id: "delivery" as const, label: "توصيل", icon: Bike },
            ]
          ).map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setOrderType(t.id);
                  if (t.id !== "dine_in") setSelectedTable(null);
                }}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all",
                  orderType === t.id
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {orderType === "dine_in" && (
            <button
              onClick={() => setShowTables(true)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition",
                selectedTable
                  ? "bg-brand-600/20 border-brand-500/40 text-brand-300"
                  : "border-white/10 text-white/50 hover:bg-white/5"
              )}
            >
              <Table2 className="w-4 h-4" />
              {selectedTable
                ? tables.find((t) => t.id === selectedTable)?.name
                : "اختر طاولة"}
            </button>
          )}
          <button
            onClick={() => setShowHeld(true)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 border border-white/10 transition"
          >
            <Pause className="w-4 h-4" />
            معلق
            {heldOrders.length > 0 && (
              <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-gold-400 text-[#0a1219] text-[10px] font-bold flex items-center justify-center">
                {heldOrders.length}
              </span>
            )}
          </button>
          <div className="flex items-center gap-1.5 text-white/40 text-sm pr-1">
            <User className="w-4 h-4" />
            كاشير
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0">
          <div className="p-3 space-y-3 border-b border-white/[0.06] bg-[#0d1520]">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="بحث عن منتج..."
                className="w-full h-11 pr-10 pl-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-0.5">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={cn(
                    "shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                    activeCategory === c.id
                      ? "bg-brand-600 text-white shadow-md shadow-brand-600/25"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
              {filteredProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => addToCart(p)}
                  className="group relative bg-white/[0.04] hover:bg-brand-600/20 border border-white/[0.06] hover:border-brand-500/40 rounded-2xl p-4 text-right transition-all duration-200 active:scale-[0.97]"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 flex items-center justify-center mb-3">
                    <span className="text-lg font-bold text-brand-300">{p.name.charAt(0)}</span>
                  </div>
                  <div className="font-semibold text-sm leading-snug mb-1.5 line-clamp-2">{p.name}</div>
                  <div className="text-brand-400 font-bold text-sm">
                    {formatNumber(p.price)}
                    <span className="text-[10px] text-white/30 mr-1 font-normal">ل.س</span>
                  </div>
                  <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[380px] xl:w-[420px] border-r border-white/[0.06] flex flex-col bg-[#0a1219] shrink-0">
          <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div>
              <div className="font-bold text-sm">الطلب الحالي</div>
              <div className="text-[11px] text-white/35 mt-0.5">
                {itemCount} صنف
                {selectedTable && ` · ${tables.find((t) => t.id === selectedTable)?.name}`}
              </div>
            </div>
            {cart.length > 0 && (
              <button onClick={clearCart} className="text-xs text-rose-400 hover:text-rose-300 transition">
                مسح الكل
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-white/20 gap-3 px-6">
                <ShoppingBag className="w-14 h-14" />
                <p className="text-sm text-center">اضغط على منتج لإضافته للطلب</p>
              </div>
            ) : (
              <div className="p-3 space-y-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "rounded-xl border p-3 transition",
                      item.complimentary
                        ? "bg-gold-400/5 border-gold-400/20"
                        : "bg-white/[0.03] border-white/[0.06]"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate flex items-center gap-1.5">
                          {item.name}
                          {item.complimentary && (
                            <span className="text-[10px] bg-gold-400/20 text-gold-300 px-1.5 py-0.5 rounded-full">هدية</span>
                          )}
                        </div>
                        <div className="text-xs text-white/35 mt-0.5">{formatNumber(item.price)} ل.س</div>
                      </div>
                      <div className="font-bold text-sm text-brand-300 shrink-0">
                        {item.complimentary ? "0" : formatNumber(item.price * item.qty)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleComplimentary(item.id)}
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition",
                            item.complimentary
                              ? "bg-gold-400/20 text-gold-300"
                              : "bg-white/5 text-white/40 hover:text-gold-300"
                          )}
                        >
                          <Gift className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => removeItem(item.id)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-rose-500/20 text-white/40 hover:text-rose-400 flex items-center justify-center transition">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/[0.06] p-4 space-y-3 bg-[#080e16]">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-white/50">
                <span>المجموع الفرعي</span>
                <span>{formatNumber(subtotal)} ل.س</span>
              </div>
              {(discountPct > 0 || discountFixed > 0) && (
                <div className="flex justify-between text-rose-400">
                  <span>
                    خصم
                    {discountPct > 0 && ` ${discountPct}%`}
                    {discountFixed > 0 && ` + ${formatNumber(discountFixed)}`}
                  </span>
                  <span>-{formatNumber(totalDiscount)} ل.س</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold pt-2 border-t border-white/10">
                <span>الإجمالي</span>
                <span className="text-brand-400">{formatNumber(total)} ل.س</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => openPay("cash")} disabled={cart.length === 0} className="flex items-center justify-center gap-1.5 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold text-sm transition">
                <Banknote className="w-4 h-4" /> نقدي
              </button>
              <button onClick={() => openPay("card")} disabled={cart.length === 0} className="flex items-center justify-center gap-1.5 h-12 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-semibold text-sm transition">
                <CreditCard className="w-4 h-4" /> بطاقة
              </button>
              <button onClick={() => openPay("mixed")} disabled={cart.length === 0} className="flex items-center justify-center gap-1.5 h-12 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-semibold text-sm transition">
                <ArrowRightLeft className="w-4 h-4" /> مختلط
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => setShowDiscount(true)} disabled={cart.length === 0} className="flex flex-col items-center justify-center gap-1 h-14 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 text-[11px] font-medium text-white/60 hover:text-white transition">
                <Percent className="w-4 h-4" /> خصم
              </button>
              <button onClick={holdOrder} disabled={cart.length === 0} className="flex flex-col items-center justify-center gap-1 h-14 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 text-[11px] font-medium text-white/60 hover:text-white transition">
                <Pause className="w-4 h-4" /> تعليق
              </button>
              <button onClick={() => flash("استخدم الدفع المختلط لتقسيم الفاتورة")} disabled={cart.length === 0} className="flex flex-col items-center justify-center gap-1 h-14 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 text-[11px] font-medium text-white/60 hover:text-white transition">
                <Split className="w-4 h-4" /> تقسيم
              </button>
              <button onClick={() => { if (cart.length === 0) return; setLastPaidTotal(total); setShowReceipt(true); }} disabled={cart.length === 0} className="flex flex-col items-center justify-center gap-1 h-14 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 text-[11px] font-medium text-white/60 hover:text-white transition">
                <Printer className="w-4 h-4" /> طباعة
              </button>
            </div>
          </div>
        </div>
      </div>

      {showTables && (
        <Modal onClose={() => setShowTables(false)} title="اختيار الطاولة">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tables.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  if (t.status === "available" || t.status === "occupied") {
                    setSelectedTable(t.id);
                    setShowTables(false);
                  }
                }}
                disabled={t.status === "reserved" || t.status === "dirty"}
                className={cn(
                  "rounded-2xl border p-4 text-center transition-all",
                  selectedTable === t.id
                    ? "bg-brand-600 border-brand-500 text-white"
                    : t.status === "available"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                    : t.status === "occupied"
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                    : "bg-white/5 border-white/10 text-white/25 cursor-not-allowed"
                )}
              >
                <Table2 className="w-6 h-6 mx-auto mb-2 opacity-70" />
                <div className="font-bold text-sm">{t.name}</div>
                <div className="text-[11px] opacity-60 mt-0.5">
                  {t.seats} أشخاص · {t.status === "available" ? "متاحة" : t.status === "occupied" ? "مشغولة" : t.status === "reserved" ? "محجوزة" : "تنظيف"}
                </div>
              </button>
            ))}
          </div>
        </Modal>
      )}

      {showDiscount && (
        <Modal onClose={() => setShowDiscount(false)} title="تطبيق خصم">
          <div className="space-y-5">
            <div>
              <label className="text-sm text-white/50 mb-2 block">خصم بالنسبة %</label>
              <div className="flex gap-2">
                {[0, 5, 10, 15, 20].map((v) => (
                  <button key={v} onClick={() => setDiscountPct(v)} className={cn("flex-1 h-11 rounded-xl text-sm font-bold transition", discountPct === v ? "bg-brand-600 text-white" : "bg-white/5 text-white/50 hover:bg-white/10")}>
                    {v}%
                  </button>
                ))}
              </div>
              <input type="number" min={0} max={100} value={discountPct} onChange={(e) => setDiscountPct(Math.min(100, Number(e.target.value) || 0))} className="mt-2 w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40" />
            </div>
            <div>
              <label className="text-sm text-white/50 mb-2 block">خصم بمبلغ ثابت (ل.س)</label>
              <input type="number" min={0} value={discountFixed} onChange={(e) => setDiscountFixed(Math.max(0, Number(e.target.value) || 0))} className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40" />
            </div>
            <div className="flex justify-between text-sm bg-white/5 rounded-xl p-3">
              <span className="text-white/50">قيمة الخصم</span>
              <span className="font-bold text-rose-400">-{formatNumber(totalDiscount)} ل.س</span>
            </div>
            <button onClick={() => setShowDiscount(false)} className="w-full h-12 rounded-xl bg-brand-600 hover:bg-brand-500 font-semibold transition">تطبيق</button>
          </div>
        </Modal>
      )}

      {showHeld && (
        <Modal onClose={() => setShowHeld(false)} title="الطلبات المعلقة">
          {heldOrders.length === 0 ? (
            <div className="text-center py-10 text-white/30 text-sm">لا توجد طلبات معلقة</div>
          ) : (
            <div className="space-y-3">
              {heldOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div>
                    <div className="font-bold text-sm">{o.label}</div>
                    <div className="text-xs text-white/40 mt-0.5">
                      {o.cart.reduce((s, i) => s + i.qty, 0)} أصناف · {formatNumber(o.cart.reduce((s, i) => s + (i.complimentary ? 0 : i.price * i.qty), 0))} ل.س · {o.heldAt}
                    </div>
                  </div>
                  <button onClick={() => resumeOrder(o)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-sm font-medium transition">
                    <Play className="w-3.5 h-3.5" /> استرجاع
                  </button>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}

      {showPay && (
        <Modal onClose={() => setShowPay(false)} title={payMethod === "cash" ? "دفع نقدي" : payMethod === "card" ? "دفع بالبطاقة" : "دفع مختلط"}>
          <div className="space-y-4">
            <div className="text-center py-2">
              <div className="text-sm text-white/40 mb-1">المبلغ المطلوب</div>
              <div className="text-3xl font-bold text-brand-400">{formatNumber(total)} <span className="text-base text-white/30">ل.س</span></div>
            </div>
            {(payMethod === "cash" || payMethod === "mixed") && (
              <div>
                <label className="text-sm text-white/50 mb-2 flex items-center gap-1.5"><Banknote className="w-4 h-4" /> المبلغ النقدي</label>
                <input type="number" value={cashAmount || ""} onChange={(e) => setCashAmount(Number(e.target.value) || 0)} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
              </div>
            )}
            {(payMethod === "card" || payMethod === "mixed") && (
              <div>
                <label className="text-sm text-white/50 mb-2 flex items-center gap-1.5"><CreditCard className="w-4 h-4" /> مبلغ البطاقة</label>
                <input type="number" value={cardAmount || ""} onChange={(e) => setCardAmount(Number(e.target.value) || 0)} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/40" />
              </div>
            )}
            {payMethod === "cash" && cashAmount >= total && (
              <div className="flex justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-sm">
                <span className="text-emerald-300">الباقي للزبون</span>
                <span className="font-bold text-emerald-400">{formatNumber(change)} ل.س</span>
              </div>
            )}
            {payMethod === "mixed" && (
              <div className={cn("flex justify-between rounded-xl p-3 text-sm border", paidSum >= total ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-amber-500/10 border-amber-500/20 text-amber-300")}>
                <span>المجموع المدفوع</span>
                <span className="font-bold">{formatNumber(paidSum)} / {formatNumber(total)}</span>
              </div>
            )}
            <button
              onClick={confirmPay}
              disabled={payMethod === "cash" ? cashAmount < total : payMethod === "card" ? cardAmount < total : paidSum < total}
              className="w-full h-12 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 font-bold transition flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" /> تأكيد الدفع
            </button>
          </div>
        </Modal>
      )}

      {showReceipt && (
        <Modal onClose={() => setShowReceipt(false)} title="الفاتورة">
          <div className="bg-white text-slate-900 rounded-2xl p-6 font-mono text-sm max-w-xs mx-auto">
            <div className="text-center mb-4">
              <div className="font-bold text-lg">Phoenix POS</div>
              <div className="text-xs text-slate-500 mt-1">مطعم · دمشق</div>
              <div className="text-xs text-slate-400 mt-0.5">{new Date().toLocaleString("ar-SY")}</div>
            </div>
            <div className="border-t border-dashed border-slate-300 my-3" />
            <div className="text-center text-slate-500 text-xs mb-2">إجمالي المدفوع</div>
            <div className="text-center text-2xl font-bold mb-4">{formatNumber(lastPaidTotal)} ل.س</div>
            <div className="border-t border-dashed border-slate-300 my-3" />
            <div className="text-center text-xs text-slate-400">شكراً لزيارتكم</div>
          </div>
          <div className="flex gap-2 mt-5">
            <button onClick={() => { flash("تم إرسال الفاتورة للطابعة"); setShowReceipt(false); }} className="flex-1 h-12 rounded-xl bg-brand-600 hover:bg-brand-500 font-semibold flex items-center justify-center gap-2 transition">
              <Printer className="w-4 h-4" /> طباعة
            </button>
            <button onClick={() => setShowReceipt(false)} className="flex-1 h-12 rounded-xl bg-white/10 hover:bg-white/15 font-semibold transition">إغلاق</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#0f1824] border border-white/10 rounded-3xl shadow-elevated animate-scale-in max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 sticky top-0 bg-[#0f1824] rounded-t-3xl z-10">
          <h2 className="font-bold text-base">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
