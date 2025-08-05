// src/myTaxi/myTaxi.controller.ts
import { Request, Response } from "express";
import * as myTaxiService from "./myTaxi.service.js"; // Note the .js extension
import { devLog } from "../../shared/dev.utils.js";

// export const getCarsEndpoint = async (req: Request, res: Response) => {
//   try {
//     devLog("Getting cars...");
//     const cars = await myTaxiService.getCars();
//     res.status(200).json({ cars });
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     res.status(500).json({ message: "An unexpected error occurred" });
//   }
// };
export const getCarReglamentDataByLicensePlateEndpoint = async (
  req: Request,
  res: Response,
) => {
  try {
    devLog("Getting cars...");
    const { license_plate } = req.query;
    if (!license_plate) {
      return res.status(400).json({ message: "License plate is required" });
    }
    const car = await myTaxiService.getCarReglamentDataByLicensePlateHandler(
      license_plate as string,
    );
    res.status(200).json({ car });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
export const getMyTaxiCarActualMileageEndpoint = async (
  req: Request,
  res: Response,
) => {
  try {
    devLog("Getting cars...");

    const { car_id } = req.query;
    if (!car_id) {
      return res.status(400).json({ message: "Car id is required" });
    }
    const mileage = await myTaxiService.getMyTaxiCarActualMileageHandler(
      car_id as string,
    );
    res.status(200).json({ mileage });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
export const getMyTaxiCarActualMileagesEndpoint = async (
  req: Request,
  res: Response,
) => {
  try {
    devLog("Getting cars...");
    console.log(req.body);
    const car_ids = req.body;
    if (!car_ids) {
      return res.status(400).json({ message: "Car ids are required" });
    }
    const mileages =
      await myTaxiService.getMyTaxiCarActualMileagesHandler(car_ids);
    res.status(200).json({ mileages });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("An unexpected error occurred");
  }
};
export const getMyTaxiAutoParksEndpoint = async (
  req: Request,
  res: Response,
) => {
  try {
    devLog("Getting auto parks...");
    const autoParks = await myTaxiService.getMyTaxiAutoParksHandler();
    res.status(200).json({ data: autoParks });
  } catch (error) {}
};
