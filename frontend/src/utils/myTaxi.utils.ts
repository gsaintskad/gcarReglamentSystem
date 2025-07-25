import api from "@/api/reglamentSystem.api";
import { getCarsJson } from "@/types/myTaxi.types";

export const getMyTaxiCars = async () => {
  const response = await api.get("/myTaxi/cars");
  const { data } = response;
  const { cars } = data;
  return cars as getCarsJson[];
};

export const getMyTaxiCarById = async (car_id: string) => {
  const response = await api.get(`/myTaxi/cars?car_id=${car_id}`);
  const { data } = response;
  const { cars } = data;
  return cars as getCarsJson[];
};
