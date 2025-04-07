import dayjs from "dayjs";
import { api } from "../../../services/api";

// * include y join iguales = visualizar sin importar nullos
// * include y join son diferentes  = visualizar sin importar nullos

export class OrdersServices {
  async getOrders(limit = 20, page = 1, orderBy, query) {
    let params = {
      // include: "oportunity",
      // join: "oportunity",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
    };

    return await api.get("/warehouseorders/byorder", {
      params,
    });
  }

  async createInventoryExit(data) {
    return await api.post("/inventoryexits", data);
  }
  async getShippings(orderId) {
    if (!orderId) {
      throw new Error("orderId is required");
    }
    let params = {
      include: "shippingtype",
      where: JSON.stringify({
        orderId: orderId,
      }),
    };
    return await api.get("shippings", { params });
  }
  async getOrder(id) {
    let params = {
      include: "oportunity,address,address.entity.city.postal",
    };
    return await api.get(`/orders/${id}`, { params });
  }

  async updateOrderStatus(id, status) {
    if (!id || !status) {
      throw new Error("id and status are required");
    }
    return await api.put(`/orders/${id}`, {
      exitstatus: status,
    });
  }

  async updateOrderStatusWarehouse(id, status) {
    if (!id || !status) {
      throw new Error("id and status are required");
    }
    return await api.put(`/warehouseorders/${id}`, {
      statuswho: status,
    });
  }

  async getProductsOrder(oportunityId) {
    // console.log(oportunityId,"oportunityIdoportunityId");
    if (!oportunityId) {
      throw new Error("oportunityId is required");
    }

    let params = {
      include: "product",
      all: 1,
      where: JSON.stringify({
        oportunityId: oportunityId,
      }),
    };

    return await api.get("productsoportunities", { params });
  }

  async getArticlesByWareHouseOrder(warehouseorderId) {
    if (!warehouseorderId) {
      throw new Error("orderId is required");
    }

    let params = {
      include: "product,warehouseorder,product.brand",
      join: "product,warehouseorder",
      // include: "inventoryexit,product",
      // join: "inventoryexit,asdas",
      count: 1,
      all: 1,
      where: JSON.stringify({
        warehouseorder: {
          orderId: warehouseorderId,
        },

        // inventoryexit: { warehouseorderId: warehouseorderId },
      }),
    };

    return await api.get("warehouseproducts", { params });
  }

  normalizeDataOrders(item) {
    return {
      id: item.orderId,
      warehouseId: item.orderId,
      name: item?.folio,
      folio: item.folio,
      approvedAt: dayjs(item.approvedAt).format("D,MMMM  YYYY	"),
      prospectname: item.oportunity?.prospect?.name,
      status: item.exitstatus,
      billing: item.billing,
      quantity: item.orderproducts?.length,
      itemData: item,
      orderId: item.orderId,
    };
  }
}
