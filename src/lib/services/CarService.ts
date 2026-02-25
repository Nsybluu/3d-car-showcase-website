import { db } from "@/src/lib/db";
import { Car } from "../models/Car";
import { cacheLife } from "next/cache";
import type { CarSpecSection } from "@/src/types";

export async function getTrending() {
  "use cache";
  cacheLife("frequentData");

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
export async function getAll(filter?: { brandId?: number; categoryId?: number }) {
  "use cache";
  cacheLife("frequentData");

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
    brandId: row.brandId,
    categoryId: row.categoryId,
    carName: row.carName,
    year: row.year,
    price: row.price,
    imageUrl: row.imageUrl,
  }));
}

// ดึงข้อมูลรถตาม carId
export async function getById(id: number) {
  "use cache";
  cacheLife("frequentData");

  if (!id || isNaN(id)) return null;

  const [rows]: any[] = await db.query("SELECT * FROM car WHERE carId = ?", [
    id,
  ]);

  if (rows.length === 0) return null;

  return rows[0] as Car;
}

// ดึง modelPath ของรถจาก carId
export async function getModelByCarId(carId: number): Promise<string> {
  "use cache";
  cacheLife("frequentData");

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
export async function getAllColors() {
  "use cache";
  cacheLife("staticData");

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
export async function getSpecsByCarId(carId: number): Promise<CarSpecSection[]> {
  "use cache";
  cacheLife("frequentData");

  const [rows]: any[] = await db.query(
    `
    SELECT 
      s.sectionId,
      s.sectionTitle,
      s.displayOrder AS sectionOrder,
      i.itemId,
      i.label,
      i.value,
      i.displayOrder AS itemOrder
    FROM car_spec_section s
    LEFT JOIN car_spec_item i
      ON s.sectionId = i.sectionId
    WHERE s.carId = ?
    ORDER BY s.displayOrder ASC, i.displayOrder ASC
    `,
    [carId]
  );

  if (!rows.length) return [];

  const sectionsMap: any = {};

  for (const row of rows) {
    if (!sectionsMap[row.sectionId]) {
      sectionsMap[row.sectionId] = {
        sectionId: row.sectionId,
        title: row.sectionTitle,
        items: [],
      };
    }

    if (row.itemId) {
      sectionsMap[row.sectionId].items.push({
        itemId: row.itemId,
        label: row.label,
        value: row.value,
      });
    }
  }

  return Object.values(sectionsMap);
}
