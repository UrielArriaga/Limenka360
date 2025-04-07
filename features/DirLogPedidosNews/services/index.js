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
        "oportunity,oportunity.prospect,oportunity.productsoportunities,address,address.entity.city.postal,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime",
    };
    return await api.get(`/orders/${id}`, { params });
  }

  async getProductsOrder(oportunityId) {
    if (!oportunityId) {
      throw new Error("oportunityId is required");
    }

    let params = {
      include: "product,deliverytime",
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
      name: item?.folio ? item?.folio : "N/A",
      folio: item.folio ? item?.folio : "N/A",
      approvedAt: item.approvedAt ? dayjs(item.approvedAt).format("D,MMMM  YYYY	") : "N/A",
      prospectname: item.oportunity?.prospect?.name ? item.oportunity?.prospect?.name : "N/A",
      status: item.exitstatus ? item.exitstatus : "N/A",
      billing: item.billing ? item.billing : "N/A",
      quantity: item.oportunity?.quantity ? item.oportunity?.quantity : "N/A",
      total: item?.total ? formatNumber(item?.total) : "N/A",
      // classname: item.billing ? "tableRow--highlighted" : "tableRow--highlighted",
    };
  }
}
