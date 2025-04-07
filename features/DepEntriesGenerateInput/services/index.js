import { api } from "../../../services/api";

class DepEntriesGenerateInputService {
  async getSuppliesByOrder( suppliesId ) {
    let params = {
      limit: 12,
      include: "supply,supply.product",
      where: JSON.stringify({ suppliesId }),
    };
    return api.get("pickuppurchaseorder", {
      params,
    });
  }
}

export default DepEntriesGenerateInputService;
