import dayjs from "dayjs";
import { api } from "../../../services/api";
import { formatNumber, formatNumberAbrv } from "../../../utils";

export class DepAttendantServices {
  async wareHouseOrders(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "order,order.address",
      // join: "oportunity",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
    };

    return await api.get("/warehouseorders", {
      params,
    });
  }

  async wareHouseOrder(id) {
    let params = {
      include: "order",
    };
    return await api.get(`/warehouseorders/${id}`, { params });
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

  async wareHouseOrdersById(id) {
    let params = {
      include: "order",
      showproducts: true,
      where: JSON.stringify({
        id: id,
      }),
    };
    return await api.get(`/warehouseorders/withaddress`, { params });
  }

  async getInventoryExitCompletWithAddressById(id) {
    let params = {
      include: "order",

      showproducts: true,
      where: JSON.stringify({
        orderId: id,
      }),
    };
    return await api.get(`/inventoryexits/withaddress`, { params });
  }

  async getInventoryExitWithAddress(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "order,warehouseorder.order.address",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
    };
    return await api.get("inventoryexits/withaddress", { params });
  }

  async getInventoryExitCompletWithAddress(limit = 20, page = 1, orderBy, query) {
    let params = {
      // include: "warehouseorder",
      // join: "warehouseorder",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
    };

    return await api.get(`/inventoryexits/withaddress`, { params });
  }

  async updateOrderStatus(id, status) {
    if (!id || !status) {
      throw new Error("id and status are required");
    }
    return await api.put(`/orders/${id}`, {
      exitstatus: status,
    });
  }

  async getOrderById(orderId, query) {
    let params = {
      where: JSON.stringify(query),
      include: "oportunity,createdbyid",
    };
    return await api.get(`orders/${orderId}`, { params });
  }
  async getDrivers(query) {
    let params = {
      where: JSON.stringify(query),
    };
    return await api.get(`drivers`, { params });
  }

  normalizeDrivers(item) {
    if (item) {
      return {
        value: item.id,
        label: item.name,
      };
    }
  }
  async getDataTransportunits(query) {
    let params = {
      limit:100,
      where: JSON.stringify(query),
    };
    return await api.get(`transportunits`, { params });
  }

  async postRoute(body = {}) {
    return await api.post(`deliveryroutes`, body);
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
}
