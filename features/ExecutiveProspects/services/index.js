import { api } from "../../../services/api";

class ProspectsApi {
  async getPhasesProspects(queryParams = {}) {
    let params = {
      limit: 20,
      ...queryParams,
      where: JSON.stringify({
        or: [
          { name: "prospecto nuevo" },
          {
            name: "contactado",
          },
        ],
      }),
    };
    return api.get("phases", { params });
  }

  async getProspectByPhase(phaseId, queryParams = {}) {
    let params = {
      ...queryParams,
    };

    console.log(params);

    return api.get("prospects", { params });
  }

  async getProspects(queryParams = {}) {
    let params = {
      limit: 20,

      ...queryParams,
    };

    return api.get("prospects", { params });
  }

  async getProspectsByPhases(queryParams = {}) {
    let params = {
      limit: 5,
      ...queryParams,
    };

    return api.get("prospects/byphases", { params });
  }

  async getTrackings(queryParams = {}) {
    let params = {
      limit: 5,
      ...queryParams,
      order: "-createdAt",
      include: "action",
    };

    return api.get("trackings", { params });
  }

  async getPendings(queryParams = {}) {
    let params = {
      limit: 5,
      include: "pendingstype",

      ...queryParams,
    };

    return api.get("pendings", { params });
  }
  async getProspectDetails(prospectId) {
    let params = {
      include:
        "category,city,entity,phase,ejecutive,ejecutive.group,clientcompany,origin,clienttype,specialty,postal,prospectslabels,prospectslabels.label,channel",
    };
    return api.get(`prospects/${prospectId}`, { params });
  }
  async updateProspectField(prospectId, data) {
    return api.put(`prospects/${prospectId}`, data);
  }

  async updateProspectPhase(prospectId, phaseId) {
    return api.put(`prospects/${prospectId}`, { phaseId });
  }

  async addAutomaticTracking(dataTracking) {
    return api.post("trackings", dataTracking);
  }

  async getOpportunityProducts(limit = 5, page = 1, query) {
    let params = {
      count: 1,
      limit: limit,
      skip: page,
      where: JSON.stringify(query),
      include: "product",
    };
    return api.get("productsoportunities", { params });
  }

  async getOpportunity(query) {
    let params = {
      count: 1,
      where: JSON.stringify(query),
    };
    return api.get("oportunities", { params });
  }

  async getForecastReason() {
    let params = {
      count: 1,
    };
    return api.get("forecastreasons", { params });
  }

  async updateOportunitiesForecast(id, body) {
    return api.put(`oportunities/additionaldata/updated/${id}`, body);
  }
}

export default ProspectsApi;
