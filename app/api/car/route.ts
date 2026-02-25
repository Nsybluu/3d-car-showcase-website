import { NextRequest, NextResponse } from "next/server";
import { getAll } from "@/src/lib/services/CarService";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const brand = searchParams.get("brand");
  const category = searchParams.get("category");

  const cars = await getAll({
    brandId: brand ? Number(brand) : undefined,
    categoryId: category ? Number(category) : undefined,
  });

  return NextResponse.json(cars);
}
