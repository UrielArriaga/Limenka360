import { api } from "../../../services/api";

class ProspectsService {
  async getProspectsByPhases({}) {
    let params = {
      limit: 5,
      order: "-createdAt",
      subquery: 1,
      include: "category,clienttype",
      join: "catego,clienttype",
      where: {
        isoportunity: false,
        discarted: false,
        ejecutiveId: "YNQHRt32OCbt0shXa0yOa51t",
      },
    };
    return await api.get("prospects/byphases", {
      params,
    });
  }

  async getProspects({}) {
    let params = {
      limit: 20,
      order: "-createdAt",
      subquery: 1,
      include: "category,clienttype,phase",
      join: "catego,clienttype,phase",
      where: {
        isoportunity: false,
        discarted: false,
        ejecutiveId: "YNQHRt32OCbt0shXa0yOa51t",
      },
      count: 1,
    };
    return await api.get("prospects", {
      params,
    });
  }
  async getEntitieCityByPostals(code) {
    return await api.get(
      `/postals?where=${JSON.stringify({
        postal_code: code,
      })}&include=city,city.entity&limit=1`
    );
  }

  async getProspectsByPhase(queryParams) {
    const { phaseId, page } = queryParams;
    let params = {
      limit: 5,
      order: "-createdAt",
      include:
        "category,city,entity,phase,ejecutive,ejecutive.group,clientcompany,origin,clienttype,specialty,postal,prospectslabels,prospectslabels.label,channel",
      join: "catego,clienttype",
      skip: page,
      where: {
        isoportunity: false,
        discarted: false,
        phaseId: phaseId,
      },
    };
    return await api.get("prospects", { params });
  }

  mapToNormalizeProspects(items = []) {
    return items;
    // return items.map((item) => this.normalizeProspects(item));
  }

  normalizeProspects(itemProspect) {
    return {
      fullname: itemProspect.fullname,
    };
  }
}

export default ProspectsService;
