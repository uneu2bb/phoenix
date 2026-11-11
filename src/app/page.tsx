import Link from "next/link";
import { ArrowLeft, LayoutDashboard, ShoppingCart, Utensils } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-600/30 border border-brand-500/40 mb-6">
            <Utensils className="w-10 h-10 text-brand-300" />
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Phoenix <span className="text-gold-400">POS</span>
          </h1>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed">
            نظام نقاط البيع والمحاسبة المتكامل لإدارة المطاعم والكافيهات ومحلات الحلويات
          </p>
          <p className="mt-3 text-brand-300 text-sm">
            POS + ERP + Inventory + Recipes + Delivery + Accounting
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <ShoppingCart className="w-10 h-10 text-brand-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">كاشير سريع</h3>
            <p className="text-brand-200 text-sm leading-relaxed">
              شاشة بيع احترافية للطاولات والسفري والتوصيل مع دعم اللمس
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <LayoutDashboard className="w-10 h-10 text-gold-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">لوحة تحكم شاملة</h3>
            <p className="text-brand-200 text-sm leading-relaxed">
              مبيعات، مخزون، وصفات، محاسبة، موظفين، تقارير لحظية
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <Utensils className="w-10 h-10 text-brand-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">وصفات ومخزون ذكي</h3>
            <p className="text-brand-200 text-sm leading-relaxed">
              خصم تلقائي للمواد الخام عند البيع + تنبيهات نقص وتكلفة
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-medium px-8 py-3.5 rounded-xl transition shadow-lg"
          >
            الدخول إلى لوحة التحكم
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link
            href="/pos"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-8 py-3.5 rounded-xl transition"
          >
            فتح شاشة الكاشير
          </Link>
        </div>
        <p className="text-center text-brand-400 text-sm mt-16">
          Phoenix — جاهز للاستخدام التجاري · دعم عربي كامل RTL
        </p>
      </div>
    </div>
  );
}
