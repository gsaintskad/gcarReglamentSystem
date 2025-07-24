import api from "@/api/reglamentSystem.api";
import * as reglamentTypes from "@/types/reglament.types";

export const getReglamentTypes = async () => {
  const { data } = await api.get("/reglaments/types");
  const { reglamentTypes } = data;
  return reglamentTypes as reglamentTypes.reglamentType[];
};
export const getCarReglamentByCarId = async (car_id: string) => {
  const response = await api.get(`/reglaments/cars?car_id=${car_id}`);
  const { data } = response;
  const { carReglaments } = data;
  return carReglaments as reglamentTypes.carReglamentDto[];
};
