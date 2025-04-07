import { api } from "../../../../../services/api";
import { formatNumber } from "../../../../../utils";

export class ApiReportsManager {
  async getSumariesEntitiesByGroup(start, end, group, executive) {
    let params = {
      start_date: start,
      end_date: end,
      group_id: group,
    };

    if (executive) {
      delete params.group_id;
      params = {
        ...params,
        executive_id: executive,
      };
    }
    return await api.get("summary/reportsentities", { params });
  }

  async getSummariesCategoriesByGroup(start, end, group, executive) {
    let params = {
      start_date: start,
      end_date: end,
      group_id: group,
    };

    if (executive) {
      delete params.group_id;
      params = {
        ...params,
        executive_id: executive,
      };
    }

    return await api.get("summary/reportscategories", { params });
  }

  async getSummariesProductsByGroup(start, end, group, executive) {
    let params = {
      start_date: start,
      end_date: end,
      group_id: group,
    };

    if (executive) {
      delete params.group_id;
      params = {
        ...params,
        executive_id: executive,
      };
    }

    return await api.get("summary/reportsproducts", { params });
  }

  async getSummariesLeadsVsCustomers(start, end, group, executive) {
    let params = {
      start_date: start,
      end_date: end,
      group_id: group,
    };

    if (executive) {
      delete params.group_id;
      params = {
        ...params,
        executive_id: executive,
      };
    }

    return await api.get("summary/summaryexecutive", { params });
  }

  nomalizeData(data, totas = {}, type = "") {
    let values = [];
    const { totalLeads, totalCotizado, totalSold } = totas;

    switch (type) {
      case "productsbygroup":
        values = data.map((item, index) => ({
          ["id"]: item["id"],
          ["Nombre"]: item["Nombre"],
          ["Codigo"]: item["Codigo"],
          ["Categoria"]: item["Categoria"],
          ["Leads"]: Number(item["Leads"]),
          ["Cotizado"]: Number(item["Cotizado"]),
          ["Vendido"]: Number(item["Vendido"]),
          ["colors"]: {
            ["Leads"]: this.getStatusColor(Number(totalLeads), Number(item["Leads"])),
            ["Cotizado"]: this.getStatusColor(totalCotizado, item["Cotizado"]),
            ["Vendido"]: this.getStatusColor(totalSold, item["Vendido"]),
          },
        }));
        break;
      case "prospectsclientes":
        values = data.map((item, index) => ({
          ["id"]: item["id"],
          ["Nombre"]: item["Nombre"],
          ["Leads"]: Number(item["Leads"]),
          ["Cotizado"]: item["Oportunidades"],
          ["Vendido"]: item["Ventas"],
          ["colors"]: {
            ["Leads"]: this.getStatusColor(Number(totalLeads), Number(item["Leads"])),
            ["Cotizado"]: this.getStatusColor(totalCotizado, item["Cotizado"]),
            ["Vendido"]: this.getStatusColor(totalSold, item["Vendido"]),
          },
        }));
        break;
      default:
        values = data.map((item, index) => ({
          ["id"]: item["id"],
          ["Nombre"]: item["Nombre"],
          ["Leads"]: Number(item["Leads"]),
          ["Cotizado"]: Number(item["Cotizado"]),
          ["Vendido"]: Number(item["Vendido"]),
          ["colors"]: {
            ["Leads"]: this.getStatusColor(Number(totalLeads), Number(item["Leads"])),
            ["Cotizado"]: this.getStatusColor(totalCotizado, item["Cotizado"]),
            ["Vendido"]: this.getStatusColor(totalSold, item["Vendido"]),
          },
        }));
    }

    return values;
  }
  normalizeDataCommon = (data, key) => {
    if (!data) return [];

    return (data = data.map((item, index) => ({
      ["id"]: item["id"],
      ["Nombre"]: item["name"],
      ["Total"]: item[key],
    })));
  };
  normalizeDataTotals = (data, totals) => {
    const { totalLeads, totalCotizado, totalSold } = totals;
    return {
      ["id"]: 0,
      ["Nombre"]: "TOTALES",
      ["Leads"]: totalLeads,
      ["Cotizado"]: totalCotizado,
      ["Vendido"]: totalSold,
      ["colors"]: {
        ["Leads"]: this.getStatusColor(totalLeads, Number(totalLeads)),
        ["Cotizado"]: this.getStatusColor(totalCotizado, totalCotizado),
        ["Vendido"]: this.getStatusColor(totalSold, totalSold),
      },
    };
  };

  getStatusColor = (total, value) => {
    const percentaje = (value / total) * 100;
    if (percentaje <= 5) {
      return "rgba(248, 105, 107,0.6)";
    } else if (percentaje < 25) {
      return "rgba(253, 199, 125,0.6)";
    } else if (percentaje >= 30 && percentaje < 70) {
      return "rgba(255, 235, 132,0.6)";
    } else if (percentaje >= 70) {
      return "rgba(116, 195, 124,0.6)";
    }
  };

  calculateSumValues(data, type = undefined) {
    if (type == "prospectsclientes") {
      const { totalLeads, totalCotizado, totalSold } = data.reduce(
        (totals, item) => {
          totals.totalLeads += Number(item["Leads"]);
          totals.totalCotizado += Number(item.Oportunidades);
          totals.totalSold += Number(item.Ventas);
          return totals;
        },
        {
          totalCotizado: 0,
          totalLeads: 0,
          totalSold: 0,
        }
      );
      return { totalLeads, totalCotizado, totalSold };
    }

    const { totalLeads, totalCotizado, totalSold } = data.reduce(
      (totals, item) => {
        totals.totalLeads += Number(item["Leads"]);
        totals.totalCotizado += item.Cotizado;
        totals.totalSold += item.Vendido;
        return totals;
      },
      {
        totalCotizado: 0,
        totalLeads: 0,
        totalSold: 0,
      }
    );
    return { totalLeads, totalCotizado, totalSold };
  }
}
