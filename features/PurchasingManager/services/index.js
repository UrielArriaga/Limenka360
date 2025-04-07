import dayjs from "dayjs";
import { api } from "../../../services/api";
import { formatNumber, toUpperCaseChart } from "../../../utils";

export class OrdersServices {
  async getOrders(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "oportunity,orderstatus",
      join: "oportunity,orderstatusId",
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
  async getOrdersActives(limit = 20, page = 1) {
    let params = {
      include: "oportunity,orderstatus",
      join: "oportunity,orderstatusId",
      limit: limit,
      skip: page,
      count: 1,
    };

    return await api.get("/orders", {
      params,
    });
  }
  async getProviders(limit = 20, page = 1) {
    let params = {
      limit: limit,
      skip: page,
      count: 1,
    };

    return await api.get("/providers", {
      params,
    });
  }

  async getProductsOrder( limit=20, page=1){
    let params = {
      count: 1,
      limit,
      skip:page,
      include: "provider",
      join: "pro",
    }
    return await api.get("/products", {params});
  }

  async getOrder(id) {
    let params = {
      include:
        "oportunity,oportunity.productsoportunities,oportunity.prospect,address,address.entity.city.postal,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime,statuspoo",
    };
    return await api.get(`/orders/${id}`, { params });
  }

  async getProductsOrder(oportunityId) {
    if (!oportunityId) {
      throw new Error("oportunityId is required");
    }

    let params = {
      include: "product,product.provider,deliverytime",
      join: "product,product.provider",
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
    let exitStock = item.product?.stock >= item.quantity;
    return {
      ...item,
      existStock: exitStock,
    };
  };

  normalizeDataOrders(item) {
    return {
      id: item.id,
      name: item?.folio,
      folio: item.folio,
      amount: item?.total,
      approvedAt: dayjs(item.createdAt).format("D,MMMM  YYYY"),
      prospectname: item.oportunity?.prospect?.name,
      status: item.orderstatus?.name,
      billing: item.billing,
      quantity: item.oportunity?.quantity,
      exitstatus: item.exitstatus ? (item.exitstatus === "pedido nuevo" ? "pedido recibido" : item.exitstatus) : "N/A",
      // classname: item.billing ? "tableRow--highlighted" : "tableRow--highlighted",
    };
  }
  normalizeDataProducts(item) {
    return {
      id: item.id,
      code: item?.code,
      folio: item?.code,
      name: `${toUpperCaseChart(item?.name)} `,
      stock: item?.stock,
      providerId: `${toUpperCaseChart(item?.provider?.companyname)}`,
      amount: `${formatNumber(item?.amount)}`,
      storeamount: `${formatNumber(item?.storeamount)}`,
      callamount: `${formatNumber(item?.callamount)}`,
      import: item?.import ? "Si" : "No",
      description: item?.description,
      deliverytimes: item?.deliverytime?.deliverytimes,
      data:item
      // classname: item.billing ? "tableRow--highlighted" : "tableRow--highlighted",
    };
  }
}
