import api from "@/api/reglamentSystem.api";
import * as reglamentTypes from "@/types/reglament.types";

export const getReglamentTypes = async () => {
  const { data } = await api.get("/reglaments/types");
  const { reglamentTypes } = data;
  return reglamentTypes as reglamentTypes.reglamentType[];
};
