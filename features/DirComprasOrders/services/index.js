import dayjs from "dayjs";
import { api } from "../../../services/api";
import { formatDate } from "../../../utils";

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

  async getWarrantiesArticles(query) {
    let params = {
      include: "warehouseproduct",
      join: "warehouseproduct",
      where: JSON.stringify(query),
    };
    return await api.get(`biomedicalwarranties`, { params });
  }
  async getGet(limit = 20, page = 1, query) {
    let params = {
      include: "product,productsoportunity",
      limit: limit,
      count: 1,
      page: page,
      where: JSON.stringify(query),
    };
    return await api.get(`ejecutives`, { params });
  }

  async getPendingsShoping(query) {
    let params = {
      include: "pendingstype,createdby",
      where: JSON.stringify(query),
    };
    return await api.get(`pendingsshopping`, { params });
  }

  normalizePendings(pending) {
    return {
      subject: pending?.subject,
      typeevent: pending?.pendingstype?.name,
      createdby: pending?.createdby?.fullname,
      ["date_from"]: formatDate(pending?.date_from),
      ["date_to"]: pending?.postponedtime ? formatDate(pending.postponedtime) : "Sin fecha",
      description: pending?.description,
    };
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
      // ["metodo de entrega"]: element?.metho | ddelivery ? element?.methoddelivery : "N/A",
      ["fecha de creacion"]: formatDate(element?.createdAt),
      item: element,
      statuspoo: !element?.draft ? (element?.statuspoo ? element?.statuspoo?.name : "en proceso de compra") : "N/A",
      identifier: element.draft ? "borrador" : "no borrador",
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
      deliverytimedone: dayjs(element?.deliverytimedone).add(1, "day").format("YYYY-MM-DD"),
      statuspooId: element?.statuspooId,
      idProduct: element?.product?.id,
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
  async PendigsShopping(body) {
    return await api.post("/pendingsshopping", body);
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
