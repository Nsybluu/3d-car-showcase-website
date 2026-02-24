import { db } from "@/src/lib/db";
import { Category } from "../models/Category";

export class CategoryService {
  static async getAllCategories() {
  const [rows]: any[] = await db.query(
    "SELECT * FROM category ORDER BY categoryName ASC"
  );
  return rows;
}
}
