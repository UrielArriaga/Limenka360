import { api } from "../../../services/api";

export default class RequestApiEntries {
  async getProducts(limit = 15, page = 1, query) {
    let params = {
      count: 1,
      order: "name",
      skip:page,
      limit,
      where:JSON.stringify(query)
    };
    return await api.get(`/products`, { params });
  }

  async postEntryManual(body){
    return await api.post(`inventoryentries/manual`, body)
  }
}
