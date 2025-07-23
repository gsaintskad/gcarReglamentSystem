// src/myTaxi/myTaxi.controller.ts
import { Request, Response } from "express";
import * as myTaxiService from "./myTaxi.service.js"; // Note the .js extension
import { devLog } from "../../shared/dev.utils.js";

export const getCars = async (req: Request, res: Response) => {
  try {
    devLog("Getting cars...");
    const cars = await myTaxiService.getCars();
    res.status(200).json({ cars });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
