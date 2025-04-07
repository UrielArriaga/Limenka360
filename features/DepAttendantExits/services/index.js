import dayjs from "dayjs";
import { api } from "../../../services/api";

class DepAttendantExitsService {
  constructor() {
    this.name = "SkeletonFeatureService";
  }

  async getDataExits(limit = 20, page = 1, orderBy = "-createdAt", query = {}) {
    let params = {
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      include:"order,ejecutive",
      where: JSON.stringify(query),
    };
    return api.get("inventoryexits", { params });
  }

  async getOrder(id) {
    let params = {
      include:
        "oportunity,oportunity.productsoportunities,address,address.entity.city.postal,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime",
    };
    return await api.get(`/orders/${id}`, { params });
  }

  async wareHouseArticles(id) {
    
    let params = {
      all:1,
      count: 1,
      include: "product,warehouseorder",
      join: "product,warehouseorder",
      where: {
        warehouseorder: {
          orderId: id,
        },
      },
    };
    return await api.get(`warehouseproducts`, { params });
  }

  normalizeDataExits(item) {
    return {
      id: item.id,
      createdAt: dayjs(item.createdAt).format("D,MMMM,  YYYY"),
      folio: item.folio || "N/A",
      status: item?.status || "Salida",
      description: item?.description ? item.description : "Sin descripción",
      ejecutive: item?.ejecutive ? item?.ejecutive?.fullname : "N/A",
      orderId:item.orderId,
      orderFolio: item?.order?.folio ? item?.order?.folio : "Sin Folio",
      deliveryrouteId: item.deliveryrouteId,
    };
  }

  async updateArticleWarranty(id, warranty) {
    return await api.put(`/warehouseproducts/${id}`, {
      guaranteeorder: warranty,
    });
  }

  async generatePdf(formData) {
    return await api.post("convert/pdf", formData);
  }
}
export default DepAttendantExitsService;
