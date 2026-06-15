import React from "react";
import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "outline" | "rose" | "ghost";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  rose:    "btn-rose",
  ghost:   "inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium transition-colors",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = clsx(variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <button className={classes} {...props}>{children}</button>;
}
