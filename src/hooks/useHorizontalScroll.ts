"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/**
 * Shared horizontal scroll hook — logic ที่ซ้ำกันระหว่าง BrandSection, CategorySection, TrendingSection
 * จัดการ: scroll left/right, fade indicators, scroll position detection
 */
export function useHorizontalScroll<T>(items: T[]) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftFade(scrollLeft > 0);
      setShowRightFade(scrollLeft + clientWidth < scrollWidth - 1);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [items]);

  return { scrollRef, showLeftFade, showRightFade, scroll };
}
