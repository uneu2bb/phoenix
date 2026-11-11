# Phoenix POS & ERP

نظام نقاط بيع ومحاسبة متكامل للمطاعم والكافيهات ومحلات الحلويات.

**Phoenix** — POS + ERP + Inventory + Recipes + Delivery + Accounting

## المميزات

- كاشير احترافي (طاولة / سفري / توصيل)
- إدارة الطاولات + شاشة مطبخ (KDS)
- المنتجات والوصفات مع خصم تلقائي للمخزون
- مخزون متعدد المستودعات
- مشتريات وموردين
- محاسبة وخزينة
- موظفين ورواتب
- توصيل + CRM
- تقارير متقدمة
- عربي كامل RTL

## التقنيات

- Next.js 15 + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Recharts + Lucide

## التشغيل المحلي

```bash
npm install
cp .env.example .env
npx prisma generate
npm run dev
```

افتح http://localhost:3000

## الصفحات المتوفرة حالياً

| المسار | الوصف |
|--------|--------|
| `/` | الصفحة الرئيسية |
| `/dashboard` | لوحة المعلومات |
| `/pos` | شاشة الكاشير |
| `/tables` | إدارة الطاولات |
| `/kds` | شاشة المطبخ |
| `/products` | المنتجات |

## الترخيص

خاص — للاستخدام التجاري.
