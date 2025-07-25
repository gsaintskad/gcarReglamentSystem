import api from "@/api/reglamentSystem.api";

export const getMyTaxiCarByLicensePlate = async (license_plate: string) => {
  const response = await api.get(`/myTaxi/cars?license_plate=${license_plate}`);
  const { car } = response.data;
  console.log(car);
  return car;
};
