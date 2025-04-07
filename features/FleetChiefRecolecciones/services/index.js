import dayjs from "dayjs";
import { api } from "../../../services/api";

class DirLogRecolecionApi {
  async getpickuppurchaseorder(limit = 20, page = 1, orderBy, query) {
    let params = {
      include:
        "order,statuspoo,purchaseorder,purchaseorder.provider,purchaseorder.statuspoo,purchaseorder.provideraddress,purchaseorder.provideraddress.city,purchaseorder.provideraddress.entity,supply,supply.product",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
      join: "purchaseorder",
    };
    return await api.get("pickuppurchaseorder", { params });
  }

  normalizepickuppurchaseorders(pickuppurchaseorder) {
    return {
      createdAt: dayjs(pickuppurchaseorder?.createdAt).format("DD/MM/YYYY") || "Sin fecha",
      folio: pickuppurchaseorder?.purchaseorder?.folio || "Sin nombre",
      description: pickuppurchaseorder?.description || "Sin codigo",
      quantity: pickuppurchaseorder.purchaseorder?.quantity || 0,
      statuswho: pickuppurchaseorder?.purchaseorder?.statuspoo?.name || "Sin categoria",
      phone: pickuppurchaseorder.purchaseorder?.phone || 0,
      observations: pickuppurchaseorder.purchaseorder?.observations || "Sin Observaciones",
      national: pickuppurchaseorder.purchaseorder?.national ? "Nacional" : "No nacional",
      methoddelivery: pickuppurchaseorder.purchaseorder?.methoddelivery || "Sin envio",
      providerId: pickuppurchaseorder.purchaseorder?.provider?.fullname || "Sin proveedor",
      estimateddeliverydate: pickuppurchaseorder.purchaseorder?.deliverydatestimate || "Sin fecha de entrega",
      street: pickuppurchaseorder.purchaseorder?.provideraddress?.street,
      city: pickuppurchaseorder.purchaseorder?.provideraddress?.city?.name,
      entity: pickuppurchaseorder.purchaseorder?.provideraddress?.entity?.name,
      int_number: pickuppurchaseorder.purchaseorder?.provideraddress?.int_number,
      ext_number: pickuppurchaseorder.purchaseorder?.provideraddress?.ext_number,
      settlement: pickuppurchaseorder.purchaseorder?.provideraddress?.settlement,
      references: pickuppurchaseorder.purchaseorder?.provideraddress?.references,
    };
  }

  async getStatusPoo() {
    return await api.get(`statuspoo`);
  }
}

export default DirLogRecolecionApi;
