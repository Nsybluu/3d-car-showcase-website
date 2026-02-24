import CategorySection from "@/src/components/HomePage/CategorySection";
import BrandSection from "@/src/components/HomePage/BrandSection";
import CarContainer from "@/src/components/CarPage/CarContainer";
import Container from "@/src/components/Main/Container";
import { CarService } from "@/src/lib/services/CarService";
import { BrandService } from "@/src/lib/services/BrandService";
import { CategoryService } from "@/src/lib/services/CategoryService";

export const metadata = {
  title: "Cars | LoveCodeLoveCar",
};

export const revalidate = 120;

export default async function CarPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; category?: string }>;
}) {
  const params = await searchParams;

  const brands = await BrandService.getAllBrands();
  const categories = await CategoryService.getAllCategories();

  const cars = await CarService.getAll({
    brandId: params.brand ? Number(params.brand) : undefined,
    categoryId: params.category ? Number(params.category) : undefined,
  });

  return (
    <section className="py-20">
      <Container>
      <CategorySection
        title="Choose Your Type"
        mode="filter"
        categories={categories}   // ✅ ต้องส่ง
      />

      <BrandSection
        title="Choose Your Favorite Brand"
        mode="filter"
        className="pt-20"
        brands={brands}           // ✅ ต้องส่ง
      />

      <CarContainer
        cars={cars}
        filterKey={`${params.brand || ""}-${params.category || ""}`}
      />
      </Container>
    </section>
  );
}