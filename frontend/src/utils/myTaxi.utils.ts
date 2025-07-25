import api from "@/api/reglamentSystem.api";

export const getMyTaxiCarByLicensePlate = async (license_plate: string) => {
  const response = await api.get(`/myTaxi/cars?license_plate=${license_plate}`);
  const { car } = response.data;
  console.log(car);
  return car;
};
export const getMyTaxiCarActualMileage = async (car_id: string) => {
  const response = await api.get(`/myTaxi/mileage?car_id=${car_id}`);
  const { mileage } = response.data;

  if (!mileage) {
    return 0;
  }
  return mileage;

}