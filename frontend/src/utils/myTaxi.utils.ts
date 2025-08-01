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
};
export const updateCarReglament = async (dto: {
  id: number;
  comment: string;
  mileage_before_deadline_to_remember: number;
  mileage_deadline: number;
  reglament_type_id: number;
}) => {
  const response = await api.put(`/reglaments/cars`, dto);
};
export const getMyTaxiCarActualMileages = async (car_ids: string[]) => {
  const response = await api.post(`/myTaxi/mileage`, car_ids);
  console.log(response);
  const { mileages } = response.data;
  return mileages;
};
