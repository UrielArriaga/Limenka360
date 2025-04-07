import dayjs from "dayjs";
import { api } from "../../../services/api";

class DirLogRutasApi {
  async getDeliveryRoutes(limit = 20, page = 1, orderBy, query) {
    let params = {
      limit,
      skip: page,
      order: orderBy || "-createdAt",
      include:"createdby,typereturn,warehouse",
      join:"createdby,typereturn,warehouse",
      where: JSON.stringify(query),
    };
    return await api.get(`returns`, { params });
  }
  normalizeDeliveryRoutes(routes) {
    return {
      id: routes?.id || "Sin id",
      quantity: routes?.quantity || "-",
      comment: routes?.comment || "-",
      createdby: routes?.createdby?.fullname,
      warehouse: routes?.warehouse?.name,
      createdAt: dayjs(routes?.createdAt).format("DD/MM/YYYY") || "Sin Fecha",
    };
  }
  async getEntry(limit = 20, page = 1, query) {
    let params = {
      limit: limit,
      skip: page,
      count:1,
      include:"warehouseproduct,warehouseproduct.order,warehouseproduct.product,warehouseproduct.warehouseorder",
      where: JSON.stringify(query),
    };
    return await api.get(`returnwarehousesproducts/`, { params });
  }
  
  normalizeDeliveryReturns(item) {
    return {
      folio: item?.warehouseproduct?.order?.folio || "NA",
      serialNumber: item?.warehouseproduct?.serialnumber || "NA",
      code:item?.warehouseproduct?.product?.code,
      nameproduct: item?.warehouseproduct?.product?.name
    
    };
  }
}

export default DirLogRutasApi;
