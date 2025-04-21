import { api } from "../../../services/api";

export const getAllPhase = async () => {
  try {
    const data = await api.get("phases?limit=100&order=name");

    return data.data.results;
  } catch (error) {
    console.error("Error trying to get phases 🔥");
    throw new Error("Error fetching phases: ", error.message);
  }
};
