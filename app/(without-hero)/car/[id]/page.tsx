import { CarService } from "@/src/lib/services/CarService";
import CarDetailHeader from "@/src/components/CarDetailPage/CarDetailHeader";
import CarDetailContainer from "@/src/components/CarDetailPage/CarDetailContainer";

import { Metadata } from "next";
import { db } from "@/src/lib/db";

async function getCar(id: string) {
  const [rows]: any = await db.query(
    "SELECT * FROM car WHERE carId = ?",
    [id]
  );
  return rows[0];
}

// ⭐ ใส่ตรงนี้
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {

  const { id } = await params;   // ✅ ต้อง await ก่อน
  const car = await getCar(id);

  return {
    title: car
      ? `${car.carName} | LoveCodeLoveCar`
      : "Car Detail | LoveCodeLoveCar",
  };
}

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 120;

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params;   // ✅ ต้อง await

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return <div>Invalid car ID</div>;
  }

  const car = await CarService.getById(numericId);

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
