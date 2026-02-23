"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Container from "@/src/components/Main/Container";

interface Category {
  categoryId: number;
  categoryName: string;
  logoUrl: string;
}

interface Props {
  title: string;
  className?: string;
  mode?: "filter" | "display";
}

function CategorySkeleton() {
  return (
    <div className="min-w-[140px] flex-shrink-0">
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-200">
        <div className="w-10 h-10 skeleton rounded-full mb-3" />
        <div className="h-4 w-16 skeleton" />
      </div>
    </div>
  );
}

export default function CategorySection({
  title,
  className,
  mode = "display",
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  // ✅ Scroll Function
  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // ✅ Fetch Categories
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // ✅ Detect Scroll Position
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

  // ✅ Handle Filter Click
  const handleClick = (id: number) => {
    if (mode !== "filter") return;

    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory === String(id)) {
      params.delete("category");
    } else {
      params.set("category", id.toString());
    }

    router.replace(`/car?${params.toString()}`);
  };

  return (
    <section className={`bg-gray-100 relative ${className || ""}`}>
      <Container>
        <h2 className="text-4xl font-semibold mb-12">{title}</h2>

        <div className="relative">
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <CategorySkeleton key={i} />)
              : categories.map((cat, i) => {
              const isActive =
                mode === "filter" &&
                selectedCategory === String(cat.categoryId);

              return (
                <div
                  key={cat.categoryId}
                  className={`min-w-[140px] flex-shrink-0 animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}
                >
                  <div
                    onClick={() => handleClick(cat.categoryId)}
                    className={`
                      flex flex-col items-center justify-center
                      p-6 rounded-2xl border
                      transition duration-300
                      ${
                        isActive
                          ? "bg-gray-300 text-black border-gray-400 shadow-md"
                          : "border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
                      }
                      ${mode === "filter" ? "cursor-pointer" : ""}
                    `}
                  >
                    <img
                      src={cat.logoUrl}
                      alt={cat.categoryName}
                      className="w-10 h-10 object-contain mb-3"
                    />
                    <span className="text-sm font-medium">
                      {cat.categoryName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left Arrow */}
          {showLeftFade && (
            <button
              onClick={() => scroll("left")}
              className="
                absolute left-2 top-1/2 -translate-y-1/2
                bg-white/90 backdrop-blur
                shadow-xl rounded-full
                p-2
                hover:scale-110 active:scale-95
                transition
                z-20
              "
            >
              <MdChevronLeft size={24} />
            </button>
          )}

          {/* Right Arrow */}
          {showRightFade && (
            <button
              onClick={() => scroll("right")}
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                bg-white/90 backdrop-blur
                shadow-xl rounded-full
                p-2
                hover:scale-110 active:scale-95
                transition
                z-20
              "
            >
              <MdChevronRight size={24} />
            </button>
          )}

          {/* Fade Effects */}
          {showLeftFade && (
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-100 via-gray-100/70 to-transparent" />
          )}

          {showRightFade && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-100 via-gray-100/70 to-transparent" />
          )}
        </div>
      </Container>
    </section>
  );
}
