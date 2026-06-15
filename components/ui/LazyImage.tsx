import Image, { ImageProps } from "next/image";

interface LazyImageProps extends Omit<ImageProps, "loading"> {
  eager?: boolean; // set true only for above-fold images
}

/**
 * LazyImage — next/image wrapper with:
 * - lazy loading by default (eager only for LCP/hero images)
 * - blur-up placeholder
 * - WebP/AVIF served automatically by Next.js
 */
export default function LazyImage({ eager = false, alt, ...props }: LazyImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      placeholder="blur"
      blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f0f7f4'/%3E%3C/svg%3E"
    />
  );
}
