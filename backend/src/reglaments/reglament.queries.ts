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
  dto: reglamentTypes.assignReglamentToCarDto
): Promise<void> => {
  const sql = /*sql*/ `INSERT INTO reglament_to_cars (reglament_id, car_id) VALUES ('${dto.reglamentId}', '${dto.carId}')`;
  devLog("quering ... ", sql);

  // const result = await reglamentPool.query(sql);
};
