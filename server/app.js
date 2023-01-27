import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import { errorMiddleware } from "./middleware/errorMiddleware.js";
import router from "./routes/index.js";

dotenv.config();

const PORT = process.env.APP_PORT || 5000;
const app = express();

// HTTP
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddleware);

app.listen(PORT, () => console.log("Server has been started on port " + PORT));
