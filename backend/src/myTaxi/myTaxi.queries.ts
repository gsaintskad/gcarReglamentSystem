import * as fs from "fs";
import { myTaxiPool } from "./myTaxi.pool.js";
import { join } from "path";
import { getCarsJson } from "./myTaxi.types.js";
import { devLog } from "../shared/dev.utils.js";

export const getCarReglamentDataByLicensePlate = async (
  license_plate: string,
) => {
  const sqlFilePath = join(
    process.cwd(),
    "src",
    "myTaxi",
    "sql",
    "getCarToCreateAReglamentByLicensePlate.sql",
  );

  // If, for some reason, your 'sql' folder is directly under 'backend' (not in 'src'):
  // const sqlFilePath = join(process.cwd(), 'sql', 'getCars.sql');
  // But the error `src/sql/getCars.sql` indicates it's likely under 'src'.
  const sql = fs.readFileSync(sqlFilePath).toString();
  devLog(sql);
  const result = await myTaxiPool.query(sql, [license_plate]);
  const { rows, rowCount } = result;
  return { rows };
};

export const getMyTaxiCarActualMileage = async (car_id: string) => {
  const sqlFilePath = join(
    process.cwd(),
    "src",
    "myTaxi",
    "sql",
    "getActualCarMileage.sql",
  );
  const sql = fs.readFileSync(sqlFilePath).toString();
  devLog(sql);
  const result = await myTaxiPool.query(sql, [car_id]);
  const { rows, rowCount } = result;
  return { rows };
};
export const getMyTaxiCarActualMileages = async (car_ids: string[]) => {
  const sqlFilePath = join(
    process.cwd(),
    "src",
    "myTaxi",
    "sql",
    "getActualCarMileages.sql",
  );
  const sql = fs.readFileSync(sqlFilePath).toString();
  devLog(sql);
  const result = await myTaxiPool.query(sql, [car_ids]);
  const { rows, rowCount } = result;
  return { rows };
};
export const getAllAutoParks = async () => {
  const sql = `select * from auto_parks`;
  const result = await myTaxiPool.query(sql);
  const { rows, rowCount } = result;
  return { rows };
};
export const getActualMyTaxiCarList = async (last_actualization: Date) => {
  const sqlFilePath = join(
    process.cwd(),
    "src",
    "myTaxi",
    "sql",
    "getActualCarList.sql",
  );

  const sql = fs.readFileSync(sqlFilePath).toString();

  const result = await myTaxiPool.query(sql, [last_actualization]);
  const { rows, rowCount } = result;
  return { rows };
};
