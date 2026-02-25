import { getAll } from "@/src/lib/services/CarService";
import { getAllBrands } from "@/src/lib/services/BrandService";
import { getAllCategories } from "@/src/lib/services/CategoryService";
import Container from "@/src/components/Main/Container";
import CarListClient from "@/src/components/CarPage/CarListClient";

export default async function CarPage() {
  const brands = await getAllBrands();
  const categories = await getAllCategories();
  const cars = await getAll(); // โหลดทั้งหมด

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