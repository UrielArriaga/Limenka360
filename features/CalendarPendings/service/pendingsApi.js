import { api } from "../../../services/api";

export const getAllPendings = async (customParams = {}) => {
  try {
    const defaultParams = {
      // all: true,
      count: 1,
    };

    const params = { ...defaultParams, ...customParams };

    const { data } = await api.get("pendings", { params });
    return data.results;
  } catch (error) {
    console.error("Error trying to get pendings 🔥", error);
    throw new Error(`Error fetching pendings: ${error.message}`);
  }
};

export const getPending = async (id) => {
  try {
    const data = await api.get(`pendings/${id}`, {
      params: { all: true, count: 1 },
    });

    return data.data;
  } catch (error) {
    console.error("Error trying to get pending 🔥");
    throw new Error("Error fetching pending: ", error.message);
  }
};

export const createPending = async (data) => {
  try {
    const res = await api.post("pendings/massive", data);
    return res.data;
  } catch (error) {
    console.error("Error al crear pendientes:", error);
    throw new Error("Error creating peding: ", error.message);
  }
};

export const updatePending = async (id, body) => {
  try {
    const res = await api.put(`pendings/${id}`, body);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar pendiente:", error);
    throw new Error("Error updating pending: " + error.message);
  }
};

export const getPendingsTypes = async () => {
  try {
    const data = await api.get("pendingstypes?all=true&count=1");

    return data.data.results;
  } catch (error) {
    console.error("Error trying to get pendings types 🔥");
    throw new Error("Error fetching events: ", error.message);
  }
};

export const getPendingType = async (id) => {
  try {
    const data = await api.get(`pendingstypes/${id}`);

    return data.data;
  } catch (error) {
    console.error("Error trying to get pendings types 🔥");
    throw new Error("Error fetching events: ", error.message);
  }
};
