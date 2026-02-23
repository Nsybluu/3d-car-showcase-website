"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/src/components/Main/Container";
import {
  MdOutlineArrowOutward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import Link from "next/link";

function CardSkeleton() {
  return (
    <div className="min-w-[280px] h-[420px] bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
      <div className="h-48 skeleton" />
      <div className="p-5 flex flex-col flex-1">
        <div className="h-5 w-3/4 skeleton mb-2" />
        <div className="h-5 w-1/2 skeleton" />
        <div className="mt-auto flex justify-between items-center pt-8">
          <div className="h-5 w-24 skeleton" />
          <div className="h-4 w-20 skeleton" />
        </div>
      </div>
    </div>
  );
}

function CarImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 skeleton" />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function TrendingSection() {
  const [cars, setCars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
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
  }, [cars]);

  return (
    <section className="pt-20">
      <Container>
        <h2 className="text-4xl font-semibold mb-12">Trending Models</h2>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
              : cars.map((car, i) => (
              <Link
                key={car.carId}
                href={`/car/${car.carId}`}
                className={`min-w-[280px] h-[420px] block group animate-fade-in-up stagger-${i + 1}`}
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
                    <CarImage src={car.imageUrl} alt={car.carName} />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="text-lg mb-2 h-[56px] leading-tight">
                      {car.carName} - {car.year}
                    </h4>

                    <div className="mt-auto flex justify-between items-center pt-8">
                      <p className="text-black font-bold">
                        {new Intl.NumberFormat("th-TH", {
                          style: "currency",
                          currency: "THB",
                        }).format(car.price)}
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

          {/* Left Arrow */}
          {showLeftFade && (
            <button
              onClick={() => scroll("left")}
              className="
                absolute left-2 top-40 -translate-y-1/2
                bg-white shadow-lg rounded-full
                p-2 hover:bg-gray-100
                transition hover:scale-110 active:scale-95
                z-20
              "
            >
              <MdChevronLeft size={26} />
            </button>
          )}

          {/* Right Arrow */}
          {showRightFade && (
            <button
              onClick={() => scroll("right")}
              className="
                absolute right-2 top-40 -translate-y-1/2
                bg-white shadow-lg rounded-full
                p-2 hover:bg-gray-100
                transition hover:scale-110 active:scale-95
                z-20
              "
            >
              <MdChevronRight size={26} />
            </button>
          )}

          {showLeftFade && (
            <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-gray-100 to-transparent transition-opacity duration-300" />
          )}

          {showRightFade && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-gray-100 to-transparent transition-opacity duration-300" />
          )}
        </div>
      </Container>
    </section>
  );
}
