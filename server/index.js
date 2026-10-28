import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { pool } from "./db/pool.js";
const app = express();

if (!process.env.CLIENT_URL) {
  throw new Error("Не задан CLIENT_URL в .env");
}

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await pool.query("SELECT 1");

    app.listen(PORT, () => {
      console.log(`Server: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Не удалось запустить сервер:", error);
    await pool.end();
    process.exit(1);
  }
}

startServer();
