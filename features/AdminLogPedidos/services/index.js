import dayjs from "dayjs";
import { api } from "../../../services/api";
import { formatNumber, formatNumberAbrv } from "../../../utils";

export class OrdersServices {
  async getOrders(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "oportunity,oportunity.typesale,orderstatus,statuspoo",
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
      "oportunity,oportunity.prospect,oportunity.productsoportunities,oportunity.typesale,address,address.entity.city.postal,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime,orderstatus,statuspoo,createdbyid,createdbyid.group,approvedby,additionalinformation",};
    return await api.get(`/orders/${id}`, { params });
  }

  async getProductsOrder(oportunityId) {
    if (!oportunityId) {
      throw new Error("oportunityId is required");
    }

    let params = {
      include: "product,deliverytime",
      all: 1,
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

  async updateStatusOrderById(id, body){
    return await api.put(`orders/${id}`, body);
  }
  async updateStatusProductOportunity(id,body){
    return await api.put(`productsoportunities/${id}`, body);
  }

  async updateAditionalDataOrder(id, body) {
    if (!id) {
      throw new Error("id are required");
    }
    return await api.put(`/additionalinformation/${id}`, body);
  }

  normalizeDataOrders(item) {
    return {
      id: item.id,
      name: item?.folio,
      folio: item.folio,
      approvedAt: item.approvedAt ? dayjs(item.approvedAt).format("D,MMMM  YYYY") : "N/A",
      prospectname: item.oportunity?.prospect?.name,
      status: item.exitstatus,
      billing: item.billing,
      quantity: item.oportunity?.quantity,
      total: formatNumber(item?.total),
      typesale: item.oportunity?.typesale?.name || "N/A",
      orderstatus:item.orderstatus?.name|| "N/A",
      statuspoo:item.statuspoo?.name|| "Sin Estatus"
      // classname: item.billing ? "tableRow--highlighted" : "tableRow--highlighted",
    };
  }

  async getSerialProducts(id){
    let params = {
      count:1,
      include:"warehouseorder,product",
      join:"warehouseorder,product",
      order:"createdAt",
      where: JSON.stringify({warehouseorder:{orderId:id}}),
    }
    return await api.get(`warehouseproducts`, { params });
  }
}
