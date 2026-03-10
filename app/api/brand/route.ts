// app/api/brand/route.ts
import { getAllBrands } from "@/src/lib/services/BrandService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await getAllBrands();
    return NextResponse.json(brands);
  } catch (error) {
    console.error("[GET /api/brand]", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
