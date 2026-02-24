"use client";

import Container from "../Main/Container";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { LiaCarSideSolid } from "react-icons/lia";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

interface Car {
  carId: number;
  carName: string;
  year: number;
  price: number;
  imageUrl: string;
}

const ITEMS_PER_PAGE = 16;

function CarImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 skeleton" />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition duration-500 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function CarCard({ car, index }: { car: Car; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Link href={`/car/${car.carId}`} className="h-[420px] block group">
        <div className="bg-gray-100 rounded-2xl border border-gray-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)] transition-all duration-300 overflow-hidden h-full flex flex-col">
          <div className="h-48 overflow-hidden">
            <CarImage src={car.imageUrl} alt={car.carName} />
          </div>

          <div className="p-5 flex flex-col flex-1">
            <h4 className="text-lg mb-2 h-[56px] leading-tight">
              {car.carName} - {car.year}
            </h4>

            <div className="mt-auto flex justify-between items-center">
              <p className="font-bold">
                {new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                }).format(car.price)}
              </p>

              <span className="inline-flex items-center gap-1 text-blue-600 text-xs group-hover:text-blue-800 transition">
                View Details
                <MdOutlineArrowOutward className="group-hover:translate-x-1 transition" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CarContainer({
  cars,
  filterKey,
}: {
  cars: Car[];
  filterKey: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cars.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCars = cars.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterKey]);

  // Generate pagination numbers with ...
  const getPaginationNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-20 min-h-[500px]">
        <AnimatePresence>
          {paginatedCars.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center py-20 text-center"
            >
              <LiaCarSideSolid size={80} className="mb-6" />
              <h3 className="text-2xl font-semibold mb-3">No Cars Found</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                Try changing your filter.
              </p>
              <Link
                href="/car"
                className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
              >
                Reset Filters
              </Link>
            </motion.div>
          ) : (
            paginatedCars.map((car, i) => (
              <CarCard key={car.carId} car={car} index={i} />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-12">
          {/* Prev */}
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              className="w-9 h-9 rounded-full flex items-center justify-center border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
            >
              <IoIosArrowBack size={18} />
            </button>
          )}

          {/* Page Numbers */}
          {getPaginationNumbers().map((item, index) =>
            item === "..." ? (
              <span key={index} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(Number(item))}
                className={`w-9 h-9 rounded-full border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)] ${
                  currentPage === item
                    ? "bg-gray-200 border border-gray-400 shadow-md"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item}
              </button>
            ),
          )}

          {/* Next */}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
            >
              <IoIosArrowForward size={18} />
            </button>
          )}
        </div>
      )}
    </Container>
  );
}
