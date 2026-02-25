/**
 * Shared type definitions — ใช้ร่วมกันทั้งโปรเจค
 * แทนที่จะ define interface ซ้ำในแต่ละ component
 */

export interface Car {
  carId: number;
  carName: string;
  year: number;
  price: number;
  imageUrl: string;
  brandId?: number;
  categoryId?: number;
  modelPath?: string | null;
}

export interface Brand {
  brandId: number;
  brandName: string;
  logoUrl: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  logoUrl: string;
}

export interface CarColor {
  id: number;
  name: string;
  code: string;
  image: string;
}

export interface CarSpecItem {
  itemId: number;
  label: string;
  value: string;
}

export interface CarSpecSection {
  sectionId: number;
  title: string;
  items: CarSpecItem[];
}
