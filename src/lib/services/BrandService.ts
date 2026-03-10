// src/lib/services/BrandService.ts
import { db } from "../db";
import { cacheLife } from "next/cache";
import type { Brand } from "@/src/types";

export async function getAllBrands(): Promise<Brand[]> {
  "use cache";
  cacheLife("staticData");

  const rows = await db`
    SELECT * FROM brand ORDER BY brandname ASC
  `;
  return rows.map((row) => ({
    brandId: row.brandid as number,
    brandName: row.brandname as string,
    logoUrl: row.logourl as string,
  }));
}
