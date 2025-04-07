import { api } from "../../../services/api";

export default class RequestApiEntries {
  async getProducts(limit = 15, page = 1, query) {
    let params = {
      count: 1,
      order: "name",
      skip: page,
      limit,
      where: JSON.stringify(query),
    };
    return await api.get(`/products`, { params });
  }

  async getArticles(limit = 15, page = 1, query) {
    let params = {
      // order: "name",
      include: "product",
      join: "product",
      count: 1,
      skip: page,
      limit,
      where: JSON.stringify(query),
    };
    return await api.get(`/warehouseproducts`, { params });
  }

  async postEntryManual(body) {
    return await api.post(`inventoryexits/manual`, body);
  }
}
