import CategorySection from "@/src/components/HomePage/CategorySection";
import BrandSection from "@/src/components/HomePage/BrandSection";
import TrendingSection from "@/src/components/HomePage/TrendingSection";
import Container from "@/src/components/Main/Container";
import { CarService } from "@/src/lib/services/CarService";
import { CategoryService } from "@/src/lib/services/CategoryService";
import { BrandService } from "@/src/lib/services/BrandService";

export const metadata = {
  title: "LoveCodeLoveCar",
};

export const revalidate = 120;

export default async function Home() {
  try {
    const brands = await BrandService.getAllBrands();
    const categories = await CategoryService.getAllCategories();
    const trending = await CarService.getTrending();

    return (
      <section className="py-20">
        <Container>
          <CategorySection
            title="Browse By Type"
            mode="display"
            categories={categories}
          />

          <BrandSection
            title="Explore Our Premium Brands"
            className="pt-20"
            mode="display"
            brands={brands}
          />

          <TrendingSection cars={trending} />
        </Container>
      </section>
    );
  } catch (error) {
    console.error("Home build error:", error);

    return (
      <section className="py-20">
        <Container>
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">
              Temporary loading issue
            </h2>
          </div>
        </Container>
      </section>
    );
  }
}