import { api } from "../../../services/api";

export class ApiRequest {
  async getInventoryEntries() {
    let params = {
      count: 1,
    };
    return await api.get(`inventoryentries`, { params });
  }
  async getInventoryExit() {
    let params = {
      count: 1,
    };
    return await api.get(`inventoryexits`, { params });
  }
  async getWhereHouseProducts(){
    let params = {
      totalstock:1
    }
    return await api.get(`warehouseproducts`, {params});
  }
}
