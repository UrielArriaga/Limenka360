import dayjs from "dayjs";
import { api } from "../../../services/api";
import { formatDate } from "../../../utils";
import { join } from "path";

export class ShippingsOrdersServices {
  async getShippingsOrders(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "provider,statuspoo",
      join: "provider,statusp",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
    };

    return await api.get("purchaseorders", {
      params,
    });
  }

  async getOrderId(id) {
    let params = {
      include: "taxinformation,provider,statuspoo",
      join: "taxinforsmation,provider,stadtuspoo",
    };
    return await api.get(`purchaseorders/${id}`, { params });
  }

  async getSupplies(limit = 20, page = 1, query) {
    let params = {
      include: "product,productsoportunity",
      limit: limit,
      count: 1,
      page: page,
      where: JSON.stringify(query),
    };
    return await api.get(`supplies`, { params });
  }

  normalizeDataOrdersShipping(element) {
    return {
      id: element.id,
      folio: element?.folio ? element?.folio : "N/A",
      proveedor: element?.provider?.companyname ? element?.provider?.companyname : "N/A",
      condicion: element?.paymentcondition ? element?.paymentcondition : "N/A",
      telefono: element?.phone ? element?.phone : "N/A",
      observaciones: element?.observations ? element?.observations : "N/A",
      ["metodo de entrega"]: element?.methoddelivery ? element?.methoddelivery : "N/A",
      ["fecha de creacion"]: formatDate(element?.createdAt),
      statuspoo: !element?.draft ? (element?.statuspoo ? element?.statuspoo?.name : "en proceso de compra") : "N/A",
      identifier: element.draft ? "borrador" : "no borrador",
      item: element,
      // classname: item.billing ? "tableRow--highlighted" : "tableRow--highlighted",
    };
  }

  normalizeDataProduct(element) {
    return {
      id: element.id,
      codigo: element?.product?.code,
      producto: element?.product?.name,
      cantidad: element?.quantity,
      unidad: element?.unit,
      ["precio unitario"]: element?.unitprice,
      importe: element?.amount,
      deliverytimedone: dayjs(element?.deliverytimedone).toISOString().split("T")[0],
      statuspooId: element?.statuspooId,
    };
  }

  async getPaymentsPurchase(query) {
    let params = {
      include: "purchaseorder,purchaseorder.statuspoo",
      count: 1,
      where: JSON.stringify(query),
    };
    return await api.get(`paymentspurchaseorder`, { params });
  }

  async joinPurchase(id, data) {
    return await api.put(`purchaseorders/joinpurchase/${id}`, data);
  }

  async getConceptImport() {
    let params = {
      count: 1,
      order: "name",
    };
    return await api.get(`conceptimport`, { params });
  }

  async putPaymentsPurchase(data, id) {
    let body = {
      payments: data,
    };
    return await api.put(`paymentspurchaseorder/${id}`, body);
  }
}
