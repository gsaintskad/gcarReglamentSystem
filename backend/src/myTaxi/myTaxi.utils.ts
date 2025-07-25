import * as fs from "fs";
import { myTaxiPool } from "./myTaxi.pool.js";
import { join } from "path";
import { getCarsJson } from "./myTaxi.types.js";

export const getAllCars = async (): Promise<{ rows: getCarsJson[] }> => {
  const sqlFilePath = join(
    process.cwd(),
    "src",
    "myTaxi",
    "sql",
    "getCars.sql"
  );

  // If, for some reason, your 'sql' folder is directly under 'backend' (not in 'src'):
  // const sqlFilePath = join(process.cwd(), 'sql', 'getCars.sql');
  // But the error `src/sql/getCars.sql` indicates it's likely under 'src'.

  const sql = fs.readFileSync(sqlFilePath).toString();
  const result: { rows: getCarsJson[]; rowCount: number | null } =
    await myTaxiPool.query(sql);
  const { rows, rowCount } = result;
  return { rows };
};
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
  const result = await myTaxiPool.query(sql, [license_plate]);
  const { rows, rowCount } = result;
  return { rows };
};
