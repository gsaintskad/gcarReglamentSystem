import e from "express";
import { devLog } from "../shared/dev.utils.js";
import { reglamentPool } from "./reglament.pool.js";
import * as reglamentTypes from "./reglament.types.js";

export const testCallReglamentPool = async (): Promise<any> => {
  const sql = `select * from test_table`;
  const result = await reglamentPool.query(sql);
  const { rows, rowCount } = result;
  return { rows };
};

export const addReglamentType = async (
  dto: reglamentTypes.reglamentDto,
): Promise<void> => {
  const sql = /*sql*/ `INSERT INTO reglament_types (name, description) VALUES ($1, $2)`;
  const params = [dto.name, dto.description];
  await reglamentPool.query(sql, params);
};

export const getReglamentTypes = async (): Promise<any> => {
  const sql = /*sql*/ `select * from reglament_types`;
  const result = await reglamentPool.query(sql);
  const { rows } = result;
  return { rows };
};

export const assignReglamentToCar = async (
  dto: reglamentTypes.carReglamentDto,
): Promise<void> => {
  const assignDto = { ...dto }; // Defensive copy

  if (process.env.ENV === "DEV") {
    assignDto.mileage_stamp -= 10000;
  }

  let sql = /*sql*/ `
    INSERT INTO cars_to_reglaments (
      reglament_type_id, 
      car_id, 
      auto_park_id, 
      mileage_stamp, 
      mileage_deadline, 
      mileage_before_deadline_to_remember, 
      created_by_telegram_id, 
      updated_by_telegram_id, 
      license_plate
      ${assignDto.comment ? ", comment" : ""}
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9
      ${assignDto.comment ? ", $10" : ""}
    )
  `;

  const params = [
    assignDto.reglament_type_id,
    assignDto.car_id,
    assignDto.auto_park_id,
    assignDto.mileage_stamp,
    assignDto.mileage_deadline,
    assignDto.mileage_before_deadline_to_remember,
    assignDto.telegram_id,
    assignDto.telegram_id,
    assignDto.license_plate,
  ];

  // Conditionally add comment to parameters array
  if (assignDto.comment) {
    params.push(assignDto.comment);
  }

  devLog("quering ... ", sql, params);
  await reglamentPool.query(sql, params);
};

export const getCarReglaments = async (): Promise<
  reglamentTypes.carReglamentDto[]
> => {
  const sql = /*sql*/ `select * from cars_to_reglaments WHERE is_active = true`;
  const result = await reglamentPool.query(sql);
  const { rows } = result;
  return rows as reglamentTypes.carReglamentDto[];
};
export const updateCarReglament = async (
  dto: reglamentTypes.carReglamentDto,
): Promise<void> => {
  const sql = /*sql*/ `
    UPDATE cars_to_reglaments 
    SET 
      mileage_deadline = $1,
      mileage_before_deadline_to_remember = $2,
      comment = $3,
      reglament_type_id = $4,
      updated_at = NOW(), -- Set updated_at to the current timestamp
      updated_by_telegram_id = $5 -- Set the updater's telegram ID
    WHERE id = $6
  `;
  const params = [
    dto.mileage_deadline,
    dto.mileage_before_deadline_to_remember,
    dto.comment,
    dto.reglament_type_id,
    dto.telegram_id, // This will be $5
    dto.id, // This will be $6
  ];
  devLog("Updating car reglament...", sql, params);
  await reglamentPool.query(sql, params);
};

export const markCarReglamentAsIncactive = async (
  id: number,
  telegram_id: number, // Added telegram_id as a new parameter
): Promise<void> => {
  const sql = /*sql*/ `
    UPDATE cars_to_reglaments 
    SET 
      is_active = false, 
      updated_at = NOW(), -- Set updated_at to the current timestamp
      updated_by_telegram_id = $2 -- Set the updater's telegram ID
    WHERE id = $1
  `;
  const params = [
    id,
    telegram_id, // This will be $2
  ];
  devLog("Marking car reglament as inactive...", sql, params);
  await reglamentPool.query(sql, params);
};
export const getLastCarAcutalization = async (): Promise<Date | null> => {
  const sql = /*sql*/ `
    SELECT MAX(last_actualization) FROM cars;
  `;
  const result = await reglamentPool.query(sql);
  const { rows } = result;
  const [row] = rows as [{ max: Date }];
  const { max: last_actualization } = row;
  return last_actualization;
};
export const getAvailableCarListByLicensePlate = async (searchTerm: string): Promise<
  reglamentTypes.AvailableCar[]
> => {
  const licensePlateProto = `%${searchTerm}%`;

  const sql = /*sql*/ `
    SELECT cars.car_id, cars.license_plate, cars.actual_mileage, cars.last_actualization, cars.auto_park_id 
      FROM cars
      LIKE $1
    `;
  const { rows } = await reglamentPool.query(sql, [licensePlateProto]);
  return rows as reglamentTypes.AvailableCar[];
};
export const getCarMileagesByCarIds = async (carIds: string[]): Promise<
  { car_id: string, actual_mileage: number }[]
> => {
  const sql = /*sql*/ `
    SELECT cars.car_id, cars.actual_mileag FROM cars where cars.car_id = ANY($1)
    `;
  const { rows } = await reglamentPool.query(sql, [carIds]);
  return rows as { car_id: string, actual_mileage: number }[];
};
