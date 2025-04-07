import { api } from "../../../services/api";
import dayjs from "dayjs";

export class ExitsServices {
  async getExits(limit = 20, page = 1, orderBy, query) {
    let params = {
      limit: limit,
      skip: page,
      count: 1,
      include: "order,ejecutive",
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
      where: JSON.stringify({
        inventoryexitId: inventoryexitId,
      }),
    };
    return await api.get("warehouseproducts", { params });
  }

  normalizeDataProducts(item) {
    return {
      id: item.id,
      serialnumber: item?.serialnumber ? item.serialnumber : "Sin Numero de serie",
      product: item?.product?.name,
    };
  }
  normalizeDataExits(item) {
    return {
      id: item.id,
      folio: item?.folio,
      createdAt: dayjs(item.createdAt).format("D MMMM  YYYY	"),
      status: item?.status === "pending" ? "Pendiente" : "Entregado",
      description: item?.description ? item.description : "Sin descripción",
      ejecutive: item?.ejecutive ? item?.ejecutive?.fullname : item?.ejecutive?.name,
      folioorder: item?.order? item?.order?.folio : "Sin folio"
    };
  }
}
