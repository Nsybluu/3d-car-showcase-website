import { db } from "@/src/lib/db";
import { Car } from "../models/Car";
import { cacheLife } from "next/cache";
import type { CarSpecSection } from "@/src/types";

export async function getTrending() {
  "use cache";
  cacheLife("frequentData");

  const rows = await db`
    SELECT * FROM car WHERE istrending = true ORDER BY displayorder ASC
  `;

  return rows.map((row) => ({
    carId: row.carid as number,
    carName: row.carname as string,
    year: row.year as number,
    price: row.price as number,
    imageUrl: row.imageurl as string,
  }));
}

// ดึงรถทั้งหมด โดยสามารถ filter ด้วย brandId และ categoryId ได้
export async function getAll(filter?: {
  brandId?: number;
  categoryId?: number;
}) {
  "use cache";
  cacheLife("frequentData");

  const rows = await db`
    SELECT * FROM car
    WHERE true
    ${filter?.brandId !== undefined ? db`AND brandid = ${filter.brandId}` : db``}
    ${filter?.categoryId !== undefined ? db`AND categoryid = ${filter.categoryId}` : db``}
    ORDER BY year DESC
  `;

  return rows.map((row) => ({
    carId: row.carid as number,
    brandId: row.brandid as number,
    categoryId: row.categoryid as number,
    carName: row.carname as string,
    year: row.year as number,
    price: row.price as number,
    imageUrl: row.imageurl as string,
  }));
}

// ดึงข้อมูลรถตาม carId
export async function getById(id: number) {
  "use cache";
  cacheLife("frequentData");

  if (!id || isNaN(id)) return null;

  const rows = await db`
    SELECT * FROM car WHERE carid = ${id}
  `;

  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    carId: row.carid,
    carName: row.carname,
    year: row.year,
    price: row.price,
    imageUrl: row.imageurl,
    brandId: row.brandid,
    categoryId: row.categoryid,
  } as Car;
}

// ดึง modelPath ของรถจาก carId
export async function getModelByCarId(carId: number): Promise<string> {
  "use cache";
  cacheLife("frequentData");

  const rows = await db`
    SELECT modelurl
    FROM car_model
    WHERE carid = ${carId}
    ORDER BY isdefault DESC
    LIMIT 1
  `;

  // 🚨 ถ้าไม่มี model ใน DB
  if (!rows || rows.length === 0) {
    return "https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/defaultCar.glb";
  }

  // 🚨 ถ้า modelUrl ว่าง
  if (!rows[0].modelurl) {
    return "https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/defaultCar.glb";
  }

  return rows[0].modelurl as string;
}

// ดึงสีรถทั้งหมดจาก DB
export async function getAllColors() {
  "use cache";
  cacheLife("staticData");

  const rows = await db`
    SELECT * FROM color ORDER BY displayorder ASC
  `;

  return rows.map((row) => ({
    id: row.colorid as number,
    name: row.colorname as string,
    code: row.colorcode as string,
    image: row.imageurl as string,
  }));
}

// ดึงสเปครถตาม carId
export async function getSpecsByCarId(
  carId: number,
): Promise<CarSpecSection[]> {
  "use cache";
  cacheLife("frequentData");

  const rows = await db`
    SELECT
      s.sectionid,
      s.sectiontitle,
      s.displayorder AS sectionorder,
      i.itemid,
      i.label,
      i.value,
      i.displayorder AS itemorder
    FROM car_spec_section s
    LEFT JOIN car_spec_item i
      ON s.sectionid = i.sectionid
    WHERE s.carid = ${carId}
    ORDER BY s.displayorder ASC, i.displayorder ASC
  `;

  if (!rows.length) return [];

  const sectionsMap: Record<number, CarSpecSection> = {};

  for (const row of rows) {
    if (!sectionsMap[row.sectionid as number]) {
      sectionsMap[row.sectionid as number] = {
        sectionId: row.sectionid as number,
        title: row.sectiontitle as string,
        items: [],
      };
    }

    if (row.itemid) {
      sectionsMap[row.sectionid as number].items.push({
        itemId: row.itemid as number,
        label: row.label as string,
        value: row.value as string,
      });
    }
  }

  return Object.values(sectionsMap);
}
