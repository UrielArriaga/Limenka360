import dayjs from "dayjs";
import { api } from "../../../services/api";

export class WareHouseService {

  async getWareHouses(limit = 20, page = 1, orderBy, query) {
    let params = {
      include: "address,address.postal,address.city",
      //   include:
      //     "address,address.entity.city.postal,oportunity,oportunity.prospect,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime",
      //   limit: limit,
      //   skip: page,
      count: 1,
      limit: limit,
      skip: page,
      //   order: orderBy,
      where: JSON.stringify(query),
    };

    return await api.get("/warehouses", {
      params,
    });
  }

  async getOrder(id) {
    let params = {
      include: "address",
      // include: "oportunity,warehousesstatus,address,address.entity.city.postal",
    };
    return await api.get(`/warehouses/${id}`, { params });
  }

  async getProductsOrder(oportunityId) {
    if (!oportunityId) {
      throw new Error("oportunityId is required");
    }

    let params = {
      include: "product",
      where: JSON.stringify({
        oportunityId: oportunityId,
      }),
    };

    return await api.get("productsoportunities", { params });
  }

  //   id: '8uV5ewCZJ8jdwlEelPNrkkho',
  //   name: 'Almacen Huehutoca',
  //   warehouse: true,
  //   createdAt: '2024-06-17T16:13:47.633Z',
  //   updatedAt: '2024-06-17T16:13:47.633Z',
  //   addressId: 'XYVWIQD04ENz0n5lxnxORjvU',
  //   companyId: '62dz3qnimTqzfPfKpt7JtOtE'

  normalizeWareHouser(item) {
    return {
      id: item.id,
      name: item.name,
      createdAt: dayjs(item.createdAt).format("D,MMMM  YYYY	"),
      totalProductos: Math.floor(Math.random() * 100),
      address: item.address,
    };
  }
}
