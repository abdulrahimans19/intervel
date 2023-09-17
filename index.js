import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./db.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import noteRoute from "./routes/note.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
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
