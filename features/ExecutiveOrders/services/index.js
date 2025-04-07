import { api } from "../../../services/api";

class ExecutiveOrdersService {
  constructor() {
    this.name = "SkeletonFeatureService";
  }

  async getEntitiesAndCityByPostalCode(code) {
    if (!code) {
      throw new Error("Postal code is required");
    }
    let params = {
      limit: 1,
      include: "city,city.entity",
      where: JSON.stringify({
        postal_code: code,
      }),
    };
    return await api.get("/postals", { params });
  }

  async getCitiesByEntityId(entityId) {
    if (!entityId) {
      throw new Error("Entity id is required");
    }
    let params = {
      all: 1,
      order: "name",
      where: JSON.stringify({
        entityId: entityId,
      }),
    };
    return await api.get("/cities", { params });
  }
}
export default ExecutiveOrdersService;
