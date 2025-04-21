import { api } from "../../../services/api";

export const getProspect = async prospectId => {
  try {
    const includeParams = [
      "city",
      "category",
      "entity",
      "phase",
      "ejecutive",
      "clientcompany",
      "origin",
      "clienttype",
      "specialty",
      "postal",
      "prospectslabels",
      "prospectslabels.label",
      "channel",
    ].join(",");

    const response = await api.get(`prospects/${prospectId}`, {
      params: { include: includeParams },
    });

    // const response = await api.get(`prospects/${prospectId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching prospect 🔥", error);
    throw new Error(`Error fetching prospect: ${error.message}`);
  }
};

export const updateProspectPhase = async (prospectId, phaseId) => {
  try {
    const res = await api.put(`prospects/${prospectId}`, { phaseId });
    return res.data;
  } catch (error) {
    console.error("Error al actualizar fase 🔥");
    throw new Error("Error updating phase: ", error.message);
  }
};
