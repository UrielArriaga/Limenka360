import dayjs from "dayjs";
import { api } from "../../../services/api";

class AdministratorPedidosService {
  async getOrders(limit = 20, page = 1, orderBy = "-createdAt", query) {
    let params = {
      include: "orderstatus,paymentaccount",
      keys: "id,folio,createdAt,oportunityId",
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
      where: JSON.stringify(query),
    };

    return await api.get("/orders", { params });
  }

  async getOrderById(id) {
    if (!id) {
      throw new Error("El id es requerido");
    }

    let params = {
      include: "orderstatus,paymentaccount,address,address.entity,address.city,address.postal,bill",
      // keys: "id,folio,createdAt,exitstatus",
    };
    return await api.get(`/orders/${id}`, { params });
  }

  async getProductsOportunity(id) {
    if (!id) {
      throw new Error("El id es requerido");
    }

    let params = {
      include: "product,product.category,product.brand",
      where: JSON.stringify({
        oportunityId: id,
      }),
    };
    return await api.get(`/productsoportunities`, { params });
  }

  normalizeOrders = order => {
    return {
      id: order.id,
      folio: order.folio,
      createdAt: dayjs(order.createdAt).format("DD/MM/YYYY"),
      paymentaccountname: order.paymentaccount?.name,
      status: order?.orderstatus?.name,
      exitstatus: order?.exitstatus || "No enviado",
      oportunityId: order.oportunityId,
    };
  };
}
export default AdministratorPedidosService;
