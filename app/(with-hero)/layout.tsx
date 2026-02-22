import HeroCarousel from "@/src/components/Main/HeroCarousel";

export default function WithHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeroCarousel />
      <main className="bg-gray-100 px-24">{children}</main>
    </>
  );
}
