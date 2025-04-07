import dayjs from "dayjs";
import { api } from "../../../services/api";

class DeliveryRoutesApi {
  async getDeliveryRoutes(limit = 20, page = 1, orderBy, query) {
    let params = {
      limit,
      skip: page,
      count:1,
      order: orderBy,
      where: JSON.stringify(query),
    };
    return await api.get(`deliveryroutes/include`, { params });
  }

  async getDeliveryRouteById(id) {
    return await api.get(`deliveryroutes/${id}`);
  }
  async getOrder(id) {
    let params = {
      include:
        "oportunity,oportunity.productsoportunities,address,address.entity.city.postal,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime",
    };
    return await api.get(`/orders/${id}`, { params });
  }
  async putDeliveryRoute(id, body = {}) {
    return await api.put(`deliveryroutes/${id}`, body);
  }
  async getInventoryexits(deliveryrouteId) {
    let params = {
      where: { deliveryrouteId: deliveryrouteId },
      include: "order",
    };
    return await api.get(`/inventoryexits`, { params });
  }
  async putDeliveryRoute(id, body = {}) {
    return await api.put(`deliveryroutes/${id}`, body);
  }
  normalizeDeliveryRoutes(routes) {
    return {
      id: routes?.id || "Sin id",
      data: routes,
      assigned_date: routes?.assigned_date ? dayjs(routes?.assigned_date).format("DD/MM/YYYY") : "Sin Fecha",
      name: routes?.driver?.name || "Sin chofer",
      brand: routes?.transportunit?.brand || "Sin unidad",
      km_output: routes?.km_output || "Sin km aún",
      km_arrival: routes?.km_arrival || "Sin km aún",
    };
  }
}

export default DeliveryRoutesApi;
