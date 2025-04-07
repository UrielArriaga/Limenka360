import { api } from "../../../services/api";

export class ProductsServices {
  async getProducts(query) {
    let params = {
      rangefinish: query.rangefinish,
      rangestart: query.rangestart,
    };

    return await api.get("shoppingreports/amounts-to-pay", { params });
  }

  async getShoppingreports(query) {
    let params = {
      rangefinish: query.rangefinish,
      rangestart: query.rangestart,
    };
    return await api.get("shoppingreports/total-upcoming", { params });
  }

  async getOrders(data, roleId) {
    let query = {
      createdAt: {
        $gte: data.rangestart,
        $lte: data.rangefinish,
      },
    };
    // query.national = roleId === "compras" ? true : false;

    let params = {
      count: 1,
      where: JSON.stringify(query),
    };

    return await api.get("purchaseorders", { params });
  }

  async getEjecutives(role) {
    let params = {
      all: 1,
      count: 1,
      order: "name",
      where: JSON.stringify(role),
    };

    return await api.get("ejecutives", {
      params,
    });
  }

  async getPeddingsType() {
    return await api.get(`pendingstypes`);
  }

  async getPendingsshopping() {
    let params = {
      count:1,
      include:"pendingstype",
      where:JSON.stringify({isdone:false})
    };
    return await api.get(`pendingsshopping`, {params});
  }

  async AmountsProviders(query) {
    let params = {
      rangefinish: query.rangefinish,
      rangestart: query.rangestart,
    };
    return await api.get(`/shoppingreports/amounts-providers`, { params });
  }

  async getProviders() {
    return await api.get(`providers?all=1&order=name`);
  }
  async postPendingsshopping(data) {
    return await api.post(`pendingsshopping`, data);
  }
  async putPendingsshopping(id, data) {
    return await api.put(`pendingsshopping/${id}`, data);
  }
  async postTrackingsPendings(data){
    return await api.post(`trackingsshoppings`, data);
  }
}
