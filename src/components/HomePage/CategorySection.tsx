"use client";

import { useRef, useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Container from "@/src/components/Main/Container";

interface Category {
  categoryId: number;
  categoryName: string;
  logoUrl: string;
}

interface Props {
  title: string;
  categories: Category[];
  className?: string;
  mode?: "filter" | "display";
  onSelect?: (id: number) => void; // ⭐ เพิ่ม
  selectedId?: number | null; // ⭐ เพิ่ม
}

export default function CategorySection({
  title,
  categories,
  className,
  mode = "display",
  onSelect,
  selectedId,
}: Props) {
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  // 🔥 Scroll
  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // 🔥 Detect Scroll Position
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
  }, [categories]);

  // 🔥 Filter Click
  const handleClick = (id: number) => {
    if (mode !== "filter") return;

    if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <section className={`bg-gray-100 py-24 relative ${className || ""}`}>
      <Container>
        <h2 className="text-4xl font-semibold tracking-tight mb-14">{title}</h2>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {(categories || []).map((cat) => {
              const isActive =
                mode === "filter" && selectedId === cat.categoryId;

              return (
                <div
                  key={cat.categoryId}
                  className="min-w-[140px] flex-shrink-0"
                >
                  <div
                    onClick={() => handleClick(cat.categoryId)}
                    className={`
                      flex flex-col items-center justify-center
                      p-6 rounded-2xl
                      border transition-all duration-300
                      ${
                        isActive
                          ? "bg-gray-300 text-black border-gray-400 shadow-md"
                          : "border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
                      }
                      ${mode === "filter" ? "cursor-pointer" : "cursor-default"}
                    `}
                  >
                    <div className="h-16 w-24 flex items-center justify-center mb-3">
                      <img
                        src={cat.logoUrl}
                        alt={cat.categoryName}
                        className="max-h-10 max-w-full object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {cat.categoryName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrows */}
          {showLeftFade && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur shadow-2xl rounded-full p-2 hover:scale-110 active:scale-95 transition-all duration-300 z-20"
            >
              <MdChevronLeft size={24} />
            </button>
          )}

          {showRightFade && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur shadow-2xl rounded-full p-2 hover:scale-110 active:scale-95 transition-all duration-300 z-20"
            >
              <MdChevronRight size={24} />
            </button>
          )}

          {/* Fade */}
          {showLeftFade && (
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-100 via-gray-100/80 to-transparent" />
          )}

          {showRightFade && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-100 via-gray-100/80 to-transparent" />
          )}
        </div>
      </Container>
    </section>
  );
}
