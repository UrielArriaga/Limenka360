import dayjs from "dayjs";
import { api } from "../../../services/api";
import { id } from "date-fns/locale";

class DirLogRecolecionApi {
  async getpickuppurchaseorder(pickupId) {
    let params = {
      // include: "createdby",
      include: "statuspoo,pickup,purchaseorder,purchaseorder.provider,order,supply,supply.product",
      where: JSON.stringify({ pickupId: pickupId }),
    };
    return await api.get("pickuppurchaseorder", { params });
  }

  async getsupplies(purchaseorderId, limit = 20, page = 1, orderBy) {
    let params = {
      limit: limit,
      include: "product",
      where: JSON.stringify({purchaseorderId: purchaseorderId}),
      skip: page,
      count: 1,
      order: orderBy,
    };
    return await api.get("supplies", { params });
  }

  async getpickups(limit = 20, page = 1, orderBy, query) {
    let params = {
      limit: limit,
      include: "driver,transportunit",
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
    };
    return await api.get("pickups", { params });
  }

  normalizepickuppurchaseorders(pickuppurchaseorder) {
    return {
      purchaseorderId: pickuppurchaseorder?.purchaseorder?.id,
      provider: pickuppurchaseorder?.purchaseorder?.provider?.companyname || "Sin proveedor",
      deliveryDate: dayjs(pickuppurchaseorder?.purchaseorder?.deliveryDate).format("DD/MM/YYYY") || "Sin fecha",
      suppliesId: pickuppurchaseorder?.suppliesId || null,
      estimateddeliverydate: dayjs(pickuppurchaseorder.purchaseorder?.estimateddeliverydate).format("DD/MM/YYYY") || "Sin fecha",
      methoddelivery: pickuppurchaseorder.purchaseorder?.methoddelivery || "Sin envio",
      national: pickuppurchaseorder.purchaseorder?.national === true ? "Nacional" : pickuppurchaseorder.purchaseorder?.national === false ? "No nacional" : "S/N",
      observations: pickuppurchaseorder.purchaseorder?.observations || "Sin Observaciones",
      phone: pickuppurchaseorder.purchaseorder?.phone || "Sin télefono",
    }
  }
  
  normalizepickups(pickups) {
    return {
      id: pickups?.id,
      createdAt: dayjs(pickups?.createdAt).format("DD/MM/YYYY") || "Sin fecha",
      folioOrder: pickups?.folio || "N/A",
      driver: pickups?.driver?.name || "N/A",
      transportunit: pickups?.transportunit?.model || "N/A",
      statuswho: pickups?.status || "N/A",
    };
  }

  normalizesupplies(supplies) {
    return {
      id: supplies?.id,
      code: supplies?.product?.code || "N/A",
      product: supplies?.product?.name || "N/A",
      quantity: supplies?.quantity || "N/A",
      purchaseorderId: supplies?.purchaseorderId,
      productId: supplies?.productId,
      providerId: supplies?.product?.providerId,
    }
  }

  async getStatusPoo() {
    return await api.get(`statuspoo`);
  }

  async suppliesWarehouseProducts(idOrder){
    let params = {
      count:1,
      where:JSON.stringify({purchaseorderId:idOrder})
    }
    return await api.get(`supplieswarehouseproducts`, {params})
  }
}

export default DirLogRecolecionApi;
