import dayjs from "dayjs";
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
        isclient: false,
        isoportunity: false,
        discarted: false,
        ejecutiveId: "YNQHRt32OCbt0shXa0yOa51t",
      },
    };
    return await api.get("playground/prospects/kanban", {
      params,
    });
  }

  async getProspects({}) {
    let params = {
      limit: 12,
      order: "-createdAt",
      subquery: 1,
      include: "category,clienttype,phase",
      join: "catego,clienttype,phase",

      where: {
        isclient: false,
        isoportunity: false,
        discarted: false,
        ejecutiveId: "YNQHRt32OCbt0shXa0yOa51t",
      },
      count: 1,
      keys: "fullname,createdAt,email,phone,product,lastTrackingcreatedAt,nextpendingat,lastTracking",
      includekeys: {
        clienttype: ["name"],
        phase: ["name", "color"],
      },
    };
    return await api.get("playground/prospects/table", {
      params,
    });
  }

  async getProspectsPendings() {
    let params = {
      limit: 12,
      order: "-createdAt",
      subquery: 1,
      include: "pendingstype",
      where: {
        // status: 1,
        date_to: {
          $gte: "2025-05-01T06:00:00.000Z",
          $lte: "2025-05-31T00:00:00-06:00",
        },
      },
      count: 1,
      keys: "date_from,date_to,status,description,subject",
      includekeys: { pendingstype: ["name"] },
    };
    return await api.get("playground/prospects/calendar", {
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
        isclient: false,
        isoportunity: false,
        discarted: false,
        phaseId: phaseId,
      },
    };
    return await api.get("prospects", { params });
  }

  // * REPORTES

  async getReportByEntities({}) {
    let params = {};
    return await api.get("playground/reports/prospectsentities", {
      params,
    });
  }

  async getPendingsVersuss({}) {
    let params = {};
    return await api.get("playground/reports/pendingsversus", {
      params,
    });
  }
  async getReportByClientType({}) {
    let params = {};
    return await api.get("playground/reports/prs/clienttypes", {
      params,
    });
  }

  // * Finaliza reportes

  mapToNormalizeProspects(items = []) {
    return items?.map((item) => this.normalizeProspects(item));
  }

  normalizeProspects(itemProspect) {
    return {
      fullname: itemProspect.fullname || "Sin nombre",
      createdAt: dayjs(itemProspect.createdAt).format("MMMM D, YYYY	"),
      email: itemProspect.email,
      phone: itemProspect.phone || "Sin telefono",
      phase: itemProspect.phase?.name || "Sin fase",
      product: itemProspect.product || "Sin producto",
      nextpendingat: itemProspect.nextpendingat
        ? dayjs(itemProspect.nextpendingat).format("MMMM D, YYYY")
        : "Sin proximo pendiente",
      lastTrackingcreatedAt: itemProspect.lastTrackingcreatedAt
        ? dayjs(itemProspect.lastTrackingcreatedAt).format("MMMM D, YYYY")
        : "Sin seguimiento",
      phasecolor: itemProspect.phase?.color || "#000000",
      lastTracking: itemProspect.lastTracking,
    };
  }

  normalizeProspectsPendings(itemProspect) {
    return {
      date_from: itemProspect.date_from,
      date_to: itemProspect.date_to,
      status: itemProspect.status,
      description: itemProspect.description,
      subject: itemProspect.subject,
      pendingstype: itemProspect.pendingstype?.name || "Sin nombre",
    };
  }
}

export default ProspectsService;
