import { CarService } from "@/src/lib/services/CarService";
import { BrandService } from "@/src/lib/services/BrandService";
import { CategoryService } from "@/src/lib/services/CategoryService";
import Container from "@/src/components/Main/Container";
import CarListClient from "@/src/components/CarPage/CarListClient";

export const revalidate = 120;

export default async function CarPage() {
  const brands = await BrandService.getAllBrands();
  const categories = await CategoryService.getAllCategories();
  const cars = await CarService.getAll(); // โหลดทั้งหมด

  return (
    <section className="py-20">
      <Container>
        <CarListClient
          brands={brands}
          categories={categories}
          cars={cars}
        />
      </Container>
    </section>
  );
}