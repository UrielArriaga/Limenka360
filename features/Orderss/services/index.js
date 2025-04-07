import { api } from "../../../services/api";

export class OrdersAdminServices {
  async getOrders(params) {
    return await api.get("/orders", {
      params,
    });
  }
  async getProductsOportunity(id) {
    if (!id) {
      throw new Error("El id es requerido");
    }

    let params = {
      include: "product,product.category,product.brand",
      where: JSON.stringify({
        oportunityId: id,
      }),
    };
    return await api.get(`/productsoportunities`, { params });
  }
  async getTrackings(id) {
    if (!id) {
      throw new Error("El id es requerido");
    }

    let params = {
      include: "phase,oportunity,oportunity.prospect",
      order: "-createdAt",
      where: JSON.stringify({
        prospectId: id,
      }),
    };
    return await api.get(`/trackings`, { params });
  }

  async getCounterAll(params) {
    let response = await api.get(`orders`, { params });
    let all = response.data.count || 0;
    return all;
  }

  async getCounterPending(params) {
    let response = await api.get(`orders`, { params });
    let pending = response.data.count || 0;
    return pending;
  }

  async getCounterApprove(params) {
    let response = await api.get(`orders`, { params });
    let approve = response.data.count || 0;
    return approve;
  }

  async getCounterDenied(params) {
    let response = await api.get(`orders`, { params });
    let denied = response.data.count || 0;
    return denied;
  }

  async getOrderId(id, params) {
    return await api.get(`/orders/${id}`, { params });
  }
}
