import { db } from "@/src/lib/db";
import { cacheLife } from "next/cache";
import type { Category } from "@/src/types";

export async function getAllCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("staticData");

  const rows = await db`
    SELECT * FROM category ORDER BY categoryname ASC
  `;
  return rows.map((row) => ({
    categoryId: row.categoryid as number,
    categoryName: row.categoryname as string,
    logoUrl: row.logourl as string,
  }));
}
