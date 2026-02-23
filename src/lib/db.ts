import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),   // ⭐ เพิ่ม
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,              // ⭐ สำคัญสำหรับ Railway
  },
});