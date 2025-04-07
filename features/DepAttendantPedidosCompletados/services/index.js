import dayjs from "dayjs";
import { api } from "../../../services/api";

// * include y join iguales = visualizar sin importar nullos
// * include y join son diferentes  = visualizar sin importar nullos

export class OrdersServices {
  // ! NO MODIFICAR NINGUN METODO DE ESTA CLASE SIN PREVIO AVISO
  // ! by @URIEL

  async getOrders(limit = 20, page = 1, orderBy, query) {
    let params = {
      // include: "product,product.address",
      // join: "oportunity",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
    };

    return await api.get("/warehouseorders/byorder", {
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

  async updateOrderStatus(id, status) {
    if (!id || !status) {
      throw new Error("id and status are required");
    }
    return await api.put(`/orders/${id}`, {
      exitstatus: status,
    });
  }

  async updateWarehouseOrder(id, status) {
    if (!id || !status) {
      throw new Error("id and status are required");
    }
    return await api.put(`/warehouseorders/${id}`, {
      statuswho: status,
    });
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

  async getArticlesByWareHouseOrder(warehouseorderId) {
    if (!warehouseorderId) {
      throw new Error("orderId is required");
    }
    let params = {
      include: "product,warehouseorder",
      join: "product,warehouseorder",
      where: JSON.stringify({
        warehouseorder: {
          orderId: warehouseorderId,
        },
      }),
    };

    return await api.get("warehouseproducts", { params });
  }

  async markAsCompleteExit(inventoryexitId) {
    return await api.put("/inventoryexits/complete/" + inventoryexitId, {
      isfinish: true,
      createdAt: dayjs().format(),
    });
  }

  // * Products

  async updateArticleWarranty(id, warranty) {
    return await api.put(`/warehouseproducts/${id}`, {
      guaranteeorder: warranty,
    });
  }

  // * Files

  async generatePdf(formData) {
    return await api.post("convert/pdf", formData);
  }

  async createDocument(data) {
    return await api.post("/documents", data);
  }

  normalizeDataOrders(item) {
    return {
      id: item.id,
      warehouseId: item.id,
      name: item?.folio,
      folio: item.folio,
      approvedAt: dayjs(item.approvedAt).format("D,MMMM  YYYY	"),
      prospectname: item.oportunity?.prospect?.name,
      status: item.exitstatus || "Sin estatus",
      billing: item.billing,
      quantity: item.orderproducts?.length,
      itemData: item,
      orderId: item.orderId,
    };
  }
}
