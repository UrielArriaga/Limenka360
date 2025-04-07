import dayjs from "dayjs";
import { api } from "../../../services/api";
import { formatDatecomplete, formatNumber, formatNumberAbrv, toUpperCaseChart } from "../../../utils";

export class ActionsAdminServices {
  async getActions(limit = 20, page = 1, orderBy, query) {
    let params = {
      where: JSON.stringify(query),
      include: "prospect,prospect.ejecutive,action,ejecutive",
      limit: "20",
      skip: page,
      count: "1",
      order: "-createdAt",
    };

    return await api.get("/trackings", {
      params,
    });
  }

  normalizeDataActions(item) {
    return {
      createdAt: formatDatecomplete(item?.createdAt),
      nameprospect: `${toUpperCaseChart(item?.prospect?.name)} ${
        item.prospect?.lastname && toUpperCaseChart(item.prospect?.lastname)
      }`,
      ejecutive: `${toUpperCaseChart(item?.ejecutive?.name)} ${
        item.ejecutive?.lastname && toUpperCaseChart(item.ejecutive?.lastname)
      }`,
      typetracking: item?.action?.name,
      observations: item?.observations,
      prospect: item.prospect,
    };
  }
  async getFileExcelActivities(params) {
    return await api.get(`/trackings/report`, { params });
  }
}
