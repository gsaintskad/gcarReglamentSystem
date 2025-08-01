// src/myTaxi/myTaxi.router.ts
import { Router } from "express";
import * as myTaxiController from "./myTaxi.controller.js"; // Note the .js extension

const myTaxiRouter = Router();

// myTaxiRouter.get("/cars", myTaxiController.getCarsEndpoint);
myTaxiRouter.get(
  "/cars",
  myTaxiController.getCarReglamentDataByLicensePlateEndpoint,
);
myTaxiRouter.get(
  "/mileage",
  myTaxiController.getMyTaxiCarActualMileageEndpoint,
);
myTaxiRouter.post(
  "/mileage",
  myTaxiController.getMyTaxiCarActualMileagesEndpoint,
);
myTaxiRouter.get("/auto-parks", myTaxiController.getMyTaxiAutoParksEndpoint);
export default myTaxiRouter;
