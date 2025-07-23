export interface reglamentDto {
  name: string;
  description: string;
}

export interface assignReglamentToCarDto {
  reglament_type_id: string;
  car_id: string;
  auto_park_id: string;
  mileage_deadline: number;
  mileage_before_deadline_to_remember: number;
  telegram_id: number;
  comment: string;
  mileage_stamp: number;
}
