import { db } from "@/src/lib/db";
import { cacheLife } from "next/cache";

export async function getAllCategories() {
  "use cache";
  cacheLife("staticData");

  const [rows]: any[] = await db.query(
    "SELECT * FROM category ORDER BY categoryName ASC"
  );
  return rows;
}
