import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "rose" | "neutral";
}

export default function Badge({ children, variant = "brand" }: BadgeProps) {
  return (
    <span className={clsx(
      "badge",
      variant === "brand"   && "badge-brand",
      variant === "rose"    && "badge-rose",
      variant === "neutral" && "bg-neutral-100 text-neutral-600",
    )}>
      {children}
    </span>
  );
}
