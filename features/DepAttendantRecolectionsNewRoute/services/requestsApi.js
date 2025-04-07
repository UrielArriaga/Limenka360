import { api } from "../../../services/api";

export default class RequestsApi {
  async getPurcharsesOrders(skip) {
    let params = {
      include: "provider,taxinformation,provideraddress",
      count: 1,
      limit: 10,
      skip,
    };
    return await api.get(`purchaseorders`, { params });
  }
  async getPickUps(data) {
    let params = {
      where: JSON.stringify(data),
    };
    return await api.get(`pickups`, { params });
  }
  async getPurcharseOrderById(id) {
    let params = {
      include: "provider,taxinformation,provideraddress",
    };
    return await api.get(`purchaseorders/${id}`, { params });
  }
  async getDrivers(query) {
    let params = {
      where: JSON.stringify(query),
    };
    return await api.get(`drivers`, { params });
  }

  normalizeDrivers(item) {
    if (item) {
      return {
        value: item.id,
        label: item.name,
      };
    }
  }
  async getDataTransportunits(query) {
    let params = {
      where: JSON.stringify(query),
    };
    return await api.get(`transportunits`, { params });
  }
  async createNewRecoleccion(body){
    return await api.post(`pickups`, body);
  }
}
