export interface reglamentDto {
  name: string;
  description: string;
}

export interface carReglamentDto {
  id?: number;
  reglament_type_id: string;
  car_id: string;
  license_plate: string;
  auto_park_id: string;
  mileage_deadline: number;
  mileage_before_deadline_to_remember: number;
  telegram_id: number;
  comment: string;
  mileage_stamp: number;
}
export interface AvailableCar {
  car_id: string;
  license_plate: string;
  actual_mileage: number;
  last_actualization: Date;
  auto_park_id: string;
}
