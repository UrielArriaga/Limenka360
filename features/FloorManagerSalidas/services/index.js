import dayjs from "dayjs";
import { api } from "../../../services/api";

// * include y join iguales = visualizar sin importar nullos
// * include y join son diferentes  = visualizar sin importar nullos

export class OrdersServices {
  async getOrders(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "oportunity,oportunity.prospect",
      join: "oportunity,oportunity.prospect",
      // include:
      // "address,address.entity.city.postal,oportunity,oportunity.prospect,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime",
      // join: "address,address.entity.city.postal,oportunity,oportunity.prospect,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime",
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

  async createInventoryExit(data) {
    return await api.post("/inventoryexits", data);
  }

  async getOrder(id) {
    let params = {
      include: "oportunity,address,address.entity.city.postal",
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

  normalizeDataOrders(item) {
    return {
      id: item.id,
      name: item?.folio,
      folio: item.folio,
      createdAt: dayjs(item.createdAt).format("D,MMMM  YYYY	"),
      prospectname: item.oportunity?.prospect?.name,
      status: item.exitstatus,
      billing: item.billing,
      // classname: item.billing ? "tableRow--highlighted" : "tableRow--highlighted",
    };
  }
}
