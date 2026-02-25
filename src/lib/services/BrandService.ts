// src/lib/services/BrandService.ts
import { db } from "../db";
import { cacheLife } from "next/cache";

export async function getAllBrands() {
  "use cache";
  cacheLife("staticData");

  const [rows]: any[] = await db.query(
    "SELECT * FROM brand ORDER BY brandName ASC"
  );
  return rows;
}
