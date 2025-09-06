import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: 'postgres',
  password: 'manu',
  host: 'localhost',
  port: Number(5432),
  database: 'mydb',
});

export default pool;
