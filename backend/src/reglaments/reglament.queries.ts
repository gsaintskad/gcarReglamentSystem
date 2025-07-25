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
export const getCarReglaments = async (
  car_id: string
): Promise<reglamentTypes.carReglamentDto[]> => {
  const sql = /*sql*/ `select * from cars_to_reglaments where car_id='${car_id}'`;
  const result = await reglamentPool.query(sql);
  const { rows, rowCount } = result;
  return rows as reglamentTypes.carReglamentDto[];
};
