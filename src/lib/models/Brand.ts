// src/lib/models/Brand.ts
export class Brand {
  constructor(
    public brandId: number,
    public brandName: string,
    public logoUrl: string
  ) {}

  getUpperName() {
    return this.brandName.toUpperCase();
  }
}