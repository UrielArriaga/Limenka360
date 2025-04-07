import dayjs from "dayjs";
import { api } from "../../../services/api";

class DirLogInventaryUnitService {
  async getProductsInventory(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "product,warehouse",
      limit: limit,
      skip: page,
      count: 1,
      where: JSON.stringify(query),
      order: "-createdAt",
    };
    return await api.get("warehouseproducts", { params });
  }

  async getProductsInventoryId(id) {
    let params = {
      include: "product",
    };
    return await api.get(`warehouseproducts/${id}`, { params });
  }
  async getProductsInventoryEntry(query) {
    let params = {
      include: "inventoryentry",
      count: 1,
      where: JSON.stringify(query),
    };
    return await api.get(`warehouseproducts`, { params });
  }
  async getProductsInventoryExit(query) {
    let params = {
      include: "inventoryexit",
      count: 1,
      where: JSON.stringify(query),
    };
    return await api.get(`warehouseproducts`, { params });
  }

  async changeRepairs(id, bodyApart) {
    if (!id || !bodyApart) {
      throw new Error("id and data are required");
    }
    return await api.put(`/warehouseproducts/StockRepair/${id}`, bodyApart);
  }

  async changeReserve(id, bodyReserve) {
    if (!id || !bodyReserve) {
      throw new Error("id and data are required");
    }
    return await api.put(`/warehouseproducts/stockApart/${id}`, bodyReserve);
  }

  async getInventorytrackings(query, limit, page) {
    let params = {
      where: JSON.stringify(query),
      count: 1,
      limit: limit,
      page: page,
    };
    return await api.get(`inventorytrackings`, { params });
  }

  normalizeProductsInventory(productIntentory) {
    function validate(isok) {
      if (isok) return "Si";
      if (!isok) return "No";
    }
    return {
      serialnumber: productIntentory?.serialnumber || "No Asignado",
      name: productIntentory?.product?.name || "Sin nombre",
      category: productIntentory.category?.name || "Sin categoria",
      stock: productIntentory?.product?.stock,
      stockfinal: productIntentory?.stockfinal,
      unidad: productIntentory?.unit || "Pza",
      entrydate: productIntentory?.entrydate || dayjs().format("DD/MM/YYYY"),
      outputdate: productIntentory?.outputdate || "No aplica",
      warehouse: productIntentory?.warehouse?.name || "No aplica",
      productId: productIntentory?.productId,
      id: productIntentory?.id,
      repair: validate(productIntentory?.statusrepair),
      apart: validate(productIntentory?.isapart),
      statusrepair: productIntentory?.statusrepair,
      isapart: productIntentory?.isapart,
    };
  }
}

export default DirLogInventaryUnitService;
