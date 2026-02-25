import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    // สำหรับข้อมูลที่แทบไม่เปลี่ยน เช่น brands, categories, colors
    staticData: {
      stale: 3600,       // client ใช้ cache ได้ 1 ชม. โดยไม่ต้อง recheck
      revalidate: 3600,  // server revalidate ทุก 1 ชม.
      expire: 86400,     // ลบ cache หลัง 1 วัน ถ้าไม่มี traffic
    },
    // สำหรับข้อมูลรถที่อาจเปลี่ยนบ้าง เช่น car detail, specs, model, trending
    frequentData: {
      stale: 300,        // client ใช้ cache ได้ 5 นาที
      revalidate: 600,   // server revalidate ทุก 10 นาที
      expire: 3600,      // ลบ cache หลัง 1 ชม. ถ้าไม่มี traffic
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
    ],
  },
};

export default nextConfig;
