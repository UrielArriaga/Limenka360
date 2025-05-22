import { api } from "../../../services/api";

export class ApiServiceExOr {
  async getOrders(limit, page = 1, query, order = "-createdAt") {
    let params = {
      count: 1,
      limit: limit,
      skip: page,
      order: order,
      where: JSON.stringify(query),
      join: "oportunity,oportunity.prospect,oportunity.soldby,oportunity.phase,orderstatus,address,address.c,address.e,bil,bill.pm,bill.pw,createdbyid,p",
      include:
        "oportunity,oportunity.prospect,oportunity.soldby,oportunity.phase,orderstatus,address,address.city,address.entity,bill,bill.paymentmethod,bill.paymentway,createdbyid,paymentaccount",
    };
    return await api.get("orders", {
      params,
    });
  }

  async getOrder(id) {
    let params = {
      include:
        "address,address.entity.city.postal,paymentaccount,orderstatus,oportunity,oportunity.phase,oportunity.prospect,oportunity.productsoportunities,oportunity,oportunity.soldby,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime",
    };
    return await api.get(`orders/${id}`, {
      params,
    });
  }

  async getStatusOrders(query) {
    let params = {
      where: JSON.stringify(query),
    };
    return await api.get("orders/countbystatus", { params });
  }

  async getProspect(id) {
    let params = {
      include:
        "city,entity,phase,ejecutive,clientcompany,origin,clienttype,specialty,postal,channel,category",
    };
    return await api.get(`prospects/${id}`, {
      params,
    });
  }

  async getSalesProducts(limit = 4, page = 1, query) {
    let params = {
      count: 1,
      limit: limit,
      skip: page,
      where: JSON.stringify(query),
      include: "product,product.brand",
    };
    return api.get("productsoportunities", { params });
  }

  async getTrackings(limit = 3, page = 1, query) {
    let params = {
      count: 1,
      limit: limit,
      skip: page,
      where: JSON.stringify(query),
      order: "-createdAt",
      include: "action,phase",
    };

    return api.get("trackings", { params });
  }

  async postAutoTracking(body) {
    return api.post("trackings/type", body);
  }

  async getWarehouseProducts(limit = 3, page = 1, query) {
    let params = {
      include:
        "warehouseorder,product,product.brand,warehouseorder.warehouse,inventoryentry,inventoryexit",
      join: "warehouseorder,product,warehouseorder.warehouse",
      limit: limit,
      count: 1,
      limit: limit,
      skip: page,
      where: JSON.stringify(query),
      order: "-createdAt",
    };
    return api.get("warehouseproducts", { params });
  }
}
