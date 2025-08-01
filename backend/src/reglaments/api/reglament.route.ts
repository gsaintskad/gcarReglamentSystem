// src/reglament/reglament.router.ts
import { Router } from "express";
import * as reglamentController from "./reglament.controller.js"; // Note the .js extension
import { logger } from "../../api/core/middleware/logger.js";

const reglamentRouter = Router();
reglamentRouter.post("/types", reglamentController.addReglamentTypeEndpoint);
reglamentRouter.get("/types", reglamentController.getReglamentTypesEndpoint);
reglamentRouter.post("/cars", reglamentController.createCarReglamentEndpoint);
reglamentRouter.get("/cars", reglamentController.getCarReglamentsEndpoint);
reglamentRouter.put("/cars", reglamentController.updateCarReglamentEndpoint);
reglamentRouter.delete(
  "/cars",
  reglamentController.markCarReglamentAsIncactiveEndpoint,
);
reglamentRouter.get('/cars/available', reglamentController.getAvailableCarListEndpoint)
export default reglamentRouter;
