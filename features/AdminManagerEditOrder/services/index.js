import dayjs from "dayjs";
import { api } from "../../../services/api";
import { formatNumber, formatNumberAbrv } from "../../../utils";

export class OrdersAdminServices {
  async getOrders(limit = 20, page = 1, orderBy, query) {
    let params = {
      // include: "paymentaccount,orderstatus,oportunity,oportunity.typesale",
      // join: "paymentaccoun,orderstatus,oportunity,oportunity.typesal",
      // join: "oportunity",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),

      include: "oportunity,oportunity.typesale,orderstatus,createdbyid,paymentaccount",
      join: "oportunity,oportunity.typesal,orderstatus,createdbyid,p",
      // order: createdAt
      // skip: 1
      // count: 1
      // limit: 20
      // where: {"createdbyid":{},"bill":{}}
    };

    return await api.get("/orders", {
      params,
    });
  }

  async getOrder(id) {
    let params = {
      include:
        "oportunity,oportunity.prospect,oportunity.productsoportunities,address,address.entity.city.postal,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime,orderstatus,statuspoo,createdbyid,createdbyid.group,approvedby",
    };
    return await api.get(`/orders/${id}`, { params });
  }

  async getProductsOrder(oportunityId) {
    if (!oportunityId) {
      throw new Error("oportunityId is required");
    }

    let params = {
      include: "product,product.brand",
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
      orderstatus: item.orderstatus?.name || "N/A",
      typesale: item.oportunity?.typesale?.name || "N/A",
      paymentaccount: item.paymentaccount?.name || "N/A",
      billing: item.billing,
      quantity: item.oportunity?.quantity,
      total: formatNumber(item?.total),
      // classname: item.billing ? "tableRow--highlighted" : "tableRow--highlighted",
    };
  }
}
