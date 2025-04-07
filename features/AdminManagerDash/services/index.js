import { api } from "../../../services/api";

export const getOrdersReportgeneral = async params => {
  try {
    const response = await api.get(`orders/reportgeneral`, { params });
    return response;
  } catch (error) {
    console.error("Error fetching the orders report general:", error);
  }
};

export class OrdersAdminServices {
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
