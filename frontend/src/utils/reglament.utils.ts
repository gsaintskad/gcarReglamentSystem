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
export const getCarReglaments = async () => {
  const response = await api.get(`/reglaments/cars`);
  const { data } = response;
  const { carReglaments } = data;
  return carReglaments as reglamentTypes.carReglamentDto[];
};

export const updateCarReglament = async (
  dto: {
    comment: string;
    reglament_type_id: number;
    mileage_deadline: number;
    mileage_before_deadline_to_remember: number;
    telegram_id: number;
  },
  reglament: reglamentTypes.carReglamentDto,
) => {
  const { id } = reglament;
  const response = await api.put(`/reglaments/cars`, { ...dto, id });
  const { data } = response;
  return true;
};
export const deleteCarReglament = async (id: number, telegram_id: number) => {
  const response = await api.delete(
    `/reglaments/cars?id=${id}&telegram_id=${telegram_id}`,
  );
  const { data } = response;
  return true;
};
export const getAvailableCarList = async () => {
  const { data } = await api.get(`/reglaments/cars/available`);
  return data.data as reglamentTypes.AvailableCar[];
};
export const getAutoParks = async () => {
  const { data } = await api.get(`/myTaxi/auto-parks`);
  return data.data as reglamentTypes.AutoPark[];
};
