import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./db.js";

import userRoute from "./routes/userRoute.js";
import noteRoute from "./routes/noteRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/note", noteRoute);

app.listen(port, async () => {
  try {
    await connection;
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
});
