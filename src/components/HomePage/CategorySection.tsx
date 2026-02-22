"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function CategorySection({
  title,
  className,
  mode = "display",
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  // 🔥 สำหรับ filter mode
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
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
  }, [categories]);

  // 🔥 handle click เฉพาะ filter mode
  const handleClick = (id: number) => {
    if (mode !== "filter") return;

    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory === String(id)) {
      params.delete("category"); // toggle off
    } else {
      params.set("category", id.toString());
    }

    router.replace(`/car?${params.toString()}`, {});
  };

  return (
    <section className={`bg-gray-100 relative ${className || ""}`}>
      <Container>
        <h2 className="text-4xl font-semibold mb-12">{title}</h2>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {categories.map((cat) => {
              const isActive =
                mode === "filter" &&
                selectedCategory === String(cat.categoryId);

              return (
                <div
                  key={cat.categoryId}
                  className="min-w-[140px] flex-shrink-0"
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
                      className="w-10 h-10 mb-3"
                    />
                    <span className="text-sm font-medium">
                      {cat.categoryName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {showLeftFade && (
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-100 via-gray-100/70 to-transparent transition-opacity duration-300" />
          )}

          {showRightFade && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-100 via-gray-100/70 to-transparent transition-opacity duration-300" />
          )}
        </div>
      </Container>
    </section>
  );
}
