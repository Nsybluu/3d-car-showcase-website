"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/src/components/Main/Container";

interface Brand {
  brandId: number;
  brandName: string;
  logoUrl: string;
}

interface Props {
  title: string;
  className?: string;
  background?: string;
  mode?: "filter" | "display";
}

export default function BrandSection({
  title,
  className,
  background,
  mode = "display",
}: Props) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  // 🔥 สำหรับ filter mode
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedBrand = searchParams.get("brand");

  useEffect(() => {
    fetch("/api/brand")
      .then((res) => res.json())
      .then((data) => setBrands(data));
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
  }, [brands]);

  // 🔥 handle click เฉพาะ filter mode
  const handleClick = (id: number) => {
    if (mode !== "filter") return;

    const params = new URLSearchParams(searchParams.toString());

    if (selectedBrand === String(id)) {
      params.delete("brand"); // toggle off
    } else {
      params.set("brand", id.toString());
    }

    router.replace(`/car?${params.toString()}`, {});
  };

  return (
    <section className={`relative ${background || ""} ${className || ""}`}>
      <Container>
        <h2 className="text-4xl font-semibold mb-12">{title}</h2>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {brands.map((brand) => {
              const isActive =
                mode === "filter" && selectedBrand === String(brand.brandId);

              return (
                <div
                  key={brand.brandId}
                  className="min-w-[140px] flex-shrink-0"
                >
                  <div
                    onClick={() => handleClick(brand.brandId)}
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
                      src={brand.logoUrl}
                      alt={brand.brandName}
                      className="h-12 object-contain mb-3"
                    />
                    <span className="text-sm font-medium">
                      {brand.brandName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {showLeftFade && (
            <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-gray-100 to-transparent" />
          )}

          {showRightFade && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-gray-100 to-transparent" />
          )}
        </div>
      </Container>
    </section>
  );
}
