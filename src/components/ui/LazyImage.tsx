"use client";

import { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

/**
 * Shared lazy-loading image component with skeleton placeholder.
 * แทนที่ CarImage ที่ซ้ำกัน 3 ที่
 */
export default function LazyImage({
  src,
  alt,
  className = "w-full h-full object-cover",
  loading = "lazy",
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
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`transition duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
