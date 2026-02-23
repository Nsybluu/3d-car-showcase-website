import { db } from "@/src/lib/db";
import { Car } from "../models/Car";

export class CarService {
  static async getTrending() {
    const [rows]: any[] = await db.query(
      "SELECT * FROM car WHERE isTrending = 1 ORDER BY displayOrder ASC",
    );

    return rows.map((row: any) => ({
      carId: row.carId,
      carName: row.carName,
      year: row.year,
      price: row.price,
      imageUrl: row.imageUrl,
    }));
  }

  // ดึงรถทั้งหมด โดยสามารถ filter ด้วย brandId และ categoryId ได้
  static async getAll(filter?: { brandId?: number; categoryId?: number }) {
    let sql = "SELECT * FROM car WHERE 1=1";
    const params: any[] = [];

    if (filter?.brandId !== undefined) {
      sql += " AND brandId = ?";
      params.push(filter.brandId);
    }

    if (filter?.categoryId !== undefined) {
      sql += " AND categoryId = ?";
      params.push(filter.categoryId);
    }

    sql += " ORDER BY year DESC";

    const [rows]: any[] = await db.query(sql, params);

    return rows.map((row: any) => ({
      carId: row.carId,
      carName: row.carName,
      year: row.year,
      price: row.price,
      imageUrl: row.imageUrl,
    }));
  }

  // ดึงข้อมูลรถตาม carId
  static async getById(id: number) {
    if (!id || isNaN(id)) return null;

    const [rows]: any[] = await db.query("SELECT * FROM car WHERE carId = ?", [
      id,
    ]);

    if (rows.length === 0) return null;

    return rows[0] as Car;
  }

  // ดึง modelPath ของรถจาก carId
  static async getModelByCarId(carId: number): Promise<string> {
    const [rows]: any[] = await db.query(
      `
    SELECT modelUrl 
    FROM car_model 
    WHERE carId = ? 
    ORDER BY isDefault DESC 
    LIMIT 1
    `,
      [carId],
    );

    // 🚨 ถ้าไม่มี model ใน DB
    if (!rows || rows.length === 0) {
      return "https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/defaultCar.glb";
    }

    // 🚨 ถ้า modelUrl ว่าง
    if (!rows[0].modelUrl) {
      return "https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/defaultCar.glb";
    }

    return rows[0].modelUrl;
  }

  // ดึงสีรถทั้งหมดจาก DB
  static async getAllColors() {
    const [rows]: any[] = await db.query(
      "SELECT * FROM color ORDER BY displayOrder ASC",
    );

    return rows.map((row: any) => ({
      id: row.colorId,
      name: row.colorName,
      code: row.colorCode,
      image: row.imageUrl,
    }));
  }

  // ดึงสเปครถตาม carId
  static async getSpecsByCarId(carId: number) {
    const [sections]: any[] = await db.query(
      "SELECT * FROM car_spec_section WHERE carId = ? ORDER BY displayOrder ASC",
      [carId],
    );

    if (!sections.length) return [];

    const result = [];

    for (const section of sections) {
      const [items]: any[] = await db.query(
        "SELECT * FROM car_spec_item WHERE sectionId = ? ORDER BY displayOrder ASC",
        [section.sectionId],
      );

      result.push({
        sectionId: section.sectionId,
        title: section.sectionTitle,
        items,
      });
    }

    return result;
  }
}
