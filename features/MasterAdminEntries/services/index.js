import { api } from "../../../services/api";
import dayjs from "dayjs";

export class ExitsServices {
  async getEntries(limit = 20, page = 1, orderBy, query) {
    let params = {
      limit: limit,
      skip: page,
      count: 1,
      include: "order,typesentry,createdby",
      join:"createdby",
      order: orderBy,
      where: JSON.stringify(query),
    };
    return await api.get("/inventoryentries", { params });
  }

  async getEntry(id) {
    let params = {
      include: "order,order.address,order.address.postal,order.address.city,order.address.entity,createdby",
    };
    return await api.get(`/inventoryentries/${id}`, { params });
  }

  async getExits(limit = 20, page = 1, orderBy, query) {
    let params = {
      limit: limit,
      skip: page,
      count: 1,
      include: "order",
      order: orderBy,
      where: JSON.stringify(query),
    };
    return await api.get("/inventoryexits", { params });
  }

  async getExit(id) {
    let params = {
      include: "order,order.address,order.address.postal,order.address.city,order.address.entity,ejecutive",
    };
    return await api.get(`/inventoryexits/${id}`, { params });
  }

  async getProductExit(inventoryexitId) {
    if (!inventoryexitId) {
      throw new Error("inventoryexitId is required");
    }
    let params = {
      include: "product",
      count: 1,
      all:1,
      where: JSON.stringify({
        inventoryentryId: inventoryexitId,
      }),
    };
    return await api.get("warehouseproducts", { params });
  }

  normalizeDataProducts(item) {
    return {
      id: item.id,
      productcode: item?.product?.code,
      serialnumber: item?.serialnumber ? item.serialnumber : "Sin Numero de serie",
      product: item?.product?.name,
    };
  }
  normalizeDataExits(item) {
    return {
      id: item.id,
      folio: item?.folio,
      createdAt: dayjs(item.createdAt).format("D MMMM  YYYY	"),
      status: item?.status,
      description: item?.description,
      quatity: item?.quatity,
      status: item?.status === "pending" ? "Pendiente" : "Entregado",
      description: item?.description ? item.description : "Sin descripción",
      typesentries: item?.typesentry?.typesentry || "N/A",
      createdby: item?.createdby?.fullname || "Sistema",
      orderId: item.order
    };
  }
}
