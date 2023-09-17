import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  user: process.env.USER,
});

export default connection;
