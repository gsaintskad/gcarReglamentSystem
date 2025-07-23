import { getAllCars } from "../myTaxi.utils.js";
import * as myTaxiTypes from "../myTaxi.types.js";
export const getCars = async () => {
  const { rows: cars }: { rows: myTaxiTypes.getCarsJson[] } =
    await getAllCars();
  return cars;
};
