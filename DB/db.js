import dotenv from 'dotenv'
import pkg from "pg";
const { Pool } = pkg;
dotenv.config()
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT_DB,
});

export default pool;
