import { db } from "@/src/lib/db";
import { Category } from "../models/Category";

export class CategoryService {
  static async getAll() {
    const [rows]: any = await db.query(
      "SELECT * FROM category ORDER BY categoryName ASC"
    );

    return rows.map(
      (row: any) =>
        new Category(row.categoryId, row.categoryName, row.logoUrl)
    );
  }
}
