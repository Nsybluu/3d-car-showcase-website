"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import CarColorSelect from "./CarColorSelect";
import CarSpecSection from "./​CarSpecSection";
import { Maximize2 } from "lucide-react";
import { formatTHB } from "@/src/lib/format";
import type { Car, CarColor, CarSpecSection as CarSpecSectionType } from "@/src/types";

// Dynamic import with ssr: false ensures:
// 1. No prerendering of WebGL Canvas (avoids hydration mismatch)
// 2. Three.js only loads on client (reduces server bundle)
const CarModelViewer = dynamic(() => import("./CarModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#111115] rounded-2xl">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white/80 animate-spin" />
      </div>
    </div>
  ),
});

interface Props {
  car: Car;
  modelPath: string;
  colors: CarColor[];
  specs: CarSpecSectionType[];
}

export default function CarDetailContainer({
  car,
  modelPath,
  colors,
  specs,
}: Props) {
  const [color, setColor] = useState("#2c2c2c");
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-[7fr_3fr] grid-cols-1 gap-12 items-stretch">
        {/* LEFT - MODEL */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-md min-h-[400px]"
        >
          <CarModelViewer
            modelPath={modelPath}
            color={color}
            fullScreen={isFullScreen}
            onClose={() => setIsFullScreen(false)}
          />

          {/* 🔍 FullScreen Button */}
          <button
            onClick={() => setIsFullScreen(true)}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow hover:scale-110 transition z-10"
          >
            <Maximize2 size={20} />
          </button>
        </div>
        {/* RIGHT SIDE */}
        <div>
          {/* 🔹 ชื่อรถ + ปี อยู่ด้านบน */}
          <div className="mb-6">
            <h3 className="text-3xl font-bold tracking-tight">
              {car.carName}
              <span className="ml-3 text-sm bg-gray-200 px-3 py-1.5 rounded-lg align-middle font-medium">
                {car.year}
              </span>
            </h3>
            <p className="text-gray-400 text-md mt-2 font-medium">
              {formatTHB(car.price)}
            </p>
          </div>

          {/* 🔹 Card เปลี่ยนสี */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-6">Exterior Color</h3>

            <CarColorSelect
              colors={colors}
              selected={color}
              onChange={setColor}
            />
          </div>
        </div>
      </div>
      <CarSpecSection specs={specs} />
    </div>
  );
}
