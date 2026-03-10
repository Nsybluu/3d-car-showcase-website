"use client";

import { useState } from "react";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  sizes?: string;
}

/**
 * Shared lazy-loading image component with skeleton placeholder.
 * Uses next/image for automatic WebP/AVIF, responsive srcset, and optimization.
 */
export default function LazyImage({
  src,
  alt,
  className = "w-full h-full object-cover",
  loading = "lazy",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  // Derived state: reset loaded when src changes (no useEffect needed)
  if (prevSrc !== src) {
    setPrevSrc(src);
    setLoaded(false);
  }

  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 skeleton" />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={priority ? undefined : loading}
        priority={priority}
        className={`transition duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
