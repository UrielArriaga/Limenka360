import dayjs from "dayjs";
import { api } from "../../../services/api";

export class OrdersServices {
  async getOrders(limit = 20, page = 1, orderBy = "-createdAt", query) {
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

  async getOrder(id) {
    let params = {
      include:
        "oportunity,oportunity.productsoportunities,address,address.entity.city.postal,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime",
    };
    return await api.get(`/orders/${id}`, { params });
  }

  async getProductsOrder(oportunityId) {
    if (!oportunityId) {
      throw new Error("oportunityId is required");
    }

    let params = {
      include: "product",
      where: JSON.stringify({
        oportunityId: oportunityId,
      }),
    };

    return await api.get("productsoportunities", { params });
  }

  async getWareProductsOrder(orderId, pageCurrent = 1, limitResults = 2) {
    if (!orderId) {
      throw new Error("orderId is required");
    }
    
    let params = {
      include: "product",
      count:1,
      skip: pageCurrent,
      limit:limitResults,
      showproducts: true,
      where: JSON.stringify({
        orderId: orderId,
      }),
    };

    return await api.get("warehouseorders", { params });
  }

  async createInventoryExit(data) {
    return await api.post("/inventoryexits", data);
  }

  async updateOrderStatus(id, status) {
    if (!id || !status) {
      throw new Error("id and status are required");
    }
    return await api.put(`/orders/${id}`, {
      exitstatus: status,
    });
  }

  async updateWareHouseOrderStatus(id, status) {
    if (!id || !status) {
      throw new Error("id and status are required");
    }
    return await api.put(`/warehouseorders/${id}`, {
      exitstatus: status,
    });
  }

  normalizeDataOrders(item) {
    return {
      id: item.orderId,
      warehouseId: item.id,
      name: item?.folio,
      folio: item.folio,
      approvedAt: dayjs(item.approvedAt).format("D,MMMM  YYYY	"),
      prospectname: item.oportunity?.prospect?.name,
      status: item.exitstatus || "sin estatus",
      billing: item.billing,
      quantity: item.orderproducts?.length,
      itemData: item,
      orderId: item.orderId,
      // classname: item.billing ? "tableRow--highlighted" : "tableRow--highlighted",
    };
  }
}
