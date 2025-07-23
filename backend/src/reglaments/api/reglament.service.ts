import * as reglamentRepo from "../reglament.queries.js";
import * as reglamentTypes from "../reglament.types.js";

export const addReglamentTypeHandler = async (
  dto: reglamentTypes.reglamentDto
) => {
  await reglamentRepo.addReglamentType(dto);
  return true;
};
export const getReglamentTypesHandler = async () => {
  const { rows: reglamentTypes } = await reglamentRepo.getReglamentTypes();
  return { reglamentTypes };
};
export const assignReglamentToCarHandler = async (
  dto: reglamentTypes.assignReglamentToCarDto
) => {
    await reglamentRepo.assignReglamentToCar(dto);
    return true;
};
