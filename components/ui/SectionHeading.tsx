import clsx from "clsx";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  badge, title, subtitle, center = false, light = false
}: SectionHeadingProps) {
  return (
    <div className={clsx("mb-10 md:mb-14", center && "text-center")}>
      {badge && (
        <span className={clsx("badge mb-3", light ? "bg-white/20 text-white" : "badge-brand")}>
          {badge}
        </span>
      )}
      <h2 className={clsx("section-heading text-balance", light ? "text-white" : "text-neutral-900")}>
        {title}
      </h2>
      {subtitle && (
        <p className={clsx("section-sub mt-4 max-w-2xl", center && "mx-auto", light ? "text-white/70" : "text-neutral-500")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
