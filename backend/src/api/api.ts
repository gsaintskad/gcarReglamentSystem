import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import coreRouter from "./core/core.route.js";
import cors from "cors";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const apiLocation = process.env.API_LOCATION ?? "/api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*", // <--- Explicitly allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // You can still specify methods
  allowedHeaders: ["Content-Type", "Authorization"], // And headers
  // Note: Do NOT set 'credentials: true' here if origin is '*'
};

app.use(cors(corsOptions));
app.use(apiLocation, coreRouter);
export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
    console.log(`Access it at: http://localhost:${PORT}`);
  });
};
