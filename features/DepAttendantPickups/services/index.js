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
    include:"product,product.provider",
    count: 1,
    where: JSON.stringify(query),
}
  return await api.get("supplies", { params });
}
normalizeSupplies (item){
return{
  code: item?.product?.code || "Sin codigo",
  product: item?.product?.name,
  quantity: item?.quantity,
  provider: item?.product?.provider?.companyname
}
}
  normalizepickuppurchaseorders(pickuppurchaseorder) {
    return {
      createdAt: dayjs(pickuppurchaseorder?.createdAt).format("D,MMMM  YYYY") || "Sin fecha",
      folio: pickuppurchaseorder?.folio || "Sin nombre",
      description: pickuppurchaseorder?.description || "Sin codigo",
      driver: pickuppurchaseorder?.driver?.name,
      tuition: pickuppurchaseorder?.transportunit?.tuition,
      model: pickuppurchaseorder?.transportunit?.model,
      pickupId: pickuppurchaseorder?.id,

    };
  }
  normalizeDocument(pickuppDocument,combinedData) {
    return {
      createdAt: pickuppDocument?.createdAt,
      folio: pickuppDocument?.folio || "Sin Folio",
      folioorden: combinedData?.entrance?.[0]?.purchaseorder.folio,
      typerecolections: combinedData?.entrance?.[0]?.purchaseorder.methoddelivery || "Sin tipo de recolección",
      obserevationgeneral: pickuppDocument?.objet?.purchaseorder?.observations || "Sin Observacion",
      products: Array.isArray(combinedData?.outputs) 
      ? combinedData.outputs 
      : [], // Asegurarse de que siempre sea un array
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
