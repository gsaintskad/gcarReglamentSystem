import * as myTaxiRepo from "../myTaxi.queries.js";
import * as reglamentsRepo from '../../reglaments/reglament.queries.js'
import * as myTaxiTypes from "../myTaxi.types.js";
// export const getCars = async () => {
//   const { rows: cars }: { rows: myTaxiTypes.getCarsJson[] } =
//     await getAllCars();
//   return cars;
// };
export const getCarReglamentDataByLicensePlateHandler = async (
  license_plate: string,
) => {
  const { rows }: { rows: myTaxiTypes.getCarsJson[] } =
    await myTaxiRepo.getCarReglamentDataByLicensePlate(license_plate);
  const [car] = rows;
  return car;
};
export const getMyTaxiCarActualMileageHandler = async (car_id: string) => {
  const { rows } = await myTaxiRepo.getMyTaxiCarActualMileage(car_id);
  const [car] = rows;
  return car.actual_mileage;
};
export const getMyTaxiCarActualMileagesHandler = async (car_ids: string[]) => {
  const { rows: actualMileages } =
    await myTaxiRepo.getMyTaxiCarActualMileages(car_ids);

  return actualMileages.reduce((acc, curr) => {
    acc[curr.car_id] = curr.actual_mileage;

    return acc;
  }, {});
};
export const getMyTaxiAutoParksHandler = async () => {
  const { rows: autoParks } = await myTaxiRepo.getAllAutoParks();
  return autoParks;
};