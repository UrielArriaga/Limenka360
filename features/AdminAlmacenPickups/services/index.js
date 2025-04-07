import dayjs from "dayjs";
import { api } from "../../../services/api";

class DirLogRecolecionApi {
  async getpickuppurchaseorder(limit = 20, page = 1, orderBy, query) {
    let params = {
      include:
        "driver,transportunit",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
    };
    return await api.get("pickups", { params });
  }
  async getpickuporders(query){
    let params = {
      include:"purchaseorder,purchaseorder.provider",
      count: 1,
      where: JSON.stringify(query),
  }
  return await api.get("pickuppurchaseorder", { params });
}
async getsupplies(query){
  let params = {
    include:"product",
    count: 1,
    where: JSON.stringify(query),
}
  return await api.get("supplies", { params });
}
normalizeSupplies (item){
return{
  code: item?.product?.code || "Sin codigo",
  product: item?.product?.name,
  quantity: item?.quantity
}
}
  normalizepickuppurchaseorders(pickuppurchaseorder) {
    console.log("HSDJGASDJAJSD", pickuppurchaseorder)
    return {
      createdAt: dayjs(pickuppurchaseorder?.createdAt).format("D,MMMM  YYYY") || "Sin fecha",
      folio: pickuppurchaseorder?.folio || "Sin nombre",
      receive: pickuppurchaseorder?.driver?.name || "Sin chofer",
      unit: pickuppurchaseorder?.transportunit
        ? `${pickuppurchaseorder.transportunit.model || "Modelo desconocido"} (${pickuppurchaseorder.transportunit.tuition || "Sin placas"})`
        : "Sin unidad",
      observations: pickuppurchaseorder?.purchaseorder?.observations || "N/A",
      national: pickuppurchaseorder?.purchaseorder?.national || "N/A",
      driver: pickuppurchaseorder?.driver?.name,
      tuition: pickuppurchaseorder?.transportunit?.tuition,
      model: pickuppurchaseorder?.transportunit?.model,
      pickupId: pickuppurchaseorder?.id,
      methoddelivery: pickuppurchaseorder?.purchaseorder?.methoddelivery || "N/A",
      fullname:  pickuppurchaseorder?.purchaseorder?.provider.fullname || "N/A",
      estimateddeliverydate: dayjs(pickuppurchaseorder?.purchaseorder?.estimateddeliverydate).format("DD, MMMM YYYY") || "N/A",
    };
  }
 
  
  normalizeDocument(pickuppDocument) {
    return {
      createdAt: pickuppDocument.createdAt,
      folio: pickuppDocument?.objet?.order?.folio || "Sin Folio",
      typerecolections: pickuppDocument?.objet?.purchaseorder?.methoddelivery || "Sin tipo de recolección",
      obserevationgeneral: pickuppDocument?.objet?.purchaseorder?.observations || "Sin Observacion",
      products: Array.isArray(pickuppDocument?.objet?.productsoportunity?.product)
      ? pickuppDocument?.objet?.productsoportunity?.product.map(item => item)  
      : [pickuppDocument?.objet?.productsoportunity?.product].map(item => item) || [],
      provider: pickuppDocument?.objet?.purchaseorder?.provider,
      createdby: pickuppDocument?.pickup?.createdby || "N/A",
      orderId: pickuppDocument.objet?.orderId,
      deliverydate: "",
      collectiondate: "",
      originbranch: "",
      destinationbranch: "",
      trackingnumber: "",
      quantity: pickuppDocument.stock || 0,
      oc: "N/A",
    };
  }

  async getStatusPoo() {
    return await api.get(`statuspoo`);
  }
  async getPickups(){
    return await api.get(`statuspoo`);
  }
}

export default DirLogRecolecionApi;
