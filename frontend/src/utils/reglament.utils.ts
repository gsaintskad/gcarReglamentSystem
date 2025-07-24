import api from "@/api/reglamentSystem.api";
import * as reglamentTypes from "@/types/reglament.types";

export const getReglamentTypes = async () => {
  const { reglamentTypes } = (await api.get("/reglaments/types")) as {
    reglamentTypes: reglamentTypes.reglamentType[];
  };
  return reglamentTypes;
};
