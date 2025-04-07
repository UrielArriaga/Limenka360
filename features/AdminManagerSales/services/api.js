import dayjs from "dayjs";
import { api } from "../../../services/api";
import { formatDate, formatDatecomplete, formatNumber, formatNumberAbrv, toUpperCaseChart } from "../../../utils";

export class ActionsAdminServices {
  async getSales(limit = 20, page = 1, orderBy, query) {
    let params = {
      // include: "phase,prospect,prospect.origin,prospect.category,prospect.clientcompany,prospect.postal,soldby",
      // join: "ph,prospect,prospect.origin,prospect.category,prospect.clientcompany,prospect.postal,soldby",
      include: "prospect,prospect.ejecutive,prospect.category",
      join: "prospect,prospect.ejecutive,prospect.cat",
      where: JSON.stringify(query),
      limit: limit,
      skip: page,
      count: 1,
      order: orderBy,
    };

    return await api.get("oportunities", {
      params,
    });
  }

  normalizeDataSales(item) {
    return {
      id: item?.id,
      nombre: `${toUpperCaseChart(item?.prospect?.name)} ${
        item?.prospect?.lastname && toUpperCaseChart(item?.prospect?.lastname)
      } `,
      correo: item?.prospect?.email,
      concepto: item?.concept,
      ["monto total"]: formatNumber(item?.amount),
      ["comisión total"]: formatNumber(item?.comission),
      certeza: item?.certainty + "%",
      fase: item?.phase?.name,
      soldat: formatDate(item?.soldat),
      estimatedclossing: formatDate(item?.estimatedclossing),
      prospect: item.prospect,
      itemBd: item,
      createdAt: formatDate(item?.createdAt),
      name: `${toUpperCaseChart(item?.prospect?.name)} ${
        item?.prospect?.lastname && toUpperCaseChart(item?.prospect?.lastname)
      } `,
    };
  }

  async saleId(id) {
    let params = {
      include: "productsoportunities,productsoportunities.product,prospect",
    };
    return await api.get(`/oportunities/${id}`, { params });
  }
  async getFileExcelSales(params) {
    return await api.get(`/oportunities/report`, { params });
  }
}
