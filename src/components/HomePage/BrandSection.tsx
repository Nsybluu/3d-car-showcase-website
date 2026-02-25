"use client";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Container from "@/src/components/Main/Container";
import type { Brand } from "@/src/types";
import { useHorizontalScroll } from "@/src/hooks/useHorizontalScroll";

interface Props {
  title: string;
  brands: Brand[];
  className?: string;
  background?: string;
  onSelect?: (id: number) => void;
  selectedId?: number | null;
  mode?: "filter" | "display";
}

export default function BrandSection({
  title,
  brands,
  className,
  background,
  mode = "display",
  onSelect,
  selectedId,
}: Props) {
  const { scrollRef, showLeftFade, showRightFade, scroll } = useHorizontalScroll(brands);

  const handleClick = (id: number) => {
    if (mode !== "filter") return;
    if (onSelect) onSelect(id);
  };

  return (
    <section
      className={`py-24 relative ${background || ""} ${className || ""}`}
    >
      <Container>
        <h2 className="text-4xl font-semibold tracking-tight mb-14">{title}</h2>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {brands.map((brand) => {
              const isActive =
                mode === "filter" && selectedId === brand.brandId;

              return (
                <div
                  key={brand.brandId}
                  className={`min-w-[140px] flex-shrink-0`}
                >
                  <div
                    onClick={() => handleClick(brand.brandId)}
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
                        src={brand.logoUrl}
                        alt={brand.brandName}
                        className="max-h-10 max-w-full object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {brand.brandName}
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
