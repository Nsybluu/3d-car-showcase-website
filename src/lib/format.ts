/**
 * Currency formatter — reuse ทั้งโปรเจค
 * สร้างครั้งเดียวเป็น module-level constant
 * ไม่ต้องสร้าง new Intl.NumberFormat() ทุก render
 */
export const thbFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
});

export function formatTHB(amount: number): string {
  return thbFormatter.format(amount);
}
