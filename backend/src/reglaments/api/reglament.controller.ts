// src/reglament/reglament.controller.ts
import { Request, Response } from "express";
import * as reglamentService from "./reglament.service.js"; // Note the .js extension
import { devLog } from "../../shared/dev.utils.js";
import * as reglamentTypes from "../reglament.types.js";

export const addReglamentTypeEndpoint = async (req: Request, res: Response) => {
  try {
    devLog("adding reglament type...");
    const { body: dto }: { body: reglamentTypes.reglamentDto } = req;
    await reglamentService.addReglamentTypeHandler(dto);
    res.status(204).json({ data: { message: "success" } });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
export const getReglamentTypesEndpoint = async (
  req: Request,
  res: Response
) => {
  try {
    devLog("getting reglament type...");
    const { reglamentTypes } =
      await reglamentService.getReglamentTypesHandler();
    res.status(200).json({ reglamentTypes });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
export const assignReglamentToCarEndpoint = async (
  req: Request,
  res: Response
) => {
  try {
    devLog("assigning reglament to car...");
    const { body: dto }: { body: reglamentTypes.assignReglamentToCarDto } = req;
    await reglamentService.assignReglamentToCarHandler(dto);
    res.status(204).json({ data: { message: "success" } });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
