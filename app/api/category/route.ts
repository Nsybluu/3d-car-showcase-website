import { NextResponse } from "next/server";
import { getAllCategories } from "@/src/lib/services/CategoryService";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
