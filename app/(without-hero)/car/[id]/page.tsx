import { CarService } from "@/src/lib/services/CarService";
import CarDetailHeader from "@/src/components/CarDetailPage/CarDetailHeader";
import CarDetailContainer from "@/src/components/CarDetailPage/CarDetailContainer";
import { cache } from "react";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 300;

const getCarCached = cache(async (id: number) => {
  return CarService.getById(id);
});

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const { id } = await params;   // ✅ required in Next 16
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return { title: "Car Detail | LoveCodeLoveCar" };
  }

  const car = await getCarCached(numericId);

  if (!car) {
    return { title: "Car Not Found | LoveCodeLoveCar" };
  }

  return {
    title: `${car.carName} | LoveCodeLoveCar`,
  };
}

export default async function CarDetailPage({ params }: Props) {

  const { id } = await params;   // ✅ required in Next 16
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return <div>Invalid car ID</div>;
  }

  const car = await getCarCached(numericId);

  if (!car) {
    return <div>Car not found</div>;
  }

  const modelPath = await CarService.getModelByCarId(numericId);
  const colors = await CarService.getAllColors();
  const specs = await CarService.getSpecsByCarId(numericId);

  return (
    <>
      <CarDetailHeader carName={car.carName} />
      <CarDetailContainer
        car={car}
        modelPath={modelPath}
        colors={colors}
        specs={specs}
      />
    </>
  );
}