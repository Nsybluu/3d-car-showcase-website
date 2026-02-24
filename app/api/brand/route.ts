// app/api/brand/route.ts
import { BrandService } from "@/src/lib/services/BrandService";
import { NextResponse } from "next/server";

export async function GET() {
  const brands = await BrandService.getAllBrands();
  return NextResponse.json(brands);
}
