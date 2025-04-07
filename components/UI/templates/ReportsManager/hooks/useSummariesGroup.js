import { useEffect, useState } from "react";
import { userSelector } from "../../../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { api } from "../../../../../services/api";
import dayjs from "dayjs";
import { ApiReportsManager } from "../Data";
import { set } from "date-fns";

const getStatusColor = (total, value) => {
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

const useSummariesGroup = (startDate, finishDate) => {
  const { groupId } = useSelector(userSelector);
  const [sumcategories, setSumcategories] = useState([]);
  const [view, setview] = useState("entitiesbygroup");
  const [executiveId, setExecutiveId] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const apiManager = new ApiReportsManager();
  const [flag, setFlag] = useState(false);
  // PAgination
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const [values, setValues] = useState({
    startDate: dayjs().startOf("month").format(),
    finishDate: dayjs().endOf("month").format(),
    executiveSelected: null,
    view: "entitiesbygroup",
  });

  const [totals, setTotals] = useState({
    totalCotizado: 0,
    totalLeads: 0,
    totalBeforeQuotes: 0,
    totalMonthQuotes: 0,
    totalSold: 0,
  });

  useEffect(() => {
    handleEvent();
  }, [view, flag, page, limit]);

  const handleOnChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const restorePage = () => {
    if (page > 1) setPage(1);
  };

  const handleEvent = () => {
    if (!groupId) return;
    switch (values.view) {
      // Cotizado - Vendido
      case "entitiesbygroup":
        getSumariesEntitiesByGroup();
        break;
      case "categoriesbygroup":
        getSummariesCategoriesByGroup();
        break;
      case "entitiesbygroupextend":
        getSummariesEntitiesExtendByGroup();
        break;
      case "productsbygroup":
        getSummariesProductsByGroup();
        break;
      // Prospectos
      case "byprospectEntities":
        getProspectsByEntities();
        break;

      case "byprospectOrigins":
        getProspectsByOrigin();
        break;
      case "byprospectType":
        getProspectsType();
        break;
      //oportunidades
      case "bycategory":
        getOportunityAmountProduct();
        break;
      case "byentities":
        getOportunityEntityAmount();
        break;
      case "byorigin":
        getOportunityOriginAmount();
        break;
      case "byphase":
        getOportunityPhaseAmount();
        break;
      case "bytotalentities":
        getOportunityTotalEntity();
        break;
      case "bytotalproducts":
        getOportunityTotalProduct();
        break;
      // ventaas
      case "bysalesOrigin":
        getSalesOrigin();
        break;
      case "bysalesEntities":
        getSalesEntities();
        break;
      case "bysalesProducts":
        getSalesProducts();
        break;
      case "prospectsclientes":
        getSummariesLeadsVsClients();
        break;

      default:
        break;
    }
  };

  const handleDate = (start, finish) => {
    if (start) {
      setStartDate(start);
    } else {
      setFinishDate(finish);
    }
  };

  const getSumariesEntitiesByGroup = async () => {
    try {
      setIsFetching(true);

      let response = await apiManager.getSumariesEntitiesByGroup(startDate, finishDate, groupId, executiveId);
      const results = response.data.results || [];
      const sumvalues = apiManager.calculateSumValues(results);

      let normalizeTable = apiManager.nomalizeData(results, sumvalues);
      let totals = apiManager.normalizeDataTotals("_", sumvalues);

      normalizeTable.unshift(totals);

      setTotals(sumvalues);

      setSumcategories(normalizeTable);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSummariesCategoriesByGroup = async () => {
    try {
      setIsFetching(true);

      let response = await apiManager.getSummariesCategoriesByGroup(startDate, finishDate, groupId, executiveId);
      const results = response.data.results || [];

      const sumvalues = apiManager.calculateSumValues(results);

      let normalizeTable = apiManager.nomalizeData(results, sumvalues);
      let totals = apiManager.normalizeDataTotals("_", sumvalues);

      normalizeTable.unshift(totals);

      setTotals(sumvalues);

      setSumcategories(normalizeTable);

      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getSummariesProductsByGroup = async () => {
    try {
      setIsFetching(true);
      let params = {
        start_date: startDate,
        end_date: finishDate,
        group_id: groupId,
      };

      if (values.executiveSelected) {
        delete params.group_id;
        params = {
          ...params,
          executive_id: executiveId,
        };
      }

      let response = await apiManager.getSummariesProductsByGroup(startDate, finishDate, groupId, executiveId);
      const results = response.data.results || [];
      const sumvalues = apiManager.calculateSumValues(results);
      let normalizeTable = apiManager.nomalizeData(results, sumvalues, "productsbygroup");
      let totals = apiManager.normalizeDataTotals("_", sumvalues);
      normalizeTable.unshift(totals);
      setTotals(sumvalues);
      setSumcategories(normalizeTable);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSummariesLeadsVsClients = async () => {
    try {
      setIsFetching(true);
      let params = {
        start_date: startDate,
        end_date: finishDate,
        group_id: groupId,
      };

      if (values.executiveSelected) {
        delete params.group_id;
        params = {
          ...params,
          executive_id: executiveId,
        };
      }

      let response = await apiManager.getSummariesLeadsVsCustomers(startDate, finishDate, groupId, executiveId);
      const results = response.data.results || [];
      const sumvalues = apiManager.calculateSumValues(results, "prospectsclientes");
      let normalizeTable = apiManager.nomalizeData(results, sumvalues, "prospectsclientes");
      let totals = apiManager.normalizeDataTotals("_", sumvalues);
      normalizeTable.unshift(totals);
      setTotals(sumvalues);
      setSumcategories(normalizeTable);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSummariesEntitiesExtendByGroup = async () => {
    try {
      setIsFetching(true);
      let params = {
        // '2023-10-01T00:00:00-06:00',
        // '2023-10-31T00:00:00-06:00',
        start_date: "2023-10-01T00:00:00-06:00",
        end_date: "2023-10-31T00:00:00-06:00",
        group_id: groupId,
      };

      let response = await api.get("summary/summaryentitiesbygroupextend", { params });

      let totalCotizado = 0;
      let totalLeads = 0;
      let totalLeadsBefore = 0;
      let totalLeadsCurrent = 0;
      let totalBeforeQuotes = 0;
      let totalMonthQuotes = 0;
      let totalSold = 0;

      let normalizeTable = [];
      response.data.results.forEach(item => {
        totalCotizado += item["Cotizado"];
        totalLeads += Number(item["Leads anteriores"]) + Number(item["Lead Mensual"]);
        totalLeadsBefore += Number(item["Leads anteriores"]);
        totalLeadsCurrent += Number(item["Lead Mensual"]);
        totalBeforeQuotes += Number(item["Cotizado de Prospectos anteriores"]);
        totalMonthQuotes += Number(item["Cotizado Prospecto del mes"]);

        totalSold += item["Vendido"];

        let itemx = {
          ["Nombre"]: item["Nombre"],
          ["Leads Actuales"]: item["Lead Mensual"],
          ["Leads Anteriores"]: item["Leads anteriores"],
          ["Leads Totales"]: totalLeadsCurrent + totalLeadsBefore,
          ["Cotizado"]: item["Cotizado"],
          ["Cotizado de Prospectos anteriores"]: item["Cotizado de Prospectos anteriores"],
          ["Cotizado Prospecto del mes"]: item["Cotizado Prospecto del mes"],
          ["Vendido"]: item["Vendido"],
          ["colors"]: {
            ["Leads Actuales"]: getStatusColor(Number(totalLeadsCurrent), Number(item["Leads Actuales"])),
            ["Leads Anteriores"]: getStatusColor(Number(totalLeadsBefore), Number(item["Leads Anteriores"])),
            ["Leads Totales"]: getStatusColor(
              totalLeadsCurrent + totalLeadsBefore,
              totalLeadsCurrent + totalLeadsBefore
            ),
            ["Cotizado"]: getStatusColor(totalCotizado, item["Cotizado"]),
            ["Cotizado de Prospectos anteriores"]: getStatusColor(
              totalBeforeQuotes,
              item["Cotizado de Prospectos anteriores"]
            ),
            ["Cotizado Prospecto del mes"]: getStatusColor(totalMonthQuotes, item["Cotizado Prospecto del mes"]),
            ["Vendido"]: getStatusColor(totalSold, item["Vendido"]),
          },
        };

        normalizeTable.push(itemx);
      });

      let totals = {
        ["Nombre"]: "TOTALES",
        ["Leads Actuales"]: totalLeadsCurrent,
        ["Leads Anteriores"]: totalLeadsBefore,
        ["Leads Totales"]: totalLeadsCurrent + totalLeadsBefore,
        ["Cotizado"]: totalCotizado,
        ["Cotizado de Prospectos anteriores"]: totalBeforeQuotes,
        ["Cotizado Prospecto del mes"]: totalMonthQuotes,
        ["Vendido"]: totalSold,
        ["colors"]: {
          ["Leads Actuales"]: getStatusColor(totalLeadsCurrent, Number(totalLeadsCurrent)),
          ["Leads Anteriores"]: getStatusColor(totalLeadsBefore, Number(totalLeadsBefore)),
          ["Leads Totales"]: getStatusColor(totalLeadsCurrent + totalLeadsBefore, totalLeadsCurrent + totalLeadsBefore),
          ["Cotizado"]: getStatusColor(totalCotizado, totalCotizado),
          ["Cotizado de Prospectos anteriores"]: getStatusColor(totalBeforeQuotes, totalBeforeQuotes),
          ["Cotizado Prospecto del mes"]: getStatusColor(totalMonthQuotes, totalMonthQuotes),
          ["Vendido"]: getStatusColor(totalSold, totalSold),
        },
      };

      normalizeTable.unshift(totals);

      setTotals({
        totalCotizado: totalCotizado,
        totalLeads: totalLeadsCurrent + totalLeadsBefore,
        totalBeforeQuotes: totalBeforeQuotes,
        totalMonthQuotes: totalMonthQuotes,
        totalSold: totalSold,
      });

      setSumcategories(normalizeTable.slice(0, 20));
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const getProspectsByEntities = async () => {
    try {
      // setIsLoading(true);
      setIsFetching(true);
      let query = {};
      query.prospect = {
        createdAt: { $gte: startDate, $lte: finishDate },
        isoportunity: false,
      };

      if (executiveId) {
        query.ejecutive = {
          id: executiveId,
        };
      }

      let params = {
        where: JSON.stringify(query),
        order: "-totalProspects",
        limit: limit,
        count: 1,
        skip: page,
      };
      let ProspectEntitites = await api.get(`dashboard/entitiesprospect`, { params });
      let normalizeTable = ProspectEntitites.data.results.map((item, index) => ({
        ["id"]: item["id"],
        ["Nombre"]: item["name"],
        ["Total"]: item["totalProspects"],
      }));

      setSumcategories(normalizeTable);
      setCount(ProspectEntitites.data?.count);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getProspectsByOrigin = async () => {
    try {
      setIsFetching(true);
      let query = {};
      query.prospect = {
        createdAt: { $gte: startDate, $lte: finishDate },
        isoportunity: false,
      };

      if (executiveId) {
        query.ejecutive = {
          id: executiveId,
        };
      }
      let params = {
        where: JSON.stringify(query),
        order: "-totalProspects",
        limit: limit,
        count: 1,
        skip: page,
      };

      let response = await api.get(`dashboard/originsprospect`, { params });
      let results = response.data.results || [];
      let normalizeTable = apiManager.normalizeDataCommon(results, "totalProspects");

      setSumcategories(normalizeTable);
      setCount(response.data?.count);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  const getProspectsType = async () => {
    try {
      // setIsLoading(true);
      setIsFetching(true);
      let query = {};
      query.prospect = {
        isoportunity: false,
        createdAt: { $gte: startDate, $lte: finishDate },
      };

      if (executiveId) {
        query.ejecutive = {
          id: executiveId,
        };
      }

      let params = {
        where: JSON.stringify(query),
        order: "-totalProspects",
        limit: limit,
        count: 1,
        skip: page,
      };

      let ProspectsClienType = await api.get(`dashboard/clienttypeprospect`, { params });

      let results = ProspectsClienType.data.results || [];
      let normalizeTable = apiManager.normalizeDataCommon(results, "totalProspects");
      setSumcategories(normalizeTable);
      setCount(ProspectsClienType.data?.count);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getOportunityAmountProduct = async () => {
    try {
      // setIsLoading(true);
      setIsFetching(true);
      let query = {};
      query.oportunity = {
        createdAt: { $gte: startDate, $lte: finishDate },
        iscloseout: false,
      };

      if (executiveId) {
        query.ejecutive = {
          id: executiveId,
        };
      }

      let params = {
        where: JSON.stringify(query),
        order: "-totalAmount",
        skip: page,
        limit: limit,
        count: 1,
      };

      let opottunityAmountProduct = await api.get(`dashboard/productquotesamount`, { params });
      let results = opottunityAmountProduct.data.results || [];
      let normalizeTable = apiManager.normalizeDataCommon(results, "totalAmount");
      setSumcategories(normalizeTable);
      setCount(opottunityAmountProduct.data?.count);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getOportunityEntityAmount = async () => {
    try {
      setIsFetching(true);
      let query = {};
      query.oportunity = {
        createdAt: { $gte: startDate, $lte: finishDate },
        iscloseout: false,
      };

      if (executiveId) {
        query.ejecutive = {
          id: executiveId,
        };
      }

      let params = {
        where: JSON.stringify(query),
        order: "-totalAmount",
        count: 1,
        skip: page,
        limit: limit,
      };

      let OportunitiesEntitiesAmount = await api.get(`dashboard/entitiesamount`, { params });
      let results = OportunitiesEntitiesAmount.data.results || [];
      let normalizeTable = apiManager.normalizeDataCommon(results, "totalAmount");
      setSumcategories(normalizeTable);
      setCount(OportunitiesEntitiesAmount.data?.count);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getOportunityOriginAmount = async () => {
    try {
      setIsFetching(true);
      let query = {};
      query.oportunity = {
        createdAt: { $gte: startDate, $lte: finishDate },
        iscloseout: false,
      };

      if (executiveId) {
        query.ejecutive = {
          id: executiveId,
        };
      }

      let params = {
        where: JSON.stringify(query),
        order: "-totalAmount",
        count: 1,
        skip: page,
        limit: limit,
      };

      let oportunityOriginAmount = await api.get(`dashboard/originsamount`, { params });
      let results = oportunityOriginAmount.data.results || [];
      let normalizeTable = apiManager.normalizeDataCommon(results, "totalAmount");
      setSumcategories(normalizeTable);
      setCount(oportunityOriginAmount.data?.count);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getOportunityPhaseAmount = async () => {
    try {
      setIsFetching(true);
      let query = {};
      query.oportunity = {
        createdAt: { $gte: startDate, $lte: finishDate },
        iscloseout: false,
      };
      if (executiveId) {
        query.ejecutive = {
          id: executiveId,
        };
      }

      let params = {
        where: JSON.stringify(query),
        order: "-totalAmount",
        count: 1,
        skip: page,
        limit: limit,
      };
      let oportunityPhasesAmount = await api.get(`dashboard/phasesamount`, { params });
      let results = oportunityPhasesAmount.data.results || [];
      let normalizeTable = apiManager.normalizeDataCommon(results, "totalAmount");
      setSumcategories(normalizeTable);
      setCount(oportunityPhasesAmount.data?.count);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getOportunityTotalEntity = async () => {
    try {
      setIsFetching(true);
      let query = {};
      query.oportunity = {
        createdAt: { $gte: startDate, $lte: finishDate },
        iscloseout: false,
      };

      if (executiveId) {
        query.ejecutive = {
          id: executiveId,
        };
      }

      let params = {
        where: JSON.stringify(query),
        order: "-totalQuotes",
        count: 1,
        skip: page,
        limit: limit,
      };

      let oportunityTotalEntity = await api.get(`dashboard/entitiesquote`, { params });
      let results = oportunityTotalEntity.data.results || [];
      let normalizeTable = apiManager.normalizeDataCommon(results, "totalQuotes");
      setSumcategories(normalizeTable);
      setCount(oportunityTotalEntity.data?.count);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getOportunityTotalProduct = async () => {
    try {
      setIsFetching(true);
      let query = {};
      query.oportunity = {
        createdAt: { $gte: startDate, $lte: finishDate },
        iscloseout: false,
      };

      if (executiveId) {
        query.ejecutive = {
          id: executiveId,
        };
      }

      let params = {
        where: JSON.stringify(query),
        order: "-totalQuotes",
        count: 1,
        limit: limit,
        skip: page,
      };

      let oportunityTotalProduct = await api.get(`dashboard/productsquote`, { params });
      let results = oportunityTotalProduct.data.results || [];
      let normalizeTable = apiManager.normalizeDataCommon(results, "totalQuotes");
      setSumcategories(normalizeTable);
      setCount(oportunityTotalProduct.data?.count);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getSalesOrigin = async () => {
    try {
      setIsFetching(true);
      let query = {};
      query.oportunity = {
        createdAt: { $gte: startDate, $lte: finishDate },
      };

      if (executiveId) {
        query.ejecutive = {
          id: executiveId,
        };
      }

      let params = {
        where: JSON.stringify(query),
        order: "-totalAmount",
        count: 1,
        skip: page,
        limit: limit,
      };

      let salesOrigin = await api.get(`dashboard/originsalesamount`, { params });
      let results = salesOrigin.data.results || [];
      let normalizeTable = apiManager.normalizeDataCommon(results, "totalAmount");
      setSumcategories(normalizeTable);
      setCount(salesOrigin.data?.count);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getSalesEntities = async () => {
    try {
      setIsFetching(true);
      let query = {};
      query.oportunity = {
        createdAt: { $gte: startDate, $lte: finishDate },
      };

      if (executiveId) {
        query.ejecutive = {
          id: executiveId,
        };
      }

      let params = {
        where: JSON.stringify(query),
        order: "-totalAmount",
        count: 1,
        skip: page,
      };
      let SalesEntities = await api.get(`dashboard/entitysalesamount`, { params });
      let results = SalesEntities.data.results || [];
      let normalizeTable = apiManager.normalizeDataCommon(results, "totalAmount");
      setSumcategories(normalizeTable);
      setCount(SalesEntities.data?.count);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSalesProducts = async () => {
    try {
      setIsFetching(true);
      let query = {};
      query.oportunity = {
        createdAt: { $gte: startDate, $lte: finishDate },
      };

      if (executiveId) {
        query.ejecutive = {
          id: executiveId,
        };
      }

      let params = {
        where: JSON.stringify(query),
        order: "-totalAmount",
        count: 1,
        skip: page,
        limit: limit,
      };

      let salesProducts = await api.get(`dashboard/productsalesamount`, { params });
      let results = salesProducts.data.results || [];
      let normalizeTable = apiManager.normalizeDataCommon(results, "totalAmount");
      setSumcategories(normalizeTable);
      setCount(salesProducts.data?.count);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeView = (newView, ejecutive) => {
    setview(newView);
    setExecutiveId(ejecutive);
  };

  return {
    setview,
    sumcategories,
    totals,
    isFetching,
    view,
    handleChangeView,
    setExecutiveId,
    executiveId,
    startDate,
    finishDate,
    handleDate,
    handleEvent,
    values,
    setValues,
    setSumcategories,
    page,
    setPage,
    limit,
    setLimit,
    count,
    setCount,
    handleOnChangePage,
    flag,
    setFlag,
    restorePage,
  };
};

export default useSummariesGroup;
