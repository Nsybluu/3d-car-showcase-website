import { p } from "framer-motion/client";

export class Car {
  constructor(
    public carId: number,
    public carName: string,
    public year: number,
    public price: number,
    public imageUrl: string,
    public modelPath?: string | null,
  ) {}

  getDisplayName() {
    return `${this.carName} - ${this.year}`;
  }

  getFormattedPrice() {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(this.price);
  }
}
