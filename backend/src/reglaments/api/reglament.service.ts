import e from "express";
import * as reglamentRepo from "../reglament.queries.js";
import * as reglamentTypes from "../reglament.types.js";

export const addReglamentTypeHandler = async (
  dto: reglamentTypes.reglamentDto,
) => {
  await reglamentRepo.addReglamentType(dto);
  return true;
};
export const getReglamentTypesHandler = async () => {
  const { rows: reglamentTypes } = await reglamentRepo.getReglamentTypes();
  return { reglamentTypes };
};
export const assignReglamentToCarHandler = async (
  dto: reglamentTypes.carReglamentDto,
) => {
  await reglamentRepo.assignReglamentToCar(dto);
  return true;
};
export const getCarReglamentsHandler = async () => {
  const carReglaments = await reglamentRepo.getCarReglaments();
  return { carReglaments };
};
export const updateCarReglamentHandler = async (
  dto: reglamentTypes.carReglamentDto,
) => {
  await reglamentRepo.updateCarReglament(dto);
  return true;
};
export const markCarReglamentAsIncactiveHandler = async (
  id: number,
  telegram_id: number,
) => {
  await reglamentRepo.markCarReglamentAsIncactive(id, telegram_id);
  return true;
};
export const getAvailableCarListHandler = async () => {
  const availableCars = await reglamentRepo.getAvailableCarList();
  return { availableCars };
};