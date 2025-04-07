import dayjs from "dayjs";
import { api } from "../../../services/api";
import { formatNumber, formatNumberAbrv } from "../../../utils";

export class OrdersServices {
  async getInventoryTransfers(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "createdby,exitwarehouse,entrywarehouse",
      limit: limit,
      skip: page,
      count: 1,
      // join: "oportunity,statuspo",
      order: orderBy,
      where: JSON.stringify(query),
    };

    return await api.get("/inventorytransfers", {
      params,
    });
  }

  async getProductsOfTransfers(query) {
    let params = {
      where: JSON.stringify(query),
      include:"warehouseproduct,warehouseproduct.product"
    }
    return await api.get(`/inventorytransferproducts`, {params});
  }
  async getOrder(id) {
    let params = {
      include:
        "oportunity,oportunity.prospect,oportunity.productsoportunities,oportunity.typesale,address,address.entity.city.postal,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime,orderstatus,statuspoo,createdbyid,createdbyid.group,approvedby,additionalinformation",
    };
    return await api.get(`/orders/${id}`, { params });
  }

  async getStatusPoo(){
    return await api.get(`statuspoo`);
  }

  async getShippings(orderId) {
    if (!orderId) {
      throw new Error("oportunityId is required");
    }
    let params = {
      include: "shippingtype",
      where: JSON.stringify({
        orderId: orderId,
      }),
    };
    return await api.get("shippings", { params });
  }

  async getProductsOrder(oportunityId) {
    if (!oportunityId) {
      throw new Error("oportunityId is required");
    }

    let params = {
      include: "product,deliverytime",
      all: 1,
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

  async updateOrderStatusPOO(id, status) {
    
    if (!id || !status) {
      throw new Error("id and status are required");
    }
    return await api.put(`/orders/${id}`, {
      statuspooId: status,
      exitstatus:"Proceso de compra"
    });
  }

  async updateAditionalDataOrder(id, body) {
    if (!id) {
      throw new Error("id are required");
    }
    return await api.put(`/additionalinformation/${id}`, body);
  }

  normalizeDataTransfers(item){
    return {
      id:item.id,
      data:item,
      folio:item?.folio || "N/A",
      createdAt: dayjs(item.createdAt).format("D,MMMM  YYYY"),
      createdBy: item?.createdby?.fullname,
      entrydate: item?.entrydate ? dayjs(item?.entrydate).format("D,MMMM  YYYY") : "N/A", 
      exitdate: item?.exitdate ? dayjs(item?.exitdate).format("D,MMMM  YYYY") : "N/A",
      exitwarehouse:item?.exitwarehouse?.name || "N/A",
      entrywarehouse:item?.entrywarehouse?.name || "N/A"
    };
  }
}
