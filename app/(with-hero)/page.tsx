import CategorySection from "@/src/components/HomePage/CategorySection";
import BrandSection from "@/src/components/HomePage/BrandSection";
import TrendingSection from "@/src/components/HomePage/TrendingSection";
import Container from "@/src/components/Main/Container";

export const metadata = {
  title: "LoveCodeLoveCar",
};

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <Container>
      <CategorySection
        title="Browse By Type"
        className="pt-20"
        mode="display"
      />
      <BrandSection
        title="Explore Our Premium Brands"
        className="pt-20"
        mode="display"
      />
      <TrendingSection />
    </Container>
  );
}
