import { CarService } from "@/src/lib/services/CarService";
import { NextResponse } from "next/server";

export async function GET() {
  const cars = await CarService.getTrending();
  return NextResponse.json(cars);
}
