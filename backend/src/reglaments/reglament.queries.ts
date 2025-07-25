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
  dto: reglamentTypes.reglamentDto
): Promise<void> => {
  const sql = /*sql*/ `INSERT INTO reglament_types (name, description) VALUES ('${dto.name}', '${dto.description}')`;
  const result = await reglamentPool.query(sql);
};
export const getReglamentTypes = async (): Promise<any> => {
  const sql = /*sql*/ `select * from reglament_types`;
  const result = await reglamentPool.query(sql);
  const { rows, rowCount } = result;
  return { rows };
};
export const assignReglamentToCar = async (
  dto: reglamentTypes.carReglamentDto
): Promise<void> => {
  if ((process.env.ENV = "DEV")) {
    dto.mileage_stamp -= 10000;
  }
  const sql = /*sql*/ `INSERT INTO cars_to_reglaments 
  (reglament_type_id, car_id, auto_park_id, mileage_stamp,mileage_deadline, mileage_before_deadline_to_remember, 
  created_by_telegram_id, updated_by_telegram_id,license_plate${
    dto.comment ? `,comment` : ""
  }) VALUES ('${dto.reglament_type_id}', '${dto.car_id}', '${
    dto.auto_park_id
  }',${dto.mileage_stamp}, ${dto.mileage_deadline}, ${
    dto.mileage_before_deadline_to_remember
  },${dto.telegram_id},${dto.telegram_id},'${dto.license_plate}'${
    dto.comment ? `,'${dto.comment}'` : ""
  })`;
  devLog("quering ... ", sql);
  await reglamentPool.query(sql);
};
export const getCarReglaments = async (): Promise<
  reglamentTypes.carReglamentDto[]
> => {
  const sql = /*sql*/ `select * from cars_to_reglaments`;
  const result = await reglamentPool.query(sql);
  const { rows, rowCount } = result;
  return rows as reglamentTypes.carReglamentDto[];
};
export const updateCarReglament = async (
  dto: reglamentTypes.carReglamentDto
): Promise<void> => {
  const sql = /*sql*/ `UPDATE cars_to_reglaments SET mileage_deadline = ${dto.mileage_deadline},
  mileage_before_deadline_to_remember = ${dto.mileage_before_deadline_to_remember},
  comment = '${dto.comment}' ,
  reglament_type_id= ${dto.reglament_type_id}
  WHERE id = ${dto.id}`;
  await reglamentPool.query(sql);
};
export const markCarReglamentAsIncactive= async (id: number): Promise<void> => {
  const sql = /*sql*/ `UPDATE cars_to_reglaments SET is_active = false WHERE id = ${id}`;
  await reglamentPool.query(sql);
};