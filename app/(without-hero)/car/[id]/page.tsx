import { getById, getModelByCarId, getAllColors, getSpecsByCarId } from "@/src/lib/services/CarService";
import CarDetailHeader from "@/src/components/CarDetailPage/CarDetailHeader";
import CarDetailContainer from "@/src/components/CarDetailPage/CarDetailContainer";
import { Suspense } from "react";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return { title: "Car Detail | LoveCodeLoveCar" };
  }

  const car = await getById(numericId);

  if (!car) {
    return { title: "Car Not Found | LoveCodeLoveCar" };
  }

  return {
    title: `${car.carName} | LoveCodeLoveCar`,
  };
}

async function CarDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return <div>Invalid car ID</div>;
  }

  const car = await getById(numericId);

  if (!car) {
    return <div>Car not found</div>;
  }

  const modelPath = await getModelByCarId(numericId);
  const colors = await getAllColors();
  const specs = await getSpecsByCarId(numericId);

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

export default function CarDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <CarDetailContent params={params} />
    </Suspense>
  );
}