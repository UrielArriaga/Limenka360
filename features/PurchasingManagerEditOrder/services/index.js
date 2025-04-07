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

  async getPaymentsPurchase(orderId) {
    let params = {
      count: 1,
      include: "purchaseorder,purchaseorder.statuspoo",
      where: JSON.stringify({ purchaseorderId: orderId }),
      // where:JSON.stringify({purchaseorderId:"yrEvIl37fMjuMp3PtuBo5wH5"})
    };
    return await api.get(`paymentspurchaseorder`, { params });
  }

  async putPaymentPurchaseOrder(orderId, body) {
    return await api.put(`paymentspurchaseorder/${orderId}`, body);
    // return await api.put(`paymentspurchaseorder/yrEvIl37fMjuMp3PtuBo5wH5`,body);
  }
}
