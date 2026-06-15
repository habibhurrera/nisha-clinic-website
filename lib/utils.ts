import clsx, { ClassValue } from "clsx";

/** Merge Tailwind class names safely */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format a phone number for tel: links */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

/** Format a phone number for WhatsApp */
export function waHref(phone: string, message = "") {
  const num = phone.replace(/[^+\d]/g, "").replace(/^\+/, "");
  return `https://wa.me/${num}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
