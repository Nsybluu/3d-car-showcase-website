// app/api/brand/route.ts
import { getAllBrands } from "@/src/lib/services/BrandService";
import { NextResponse } from "next/server";

export async function GET() {
  const brands = await getAllBrands();
  return NextResponse.json(brands);
}
