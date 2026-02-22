// src/lib/services/BrandService.ts
import { db } from "../db";
import { Brand } from "../models/Brand";

export class BrandService {
  static async getAll(): Promise<Brand[]> {
    const [rows]: any = await db.query(
      "SELECT * FROM brand ORDER BY brandName ASC"
    );

    return rows.map(
      (row: any) =>
        new Brand(row.brandId, row.brandName, row.logoUrl)
    );
  }
}
