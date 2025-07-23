// src/myTaxi/myTaxi.controller.ts
import { Request, Response } from "express";
import * as myTaxiService from "./myTaxi.service.js"; // Note the .js extension

export const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await myTaxiService.getCars();
    res.status(200).json({ data: cars });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
