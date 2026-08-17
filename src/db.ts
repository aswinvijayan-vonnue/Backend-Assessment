import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Connected successfully");
    client.release();
  } catch (err: unknown) {
    console.error("Connection failed :", (err as Error).message);
  }
}

testConnection();

export default pool;
