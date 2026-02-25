"use client";

import { useState } from "react";
import BrandSection from "../HomePage/BrandSection";
import CategorySection from "../HomePage/CategorySection";
import CarContainer from "./CarContainer";
import type { Brand, Category, Car } from "@/src/types";

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

  const filteredCars = cars.filter((car) => {
    const matchBrand = selectedBrand ? car.brandId === selectedBrand : true;
    const matchCategory = selectedCategory
      ? car.categoryId === selectedCategory
      : true;

    return matchBrand && matchCategory;
  });

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
        className="pt-20"
        brands={brands}
        selectedId={selectedBrand}
        onSelect={(id: number) =>
          setSelectedBrand(id === selectedBrand ? null : id)
        }
      />

      <CarContainer cars={filteredCars} filterKey="client-filter" />
    </>
  );
}
