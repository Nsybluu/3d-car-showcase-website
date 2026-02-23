"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/images/carousel/carousel1.png",
  },
  {
    image: "/images/carousel/carousel2.png",
  },
  {
    image: "/images/carousel/carousel3.png",
  },
  {
    image: "/images/carousel/carousel4.png",
  },
  {
    image: "/images/carousel/carousel5.png",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`
              object-cover
              transition-transform duration-[7000ms] ease-linear
              ${index === current ? "scale-110" : "scale-100"}
            `}
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      ))}

      {/* Logo - center */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <Image
          src="/images/Logo.png"
          alt="LoveCodeLoveCar"
          width={300}
          height={300}
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-10 px-12 flex items-end justify-between">
        {/* Title */}
        <div key={current} className="animate-fade-in-up">
          <p className="text-white/60 text-sm font-medium tracking-widest uppercase mb-2">
            3D Car Showcase
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight">
            Discover the Power <span className="text-white/90">of Design</span>
          </h1>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 items-center">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`
                transition-all duration-500 rounded-full
                ${
                  index === current
                    ? "w-8 h-2 bg-white"
                    : "w-2 h-2 bg-white/40 hover:bg-white/60"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
