import Container from "@/src/components/Main/Container";
import CategorySection from "@/src/components/HomePage/CategorySection";
import BrandSection from "@/src/components/HomePage/BrandSection";
import CarContainer from "@/src/components/CarPage/CarContainer";
import { CarService } from "@/src/lib/services/CarService";

export const metadata = {
  title: "Cars | LoveCodeLoveCar",
};

export const dynamic = "force-dynamic";

export default async function CarPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; category?: string }>;
}) {
  const params = await searchParams;

  const cars = await CarService.getAll({
    brandId: params.brand ? Number(params.brand) : undefined,
    categoryId: params.category ? Number(params.category) : undefined,
  });

  return (
    <section className="py-20">
      <CategorySection title="Choose Your Type" mode="filter" />
      <BrandSection
        title="Choose Your Favorite Brand"
        mode="filter"
        className="pt-20"
      />
      <CarContainer
        cars={cars}
        filterKey={`${params.brand || ""}-${params.category || ""}`}
      />
    </section>
  );
}
