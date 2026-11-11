import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number | string,
  currency: string = "SYP",
  locale: string = "ar-SY"
): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "0";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    return `${num.toLocaleString(locale)} ${currency}`;
  }
}

export function formatNumber(value: number | string, locale = "ar-SY"): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0";
  return new Intl.NumberFormat(locale).format(num);
}

export function generateOrderNumber(prefix = "ORD"): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const time = now.getTime().toString().slice(-5);
  const rand = Math.floor(Math.random() * 90 + 10);
  return `${prefix}-${date}-${time}${rand}`;
}
