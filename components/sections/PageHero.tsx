interface PageHeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

export default function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <div className="section-py bg-navy-800 text-white text-center">
      {badge && <span className="chip-white mb-4">{badge}</span>}
      {title && <h1 className="heading-section text-white mb-3">{title}</h1>}
      {subtitle && <p className="font-sans text-neutral-300 max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}