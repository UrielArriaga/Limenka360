import dayjs from "dayjs";
import { api } from "../../../services/api";

class DirLogInventaryUnitService {
  async getProductsInventory(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "product,warehouse,inventoryentry,inventoryexit",
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
  async getProductsInventoryEntry(query, skip) {
    let params = {
      include: "inventoryentry,warehouse",
      count: 1,
      where: JSON.stringify(query),
      skip: skip,
    };
    return await api.get(`warehouseproducts`, { params });
  }
  async getProductsInventoryExit(query, skip) {
    let params = {
      include: "inventoryexit,warehouse",
      count: 1,
      where: JSON.stringify(query),
      skip: skip,
    };
    return await api.get(`warehouseproducts`, { params });
  }
  async getProductsBiome(query) {
    let params = {
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
      code: productIntentory?.product?.code,
      stock: productIntentory?.product?.stock,
      stockfinal: productIntentory?.stockfinal,
      unidad: productIntentory?.unit || "Pza",
      createdAt: dayjs(productIntentory?.inventoryentry?.createdAt).format("DD/MM/YYYY"),
      outputdate: productIntentory?.inventoryexit?.createdAt? dayjs(productIntentory.inventoryexit.createdAt).format("DD/MM/YYYY") : "No aplica",
      warehouse: productIntentory?.warehouse?.name || "No aplica",
      productId: productIntentory?.productId,
      id: productIntentory?.id,
      repair: validate(productIntentory?.statusrepair),
      apart: validate(productIntentory?.isapart),
      reviewed: validate(productIntentory?.reviewed),
      statusrepair: productIntentory?.statusrepair,
      isapart: productIntentory?.isapart,
      code: productIntentory?.product?.code || "Sin código",
      folioOut: productIntentory?.inventoryexit?.folio || "Sin folio",
    };
  }

  async getReturnsByProduct(idProduct, page, limit) {
    let params = {
      include: "warehouse,warehouseproduct",
      where: JSON.stringify({ warehouseproductId: idProduct }),
      skip: page,
      limit: limit,
      count: 1,
    };
    return await api.get(`returns`, { params });
  }
}

export default DirLogInventaryUnitService;
