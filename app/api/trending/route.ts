import { getTrending } from "@/src/lib/services/CarService";
import { NextResponse } from "next/server";

export async function GET() {
  const cars = await getTrending();
  return NextResponse.json(cars);
}
