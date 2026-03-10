import { NextRequest, NextResponse } from "next/server";
import { getAll } from "@/src/lib/services/CarService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const brand = searchParams.get("brand");
    const category = searchParams.get("category");

    // Validate: ต้องเป็นตัวเลขบวกเท่านั้น
    const brandId = brand ? Number(brand) : undefined;
    const categoryId = category ? Number(category) : undefined;

    if (brandId !== undefined && (!Number.isInteger(brandId) || brandId <= 0)) {
      return NextResponse.json({ error: "Invalid brand parameter" }, { status: 400 });
    }
    if (categoryId !== undefined && (!Number.isInteger(categoryId) || categoryId <= 0)) {
      return NextResponse.json({ error: "Invalid category parameter" }, { status: 400 });
    }

    const cars = await getAll({ brandId, categoryId });
    return NextResponse.json(cars);
  } catch (error) {
    console.error("[GET /api/car]", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
