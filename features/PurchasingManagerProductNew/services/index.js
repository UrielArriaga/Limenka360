import { api } from "../../../services/api";

export class RequestNewProduct {
  async postProduct(body) {
    return await api.post(`products`, body);
  }
}
