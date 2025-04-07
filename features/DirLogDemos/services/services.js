import { api } from "../../../services/api";

export default class RequestApi {
  async getDemosales(limitResults, orderBy, pageCurrent, query) {
    let params = {
      include: "address,address.city,address.entity,address.postal,orderstatus",
      limit: limitResults,
      count: 1,
      order: orderBy,
      skip: pageCurrent,
      where: JSON.stringify(query),
    };
    return await api.get(`demosales`, { params });
  }
}
