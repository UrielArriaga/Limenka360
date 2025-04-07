import dayjs from "dayjs";
import { api } from "../../../services/api";
import { formatDate } from "../../../utils";

export class ShippingsOrdersServices {
  async getShippingsOrders(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "taxinformation,provider",
      join: "provider",
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
    let params = { include: "taxinformation,taxinformation.address,provider,provideraddress,provideraddress.entity,provideraddress.city,provideraddress.postal" };
    return await api.get(`purchaseorders/${id}`, { params });
  }

  async getSupplies(limit = 20, page = 1, query) {
    let params = { 
      include: "product",
      limit : limit,
      count: 1,
      page: page,
      where: JSON.stringify(query)
    
    };
    return await api.get(`supplies`, { params });
  }

  normalizeDataOrdersShipping(element) {
    return {
      id: element.id,
      folio:element?.folio ? element?.folio : "N/A", 
      proveedor: element?.provider?.companyname ? element?.provider?.companyname : "N/A",
      condicion: element?.paymentcondition ? element?.paymentcondition : "N/A",
      telefono: element?.phone ? element?.phone : "N/A",
      observaciones: element?.observations ? element?.observations : "N/A",
      ["metodo de entrega"]: element?.methoddelivery ? element?.methoddelivery : "N/A",
      ["fecha de creacion"]: formatDate(element?.createdAt),
      item: element,
      // classname: item.billing ? "tableRow--highlighted" : "tableRow--highlighted",
    };
  }

  normalizeDataProduct(element){
    return{
      id: element.id,
      codigo: element?.product?.code,
      producto: element?.product?.name,
      cantidad: element?.quantity,
      unidad: element?.unit,
      ["precio unitario"]: element?.unitprice,
      importe: element?.amount,
    }
    
  }
}
