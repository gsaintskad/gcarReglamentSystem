import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import coreRouter from "./core/core.route.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const apiLocation = process.env.API_LOCATION ?? "/api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiLocation, coreRouter);

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
    console.log(`Access it at: http://localhost:${PORT}`);
  });
};
