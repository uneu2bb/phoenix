"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, Split, Pause, Printer, X, ChevronLeft, User, Table2 } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

const categories = [
  { id: "all", name: "الكل" },
  { id: "hot", name: "مشروبات ساخنة" },
  { id: "cold", name: "مشروبات باردة" },
  { id: "food", name: "وجبات" },
  { id: "desserts", name: "حلويات" },
];

const products = [
  { id: "1", name: "قهوة تركية", category: "hot", price: 3000 },
  { id: "2", name: "كابتشينو", category: "hot", price: 4500 },
  { id: "3", name: "لاتيه", category: "hot", price: 5000 },
  { id: "4", name: "شاي أخضر", category: "hot", price: 2500 },
  { id: "5", name: "عصير برتقال", category: "cold", price: 3000 },
  { id: "6", name: "ليموناضة", category: "cold", price: 2500 },
  { id: "7", name: "كبسة دجاج", category: "food", price: 15000 },
  { id: "8", name: "شاورما لحم", category: "food", price: 12000 },
  { id: "9", name: "برغر لحم", category: "food", price: 10000 },
  { id: "10", name: "وافل نوتيلا", category: "desserts", price: 6000 },
  { id: "11", name: "تشيز كيك", category: "desserts", price: 7000 },
  { id: "12", name: "آيس كريم", category: "desserts", price: 4000 },
];

type CartItem = { id: string; productId: string; name: string; price: number; qty: number };

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<"dine_in" | "takeaway" | "delivery">("dine_in");
  const [discount, setDiscount] = useState(0);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch = p.name.includes(search);
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  function addToCart(product: (typeof products)[0]) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) => (i.productId === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: crypto.randomUUID(), productId: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)).filter((i) => i.qty > 0)
    );
  }

  function removeItem(id: string) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setCart([]);
    setDiscount(0);
  }

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      <div className="h-14 bg-brand-900 text-white flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <a href="/dashboard" className="flex items-center gap-1 text-brand-200 hover:text-white text-sm">
            <ChevronLeft className="w-4 h-4" />
            العودة
          </a>
          <div className="h-6 w-px bg-brand-700" />
          <span className="font-semibold">Phoenix · الكاشير</span>
        </div>
        <div className="flex items-center gap-2">
          {(["dine_in", "takeaway", "delivery"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition",
                orderType === type ? "bg-brand-500 text-white" : "bg-brand-800 text-brand-200 hover:bg-brand-700"
              )}
            >
              {type === "dine_in" ? "طاولة" : type === "takeaway" ? "سفري" : "توصيل"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5 text-brand-200">
            <User className="w-4 h-4" />
            <span>كاشير 1</span>
          </div>
          <div className="flex items-center gap-1.5 text-brand-200">
            <Table2 className="w-4 h-4" />
            <span>طاولة —</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 bg-white border-b space-y-3">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن منتج..."
                className="w-full h-11 pr-11 pl-4 rounded-xl border border-input bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition",
                    activeCategory === cat.id ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="pos-product-grid">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-white rounded-xl border border-border p-3 flex flex-col items-center justify-center gap-2 hover:border-brand-400 hover:shadow-md transition active:scale-95 min-h-[120px]"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-lg font-bold">
                    {product.name.charAt(0)}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium leading-tight">{product.name}</div>
                    <div className="text-xs text-brand-600 font-semibold mt-1">{formatNumber(product.price)} ل.س</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[380px] bg-white border-r border-border flex flex-col shrink-0">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold">الطلب الحالي</h2>
            {cart.length > 0 && (
              <button onClick={clearCart} className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" />
                مسح الكل
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm">
                <p>لا توجد منتجات في الطلب</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{formatNumber(item.price)} × {item.qty}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-white border flex items-center justify-center hover:bg-slate-100">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg bg-white border flex items-center justify-center hover:bg-slate-100">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-sm font-semibold w-20 text-left">{formatNumber(item.price * item.qty)}</div>
                  <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-rose-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t p-4 space-y-3 bg-slate-50">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المجموع الفرعي</span>
                <span>{formatNumber(subtotal)} ل.س</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">خصم %</span>
                <input type="number" min={0} max={100} value={discount} onChange={(e) => setDiscount(Number(e.target.value) || 0)} className="w-16 h-7 text-center rounded border text-sm" />
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>قيمة الخصم</span>
                  <span>-{formatNumber(discountAmount)} ل.س</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>الإجمالي</span>
                <span className="text-brand-700">{formatNumber(total)} ل.س</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-2 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition">
                <Banknote className="w-5 h-5" />
                نقدي
              </button>
              <button className="flex items-center justify-center gap-2 h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition">
                <CreditCard className="w-5 h-5" />
                بطاقة
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center justify-center gap-1 h-12 rounded-xl border bg-white hover:bg-slate-50 text-xs font-medium">
                <Pause className="w-4 h-4" />
                تعليق
              </button>
              <button className="flex flex-col items-center justify-center gap-1 h-12 rounded-xl border bg-white hover:bg-slate-50 text-xs font-medium">
                <Split className="w-4 h-4" />
                تقسيم
              </button>
              <button className="flex flex-col items-center justify-center gap-1 h-12 rounded-xl border bg-white hover:bg-slate-50 text-xs font-medium">
                <Printer className="w-4 h-4" />
                طباعة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
