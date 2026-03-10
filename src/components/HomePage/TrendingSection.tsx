"use client";

import Container from "@/src/components/Main/Container";
import { MdOutlineArrowOutward, MdChevronLeft, MdChevronRight } from "react-icons/md";
import Link from "next/link";
import LazyImage from "@/src/components/ui/LazyImage";
import { formatTHB } from "@/src/lib/format";
import { useHorizontalScroll } from "@/src/hooks/useHorizontalScroll";
import type { Car } from "@/src/types";

interface Props {
  cars: Car[];
}

export default function TrendingSection({ cars }: Props) {
  // ใช้ shared hook แทน scroll logic ที่ซ้ำซ้อน (เหมือน BrandSection / CategorySection)
  const { scrollRef, showLeftFade, showRightFade, scroll } = useHorizontalScroll(cars);

  return (
    <section className="pt-20">
      <Container>
        <h2 className="text-4xl font-semibold mb-12">Trending Models</h2>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {(cars || []).map((car) => (
              <Link
                key={car.carId}
                href={`/car/${car.carId}`}
                className={`min-w-[280px] h-[420px] block group`}
              >
                <div
                  className="
                    bg-gray-100 rounded-2xl
                    border border-gray-200
                    transition duration-300
                    hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]
                    overflow-hidden h-full
                    flex flex-col"
                >
                  <div className="h-48 overflow-hidden">
                    <LazyImage src={car.imageUrl} alt={car.carName} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="text-lg mb-2 h-[56px] leading-tight">
                      {car.carName} - {car.year}
                    </h4>

                    <div className="mt-auto flex justify-between items-center pt-8">
                      <p className="text-black font-bold">
                        {formatTHB(car.price)}
                      </p>

                      <span className="inline-flex items-center gap-1 text-blue-600 text-xs transition-colors duration-300 group-hover:text-blue-800">
                        View Details
                        <MdOutlineArrowOutward className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {showLeftFade && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-40 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition hover:scale-110 active:scale-95 z-20"
            >
              <MdChevronLeft size={26} />
            </button>
          )}

          {showRightFade && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-40 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition hover:scale-110 active:scale-95 z-20"
            >
              <MdChevronRight size={26} />
            </button>
          )}

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