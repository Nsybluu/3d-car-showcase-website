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
  let brands, categories, trending;

  try {
    brands = await getAllBrands();
    categories = await getAllCategories();
    trending = await getTrending();
  } catch (error) {
    console.error("Home build error:", error);

    return (
      <section className="py-5">
        <Container>
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">Temporary loading issue</h2>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-5">
      <Container>
        <CategorySection
          title="Browse By Type"
          mode="display"
          categories={categories}
        />

        <BrandSection
          title="Explore Our Premium Brands"
          className="pt-5"
          mode="display"
          brands={brands}
        />

        <TrendingSection cars={trending} />
      </Container>
    </section>
  );
}
