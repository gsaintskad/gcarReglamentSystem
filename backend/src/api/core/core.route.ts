// src/routes/api.router.ts
import { Router, Request, Response } from "express";
import myTaxiRouter from "../../myTaxi/api/myTaxi.route.js";
import reglamentRouter from "../../reglaments/api/reglament.route.js";
import { logger } from "./middleware/logger.js";

const coreRouter = Router();

coreRouter.use("/", logger);
coreRouter.get("/status", (req: Request, res: Response) => {
  res.status(200).json({
    status: "Server is up and running!",
    timestamp: new Date().toISOString(),
  });
});
coreRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello from the GCAR REGLAMENT SYSTEM API Server!");
});
coreRouter.use("/myTaxi", myTaxiRouter);
coreRouter.use("/reglamnets", reglamentRouter);

export default coreRouter;
