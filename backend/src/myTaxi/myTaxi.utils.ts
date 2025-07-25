import * as fs from "fs";
import { myTaxiPool } from "./myTaxi.pool.js";
import { join } from "path";
import { getCarsJson } from "./myTaxi.types.js";
import { devLog } from "../shared/dev.utils.js";

export const getCarReglamentDataByLicensePlate = async (
  license_plate: string
) => {
  const sqlFilePath = join(
    process.cwd(),
    "src",
    "myTaxi",
    "sql",
    "getCarToCreateAReglamentByLicensePlate.sql"
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
    "getActualCarMileage.sql"
  );
  const sql = fs.readFileSync(sqlFilePath).toString();
  devLog(sql);
  const result = await myTaxiPool.query(sql, [car_id]);
  const { rows, rowCount } = result;
  return { rows };
};
