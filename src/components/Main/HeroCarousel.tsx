"use client";

import { useState, useEffect } from "react";

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
    <section className="relative w-full h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/35" />
        </div>
      ))}

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10 px-4">
        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-40 md:w-75 mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        />
      </div>
    </section>
  );
}
