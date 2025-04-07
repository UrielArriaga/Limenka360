import dayjs from "dayjs";
import { api } from "../../../services/api";

class FleetChiefRutasApi {
  async getDeliveryRoutes(limit = 20, page = 1, orderBy, query) {
    let params = {
      limit,
      skip: page,
      order: orderBy || "-createdAt",
      include: "driver,trasportunit",
      join: "driver,trasportunit",
      where: JSON.stringify(query),
    };
    return await api.get(`deliveryroutes/include`, { params });
  }
  normalizeDeliveryRoutes(routes) {
    console.log("routes", routes);
    return {
      id: routes?.id || "Sin id",
      data: routes,
      alias: routes.alias,
      assigned_date: dayjs(routes?.assigned_date).format("DD/MM/YYYY") || "Sin Fecha",
      name: routes?.driver?.name || "Sin chofer",
      brand: routes?.transportunit?.brand || "Sin unidad",
      km_output: routes?.km_output || "Sin km aún",
      km_arrival: routes?.km_arrival || "Sin km aún",
    };
  }
}

export default FleetChiefRutasApi;
