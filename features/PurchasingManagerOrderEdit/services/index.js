import { api } from "../../../services/api";

export default class ApiRequestProvider {
  async getProvider(data) {
    let query = {
      id: data,
    };
    let params = {
      include: "company,company.entity,company.city,company.postal",
      where: JSON.stringify(query),
    };
    return await api.get(`providers`, { params });
  }
  async getAddress(query) {
    let params = {
      include: "city,entity,postal",
      join: "c,e,p",
      where: JSON.stringify(query),
    };
    return await api.get(`provideraddresses`, { params });
  }
  async postPurchaseOrders(bodyOrder) {
    return await api.post(`purchaseorders`, bodyOrder);
  }
  async postCreatePDF(form) {
    return await api.post(`convert/pdf`, form);
  }
  async putPurchaseOrder(url, id) {
    let body = { url };
    return await api.put(`purchaseorders/${id}`, body);
  }
  async getPurcharseOrdersByUser(query) {
    let params = {
      count: 1,
      where: JSON.stringify(query),
    };
    return await api.get(`purchaseorders`, { params });
  }
}
