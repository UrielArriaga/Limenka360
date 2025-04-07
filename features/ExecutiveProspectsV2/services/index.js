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

  async updateProspectPhase(prospectId, phaseId) {
    return api.put(`prospects/${prospectId}`, { phaseId });
  }

  async addAutomaticTracking(dataTracking) {
    return api.post("trackings", dataTracking);
  }
}

export default ProspectsApi;
