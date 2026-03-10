import { getTrending } from "@/src/lib/services/CarService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cars = await getTrending();
    return NextResponse.json(cars);
  } catch (error) {
    console.error("[GET /api/trending]", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
