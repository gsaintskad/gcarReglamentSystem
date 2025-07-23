import { reglamentPool } from "./reglament.pool.js";
import { reglamentDto } from "./reglament.types.js";

export const testCallReglamentPool = async (): Promise<any> => {
  const sql = `select * from test_table`;
  const result = await reglamentPool.query(sql);
  const { rows, rowCount } = result;
  return { rows };
};
export const addReglamentType = async (dto: reglamentDto): Promise<void> => {
  const sql = /*sql*/ `INSERT INTO reglament_types (name, description) VALUES ('${dto.name}', '${dto.description}')`;
  const result = await reglamentPool.query(sql);
};
