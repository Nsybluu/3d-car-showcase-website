"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CarModelViewer from "./CarModelViewer";
import CarColorSelect from "./CarColorSelect";
import CarSpecSection from "./​CarSpecSection";
import { Maximize2 } from "lucide-react";

interface Props {
  car: any;
  modelPath: string;
  colors: {
    id: number;
    name: string;
    code: string;
    image: string;
  }[];
  specs: any[];
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
      <div className="grid lg:grid-cols-[800px_2fr] grid-cols-1 gap-12">
        {/* LEFT - MODEL */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden shadow-md"
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
        </motion.div>
        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          {/* 🔹 ชื่อรถ + ปี อยู่ด้านบน */}
          <div className="mb-6">
            <h3 className="text-3xl font-bold tracking-tight">
              {car.carName}
              <span className="ml-3 text-sm bg-gray-200 px-3 py-1.5 rounded-lg align-middle font-medium">
                {car.year}
              </span>
            </h3>
            <p className="text-gray-400 text-md mt-2 font-medium">
              {new Intl.NumberFormat("th-TH", {
                style: "currency",
                currency: "THB",
              }).format(car.price)}
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
        </motion.div>
      </div>
      <CarSpecSection specs={specs} />
    </div>
  );
}
