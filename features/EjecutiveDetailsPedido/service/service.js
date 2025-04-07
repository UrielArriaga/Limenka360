import { api } from "../../../services/api";

export default class ApiRequestEjecutive {
  async getWareHouseProducts(query) {
    let params = {
      include: "warehouseorder,product,warehouseorder.warehouse,inventoryentry,inventoryexit",
      join: "warehouseorder,product,warehouseorder.warehouse",
      limit: 1000,
      count: 1,
      order: "createdAt",
      where: JSON.stringify(query)
    };
    return await api.get(`warehouseproducts`, { params });
  }
}
