import { CarService } from "@/src/lib/services/CarService";
import CarDetailHeader from "@/src/components/CarDetailPage/CarDetailHeader";
import CarDetailContainer from "@/src/components/CarDetailPage/CarDetailContainer";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params; // 👈 สำคัญ

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
