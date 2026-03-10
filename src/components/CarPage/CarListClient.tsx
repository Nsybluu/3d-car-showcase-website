"use client";

import { useState } from "react";
import BrandSection from "../HomePage/BrandSection";
import CategorySection from "../HomePage/CategorySection";
import CarContainer from "./CarContainer";
import { IoSearch, IoClose } from "react-icons/io5";
import type { Brand, Category, Car } from "@/src/types";

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc";

interface CarListClientProps {
  brands: Brand[];
  categories: Category[];
  cars: Car[];
}

export default function CarListClient({
  brands,
  categories,
  cars,
}: CarListClientProps) {
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // 1️⃣ Filter by brand + category + search
  const filteredCars = cars.filter((car) => {
    const matchBrand = selectedBrand ? car.brandId === selectedBrand : true;
    const matchCategory = selectedCategory
      ? car.categoryId === selectedCategory
      : true;
    const matchSearch = searchQuery.trim()
      ? car.carName.toLowerCase().includes(searchQuery.trim().toLowerCase())
      : true;

    return matchBrand && matchCategory && matchSearch;
  });

  // 2️⃣ Sort
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "year-desc":
        return b.year - a.year;
      case "year-asc":
        return a.year - b.year;
      default:
        return 0; // ใช้ลำดับจาก DB
    }
  });

  // 3️⃣ filterKey ที่เปลี่ยนตาม filter จริงๆ → pagination reset ทำงานได้
  const filterKey = `${selectedBrand ?? 0}-${selectedCategory ?? 0}-${searchQuery}-${sortBy}`;

  return (
    <>
      <CategorySection
        title="Choose Your Type"
        mode="filter"
        categories={categories}
        selectedId={selectedCategory}
        onSelect={(id: number) =>
          setSelectedCategory(id === selectedCategory ? null : id)
        }
      />

      <BrandSection
        title="Choose Your Favorite Brand"
        mode="filter"
        className="pt-5"
        brands={brands}
        selectedId={selectedBrand}
        onSelect={(id: number) =>
          setSelectedBrand(id === selectedBrand ? null : id)
        }
      />

      {/* Search + Sort bar */}
      <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        {/* Search input */}
        <div className="relative flex-1">
          <IoSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search car name..."
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <IoClose size={18} />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-4 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_0.75rem_center] bg-no-repeat"
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="year-desc">Year: Newest First</option>
          <option value="year-asc">Year: Oldest First</option>
        </select>
      </div>

      <CarContainer cars={sortedCars} filterKey={filterKey} />
    </>
  );
}
