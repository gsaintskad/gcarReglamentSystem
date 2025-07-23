import { addReglamentType } from "../reglament.queries.js";
import { reglamentDto } from "../reglament.types.js";

export const addReglamentTypeHandler = async (dto: reglamentDto) => {
  await addReglamentType(dto);
  return true;
};
