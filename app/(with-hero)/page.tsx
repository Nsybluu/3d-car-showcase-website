import CategorySection from "@/src/components/HomePage/CategorySection";
import BrandSection from "@/src/components/HomePage/BrandSection";
import TrendingSection from "@/src/components/HomePage/TrendingSection";
import Container from "@/src/components/Main/Container";
import { getTrending } from "@/src/lib/services/CarService";
import { getAllCategories } from "@/src/lib/services/CategoryService";
import { getAllBrands } from "@/src/lib/services/BrandService";

export const metadata = {
  title: "LoveCodeLoveCar",
};

export default async function Home() {
  try {
    const brands = await getAllBrands();
    const categories = await getAllCategories();
    const trending = await getTrending();

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