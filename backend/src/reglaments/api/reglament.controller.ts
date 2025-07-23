// src/reglament/reglament.controller.ts
import { Request, Response } from "express";
import * as reglamentService from "./reglament.service.js"; // Note the .js extension
import { devLog } from "../../shared/dev.utils.js";

export const addReglamentTypeEndpoint = async (req: Request, res: Response) => {
  try {
    devLog("adding reglament type...");
    const { body: dto } = req;
    const cars = await reglamentService.addReglamentTypeHandler(dto);
    res.status(200).json({ cars });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
