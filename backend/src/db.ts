import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: 'manu',
  password: 'pass',
  host: 'localhost',
  port: Number(5432),
  database: 'mydb',
});

export default pool;
