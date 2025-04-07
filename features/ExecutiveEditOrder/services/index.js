import { api } from "../../../services/api";

export class EditOrderService {
  async getDataOrder(id) {
    let params = {
      include:
        "bill,bill.address,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.taxregime,address,address.city,address.entity,address.postal,oportunity,oportunity.prospect,oportunity.typesale,orderstatus,paymentaccount,paymentway",
    };
    let response = await api.get(`/orders/${id}`, { params });
    let order = response.data || {};
    return order;
  }
  async getOrderFiles(id) {
    let query = {
      orderId: id,
    };
    let params = {
      include: "filestype",
      where: JSON.stringify(query),
    };
    let response = await api.get(`/documents`, { params });
    let order = response.data.results || [];
    return order;
  }
  async getEntitiesAndCityByPostalCode(code) {
    if (!code) {
      throw new Error("Postal code is required");
    }
    let params = {
      limit: 1,
      include: "city,city.entity",
      where: JSON.stringify({
        postal_code: code,
      }),
    };
    return await api.get("/postals", { params });
  }

  async getCitiesByEntityId(entityId) {
    if (!entityId) {
      throw new Error("Entity id is required");
    }
    let params = {
      all: 1,
      order: "name",
      where: JSON.stringify({
        entityId: entityId,
      }),
    };
    return await api.get("/cities", { params });
  }
}
