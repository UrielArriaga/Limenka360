import dayjs from "dayjs";
import { api } from "../../../services/api";
import { checkIfItExpired, formatDate, formatNumber, toUpperCaseChart } from "../../../utils";

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
        "oportunity,oportunity.productsoportunities,address,address.entity.city.postal,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime,orderstatus",
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

  //

  async getSalesPayments(query, page, limit) {
    let params = {
      include: "oportunity,oportunity.prospect,oportunity.phase",
      join: "oportunity,oportunity.prospect,oportunity.phase",
      count: 1,
      limit: limit,
      skip: page,
      order: "-date",
      showphase: 2,
      where: JSON.stringify(query),
    };
    return await api.get(`salespayments`, { params });
  }

  normalizeSales(item) {
    return {
      id: item?.id,
      name: `${toUpperCaseChart(item?.oportunity?.prospect?.name)} ${toUpperCaseChart(
        item?.oportunity?.prospect?.lastname
      )}`,
      comission: item?.comission,
      monto: item?.payment,
      pagado: item?.ispaid ? "Pagado" : "Pendiente",
      datelimit: formatDate(item?.date),
      expired: checkIfItExpired(item?.date),
      sellingin: formatDate(item?.oportunity?.soldat),
      data: item,
    };
  }

  async getOportunity(id){
    let params = {
      where:JSON.stringify({id:id}),
      showproducts:1,
    }
    return await api.get(`oportunities`, {params});
  }
}
