import dayjs from "dayjs";
import { api } from "../../../services/api";
import { formatNumber, formatNumberAbrv } from "../../../utils";

export class OrdersServices {
  async getOrders(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "oportunity",
      join: "oportunity",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
    };

    return await api.get("/orders", {
      params,
    });
  }

  async getOrder(id) {
    let params = {
      include:
        "oportunity,oportunity.productsoportunities,oportunity.prospect,address,address.entity.city.postal,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime",
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

  async updateOrderStatus(id, status) {
    if (!id || !status) {
      throw new Error("id and status are required");
    }
    return await api.put(`/orders/${id}`, {
      exitstatus: status,
    });
  }

  normalizeDataOrders(item) {
    return {
      id: item.id,
      name: item?.folio,
      folio: item.folio,
      approvedAt: dayjs(item.approvedAt).format("D,MMMM  YYYY	"),
      prospectname: item.oportunity?.prospect?.name,
      status: item.exitstatus,
      billing: item.billing,
      quantity: item.oportunity?.quantity,
      total: formatNumber(item?.total),
      // classname: item.billing ? "tableRow--highlighted" : "tableRow--highlighted",
    };
  }
  async getWarehouseproducts(id) {
    if (!id) {
      throw new Error("orderId is required");
    }

    let params = {
      include: "product,warehouse",

      where: JSON.stringify({
        orderId: id,
      }),
    };

    return await api.get("warehouseproducts", { params });
  }
  async getWareHouses(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "address,address.postal,address.city",
      count: 1,
      limit: limit,
      skip: page,
      where: JSON.stringify(query),
    };

    return await api.get("/warehouses", {
      params,
    });
  }
  normalizeWareHouser(item) {
    return {
      id: item.id,
      name: item.name,
      createdAt: dayjs(item.createdAt).format("D,MMMM  YYYY	"),
      totalProductos: Math.floor(Math.random() * 100),
      address: item.address,
    };
  }
}
