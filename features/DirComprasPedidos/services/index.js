import dayjs from "dayjs";
import { api } from "../../../services/api";
import { ORDERSSTATUSDB } from "../../../BD/databd";

export class OrdersServices {
  async getOrders(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "oportunity,oportunity.typesale,orderstatus,statuspoo,additionalinformation",
      join: "oportunity,orderstatusId,statup,additionalinformatio",
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
        "oportunity,oportunity.productsoportunities,oportunity.typesale,oportunity.prospect,address,address.entity.city.postal,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime,statuspoo,approvedby,createdbyid,createdbyid.group,additionalinformation",
    };
    return await api.get(`/orders/${id}`, { params });
  }

  async getProductsOrder(oportunityId) {
    if (!oportunityId) {
      throw new Error("oportunityId is required");
    }

    let params = {
      include: "product,product.provider,statuspoo,deliverytime",
      join: "product,product.provider,statuspo",
      all:1,
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

  normalizeProductsOportunities = item => {
    let sumStockandTotalShipping = item.product?.stock + item.totalshopping;
    let exitStock = item.product?.stock >= item.quantity || sumStockandTotalShipping >= item.quantity;
    return {
      ...item,
      statuspoo: item.statuspoo?.name || "N/A",
      existStock: exitStock,
    };
  };

  normalizeDataOrders(item) {
    return {
      id: item.id,
      name: item?.folio,
      folio: item.folio,
      amount: item?.total,
      approvedAt: dayjs(item.approvedAt).format("D,MMMM  YYYY"),
      aprovedLogisticAt: dayjs(item.additionalinformation?.approvedlogisticsdate).format("D,MMMM  YYYY"),
      prospectname: item.oportunity?.prospect?.name,
      status: item.orderstatus?.name,
      orderstatus: ORDERSSTATUSDB[item.orderstatusId]?.name || "N/A",
      updatedAt: dayjs(item.updatedAt).format("D,MMMM  YYYY") || "N/A",
      lastcommentAt: dayjs(item.lastcommentAt).format("D,MMMM  YYYY") || "N/A",
      billing: item.billing,
      quantity: item.oportunity?.quantity,
      exitstatus: item.exitstatus ? (item.exitstatus === "pedido nuevo" ? "pedido recibido" : item.exitstatus) : "N/A",
      statuspoo: item.statuspoo?.name || "N/A",
      typesale: item.oportunity?.typesale?.name
    };
  }
}

export default class RequestApiReplace {
  async getProducts(limit = 15, page = 1, query) {
    let params = {
      include: "brand",
      count: 1,
      order: "name",
      skip:page,
      limit,
      where:JSON.stringify(query)
    };
    return await api.get(`/products`, { params });
  }

  async postReplaceProduct(body){
    return await api.post(`productreplaces/flow`, body)
  }

  async getPurcharseOrdersByUser(id_user) {
    let params = {
      count: 1,
      limit: 0,
      where: JSON.stringify({
        createdbyId: id_user,
      }),
    };
    return await api.get(`purchaseorders`, { params });
  }
}
