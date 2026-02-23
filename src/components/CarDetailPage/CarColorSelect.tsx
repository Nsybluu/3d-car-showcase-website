"use client";

import { useState } from "react";

interface Props {
  colors: {
    id: number;
    name: string;
    code: string;
    image: string;
  }[];
  selected: string;
  onChange: (color: string) => void;
}

function ColorImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 skeleton" />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function CarColorSelect({ colors, selected, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* 🔹 สีจาก DB */}
      {colors.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(c.code)}
          className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-300
            ${
              selected === c.code
                ? "border-black scale-[1.03] shadow-lg"
                : "border-gray-200 hover:border-gray-400 hover:shadow-md"
            }
          `}
        >
          <div className="h-24">
            <ColorImage src={c.image} alt={c.name} />
          </div>
          <div
            className={`absolute bottom-0 inset-x-0 px-2 py-1.5 text-xs font-medium text-center transition-all duration-300
            ${
              selected === c.code
                ? "bg-black text-white"
                : "bg-black/50 text-white/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0"
            }
          `}
          >
            {c.name}
          </div>
        </button>
      ))}

      {/* 🌈 Custom */}
      <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-md">
        <div className="h-24">
          <ColorImage src="/images/colors/rainbow.png" alt="Custom Color" />
        </div>

        <div className="absolute bottom-0 inset-x-0 px-2 py-1.5 bg-black/50 backdrop-blur-sm">
          <p className="text-xs font-medium text-white/90 text-center">
            Custom
          </p>
        </div>

        <input
          type="color"
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
