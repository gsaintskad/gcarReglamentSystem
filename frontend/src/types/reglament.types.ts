export interface reglamentDto {
  name: string;
  description: string;
}

export interface carReglamentDto {
  id?: number;
  reglament_type_id: string;
  reglament_name:string;
  reglament_comment:string;
  car_id: string;
  auto_park_id: string;
  mileage_deadline: number;
  mileage_before_deadline_to_remember: number;
  telegram_id: number;
  comment: string;
  mileage_stamp: number;
}
export interface reglamentType {
  id: number;
  name: string;
  description: string;
}
