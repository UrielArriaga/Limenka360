import { api } from "../../../services/api";

export class ProvidersServices {
  async geProviders(limit = 20, page = 1, orderBy, query) {
    let params = {
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
      include: "postal",
      join: "pos",
    };

    return await api.get("/providers", {
      params,
    });
  }

  async getProvider(id) {
    let params = {};
    return await api.get(`/providers/${id}`, { params });
  }

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

  async getProviderDelete(id) {
    return await api.delete(`/providers/${id}`);
  }
  normalizeDataProviders(item) {
    return {
      id: item.id,
      name: this.addna(item?.companyname),
      fullname: this.addna(item?.fullname),
      phone: this.addna(item?.phone),
      email: this.addna(item?.email),
      rfc: this.addna(item.rfc),
      item: item,
    };
  }

  normalizeDataOrdersProviders(element) {
    return {
      id: element.id,
      proveedor: element?.provider?.companyname ? element?.provider?.companyname : "N/A",
      condicion: element?.paymentcondition ? element?.paymentcondition : "N/A",
      telefono: element?.phone ? element?.phone : "N/A",
      observaciones: element?.observations ? element?.observations : "N/A",
      ["metodo de entrega"]: element?.methoddelivery ? element?.methoddelivery : "N/A",
      ["fecha de creacion"]: element?.createdAt,
      item: element,
    };
  }

  addna(data) {
    if (data == null || data == "null null" || data == "") {
      return "N/A";
    } else {
      return data;
    }
  }

  async getAddressOfProvider(query) {
    let params = {
      include: "city,entity,postal",
      join: "c,e,p",
      where: JSON.stringify(query),
    };

    return await api.get(`provideraddresses`, { params });
  }

  async getSupplierProvider(id) {
    let params = {
      count:1,
      where: JSON.stringify(id),
    };
    return await api.get(`suppliercontacts`, { params });
  }
}
