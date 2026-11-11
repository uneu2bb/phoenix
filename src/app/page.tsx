import Link from "next/link";
import { ArrowLeft, LayoutDashboard, ShoppingCart, Sparkles, Boxes, ChefHat } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#060b12] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-500/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-sky-500/8 rounded-full blur-[80px]" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl premium-gradient shadow-glow mb-8 glow-brand">
            <Sparkles className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight">
            Phoenix
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-gold-300 to-gold-500 mr-2"> POS</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            نظام نقاط البيع والمحاسبة المتكامل لإدارة المطاعم والكافيهات ومحلات الحلويات
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-white/35">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">POS</span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">ERP</span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">مخزون ذكي</span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">وصفات</span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">توصيل</span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">محاسبة</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-16">
          {[
            {
              icon: ShoppingCart,
              title: "كاشير سريع",
              desc: "شاشة بيع احترافية للطاولات والسفري والتوصيل مع دعم اللمس والطباعة الحرارية",
              color: "from-brand-500 to-brand-700",
            },
            {
              icon: LayoutDashboard,
              title: "لوحة تحكم شاملة",
              desc: "مبيعات، مخزون، وصفات، محاسبة، موظفين، تقارير لحظية لجميع الفروع",
              color: "from-gold-400 to-gold-600",
            },
            {
              icon: Boxes,
              title: "وصفات ومخزون ذكي",
              desc: "خصم تلقائي للمواد الخام عند البيع + تنبيهات نقص وتكلفة + جرد متعدد المستودعات",
              color: "from-sky-500 to-sky-700",
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative bg-white/[0.03] backdrop-blur border border-white/[0.08] rounded-3xl p-6 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.35s" }}>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2.5 bg-brand-500 hover:bg-brand-400 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-lg shadow-brand-500/30 hover:shadow-brand-400/40 active:scale-[0.98]"
          >
            الدخول إلى لوحة التحكم
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link
            href="/pos"
            className="inline-flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200 active:scale-[0.98]"
          >
            <ChefHat className="w-5 h-5" />
            فتح شاشة الكاشير
          </Link>
        </div>

        <p className="text-center text-white/25 text-sm mt-20">
          نظام Phoenix — جاهز للاستخدام التجاري · دعم عربي كامل RTL · قابل للتوسع
        </p>
      </div>
    </div>
  );
}
