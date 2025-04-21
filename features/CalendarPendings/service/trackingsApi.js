import { api } from "../../../services/api";

export const createTracking = async data => {
  try {
    console.log(data);

    const res = await api.post("trackings", data);
    return res.data;
  } catch (error) {
    console.error("Error al crear tracking:", error);
    throw new Error("Error creating tracking: ", error.message);
  }
};

export const updateTracking = async (id, data) => {
  try {
    const res = await api.put(`trackings/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar tracking:", error);
    throw new Error("Error updating tracking: ", error.message);
  }
};
