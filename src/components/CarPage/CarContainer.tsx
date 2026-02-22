"use client";

// Components
import Container from "../Main/Container";

import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import { LiaCarSideSolid } from "react-icons/lia";
import { motion, AnimatePresence } from "framer-motion";
import { use } from "react";

interface Car {
  carId: number;
  carName: string;
  year: number;
  price: number;
  imageUrl: string;
}

function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/car/${car.carId}`} className="h-[420px] block group">
      <div
        className="
           bg-gray-100 rounded-2xl
            border border-gray-200
            transition-all duration-300 ease-in-out
            animate-fadeIn
            hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]
            overflow-hidden
            flex flex-col"
      >
        <div className="h-48 overflow-hidden text-black">
          <img
            src={car.imageUrl}
            alt={car.carName}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h4 className="text-lg mb-2 h-[56px] leading-tight">
            {car.carName} - {car.year}
          </h4>

          <div className="mt-auto flex justify-between items-center pt-15">
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
  );
}

export default function CarContainer({
  cars,
  filterKey,
}: {
  cars: Car[];
  filterKey: string;
}) {
  return (
    <Container>
      <div
        key={filterKey}
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-6 pt-20
          min-h-[500px]
          transition-all duration-300 ease-in-out
        "
      >
        <AnimatePresence>
          {cars.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="col-span-full flex flex-col items-center justify-center text-center py-20"
            >
              <div className="text-6xl mb-6">
                <LiaCarSideSolid size={100} />
              </div>

              <h3 className="text-2xl font-semibold mb-3">No Cars Found</h3>

              <p className="text-gray-500 mb-6 max-w-md">
                We couldn't find any cars matching your selected filter. Try
                choosing a different brand or category.
              </p>

              <a
                href="/car"
                className="
                px-6 py-3 rounded-xl
                bg-black text-white
                hover:bg-gray-800
                transition duration-300
              "
              >
                Reset Filters
              </a>
            </motion.div>
          ) : (
            cars.map((car) => <CarCard key={car.carId} car={car} />)
          )}
        </AnimatePresence>
      </div>
    </Container>
  );
}
