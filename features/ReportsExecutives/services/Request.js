import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { api } from "../../../services/api";


export default function useRequest() {

const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());
const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
const [limit, SetLimit] = useState(10);
const [page, setPage] = useState(1);
const [searchBy, setSearchBy] = useState("byprospectEntities");
const [dataReport, SetDataReport] = useState([]);
const [initialQuery, setInitialQuery] = useState(true);
const [options, SetOptions] = useState("");
const [count, setCount] = useState(1);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
    handleRequest(searchBy);
    SetOptions();
  }, [limit, startDate, finishDate, page]);

  const requestCategory = async () => {

    try {
      setIsLoading(true);
      let query = {};
      let join = "prospect,oportunity";
      !initialQuery
        ? (query.oportunity = {
            createdAt: { $gte: startDate, $lte: finishDate },
            iscloseout: false,
          })
        : (query.oportunity = {
            createdAt: { $gte: startDate, $lte: finishDate },
            iscloseout: false,
          });
      let categoryQuotes = await api.get(
        `dashboard/productquotesamount?where=${JSON.stringify(
          query
        )}&limit=${limit}&join=${join}&order=-totalIndividualAmount`
      );
      setDataOportunities(categoryQuotes.data.results, categoryQuotes.data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  const requestEntities = async () => {
    try {
      setIsLoading(true);
      let query = {};
      let join = "prospect";
      !initialQuery
        ? (query.oportunity = {
            createdAt: { $gte: startDate, $lte: finishDate },
            iscloseout: false,
          })
        : (query.oportunity = {
            createdAt: { $gte: startDate, $lte: finishDate },
            iscloseout: false,
          });
      let EntitiesQuotes = await api.get(
        `dashboard/entitiesamount?where=${JSON.stringify(query)}&limit=${limit}&join=${join}&order=-totalAmount`
      );
      setDataOportunities(EntitiesQuotes.data.results, EntitiesQuotes.data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  const requestEntitiesQuotes = async () => {
    try {
      setIsLoading(true);
      let query = {};
      let join = "prospect";
      !initialQuery
        ? (query.oportunity = {
            createdAt: { $gte: startDate, $lte: finishDate },
            iscloseout: false,
          })
        : (query.oportunity = {
            createdAt: { $gte: startDate, $lte: finishDate },
            iscloseout: false,
          });
      let EntitiesQuotes = await api.get(
        `dashboard/entitiesquote?where=${JSON.stringify(
          query
        )}&limit=${limit}&join=${join}&order=-totalQuotes&page=${page}`
      );
      setDataOportunities(EntitiesQuotes.data.results, EntitiesQuotes.data?.count);
    } catch (error) {
      console.log(error);
    }
  };
  const requestorigins = async () => {
    try {
      setIsLoading(true);
      let query = {};
      let join = "prospect";
      !initialQuery
        ? (query.oportunity = {
            createdAt: { $gte: startDate, $lte: finishDate },
            iscloseout: false,
          })
        : (query.oportunity = {
            createdAt: { $gte: startDate, $lte: finishDate },
            iscloseout: false,
          });
      let OriginsQuotes = await api.get(
        `dashboard/originsamount?where=${JSON.stringify(query)}&join=${join}&limit=${limit}&order=-totalAmount`
      );
      setDataOportunities(OriginsQuotes.data.results, OriginsQuotes.data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  const requesphase = async () => {
    try {
      setIsLoading(true);
      let query = {};
      let join = "prospect";
      !initialQuery
        ? (query.oportunity = {
            createdAt: { $gte: startDate, $lte: finishDate },
            iscloseout: false,
          })
        : (query.oportunity = {
            createdAt: { $gte: startDate, $lte: finishDate },
            iscloseout: false,
          });
      let PhaseQuotes = await api.get(
        `dashboard/phasesamount?where=${JSON.stringify(query)}&join=${join}&limit=${limit}&order=-totalAmount`
      );
      setDataOportunities(PhaseQuotes.data.results, PhaseQuotes.data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  const requesproducts = async () => {
    try {
      setIsLoading(true);
      let query = {};
      let join = "prospect";
      !initialQuery
        ? (query.oportunity = {
            createdAt: { $gte: startDate, $lte: finishDate },
            iscloseout: false,
          })
        : (query.oportunity = {
            createdAt: { $gte: startDate, $lte: finishDate },
            iscloseout: false,
          });
      let ProductsQuotes = await api.get(
        `dashboard/productsquote?where=${JSON.stringify(query)}&join=${join}&limit=${limit}&order=-totalQuotes`
      );
      setDataOportunities(ProductsQuotes.data.results, ProductsQuotes.data?.count);
    } catch (error) {
      console.log(error);
    }
  };

   const requesprospectentities = async () => {
    try {
      setIsLoading(true);
      let query = {};
      !initialQuery
        ? (query.prospect = {
            createdAt: { $gte: startDate, $lte: finishDate },
            isoportunity: false,
          })
        : (query.prospect = {
            createdAt: { $gte: startDate, $lte: finishDate },
            isoportunity: false,
          });
      let ProspectEntitites = await api.get(
        `dashboard/entitiesprospect?where=${JSON.stringify(
          query
        )}&limit=${limit}&order=-totalProspects&count=1&skip=${page}`
      );
      setCount(Math.ceil(ProspectEntitites.data.count / limit));
      setDataOportunities(ProspectEntitites.data.results, ProspectEntitites.data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  const requesprospectorigins = async () => {
    try {
      setIsLoading(true);
      let query = {};
      !initialQuery
        ? (query.prospect = {
            createdAt: { $gte: startDate, $lte: finishDate },
            isoportunity: false,
          })
        : (query.prospect = {
            createdAt: { $gte: startDate, $lte: finishDate },
            isoportunity: false,
          });
      let ProspectOrigins = await api.get(
        `dashboard/originsprospect?where=${JSON.stringify(query)}&limit=${limit}&order=-totalProspects`
      );
      setDataOportunities(ProspectOrigins.data.results, ProspectOrigins.data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  const requesprospectType = async () => {
    try {
      setIsLoading(true);
      let query = {};
      !initialQuery
        ? (query.prospect = {
            createdAt: { $gte: startDate, $lte: finishDate },
            isoportunity: false,
          })
        : (query.prospect = {
            createdAt: { $gte: startDate, $lte: finishDate },
            isoportunity: false,
          });
      let ProspectType = await api.get(
        `dashboard/clienttypeprospect?where=${JSON.stringify(query)}&limit=${limit}&order=-totalProspects`
      );
      setDataOportunities(ProspectType.data.results, ProspectType.data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  const requesSalesOrigin = async () => {
    try {
      setIsLoading(true);
      let query = {};
      let join = "prospect";
      !initialQuery
        ? (query.oportunity = {
            soldat: { $gte: startDate, $lte: finishDate },
          })
        : (query.oportunity = {
            soldat: { $gte: startDate, $lte: finishDate },
          });
      let SalesOrigins = await api.get(
        `dashboard/originsalesamount?where=${JSON.stringify(query)}&join=${join}&limit=${limit}&order=-totalAmount`
      );
      setDataOportunities(SalesOrigins.data.results, SalesOrigins.data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  const requesSalesProducts = async () => {
    try {
      setIsLoading(true);
      let query = {};
      let join = "prospect,oportunity";
      !initialQuery
        ? (query.oportunity = {
            soldat: { $gte: startDate, $lte: finishDate },
          })
        : (query.oportunity = {
            soldat: { $gte: startDate, $lte: finishDate },
          });
      let SalesProducts = await api.get(
        `dashboard/productsalesamount?where=${JSON.stringify(query)}&join=${join}&limit=${limit}&order=-totalAmount`
      );
      setDataOportunities(SalesProducts.data.results, SalesProducts.data?.count);
    } catch (error) {
      console.log(error);
    }
  };
  const requesSalesEntities = async () => {
    try {
      setIsLoading(true);
      let query = {};
      let join = "prospect";
      !initialQuery
        ? (query.oportunity = {
            soldat: { $gte: startDate, $lte: finishDate },
          })
        : (query.oportunity = {
            soldat: { $gte: startDate, $lte: finishDate },
          });
      let SalesEntities = await api.get(
        `dashboard/entitysalesamount?where=${JSON.stringify(query)}&join=${join}&limit=${limit}&order=-totalAmount`
      );
      setDataOportunities(SalesEntities.data.results, SalesEntities.data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  let labels = dataReport.map(function (item) {
    return `${item.name}`;
  });
  let totals = dataReport.map(function (item, e) {
    if (searchBy === "bytotalentities" || searchBy === "bytotalproducts") {
      return `${item.totalQuotes}`;
    } else if (searchBy === "byprospectEntities" || searchBy === "byprospectOrigins" || searchBy === "byprospectType") {
      return `${item.totalProspects}`;
    } else if (searchBy === "bysalesProducts, bycategory") {
      return `${item.totalIndividualAmount}`;
    } else {
      return `${item.totalAmount}`;
    }
  });



  const handleRequest = value => {
    switch (value) {
      case "bycategory":
        requestCategory();
        break;
      case "byentities":
        requestEntities();
        break;
      case "byorigin":
        requestorigins();
        break;
      case "byphase":
        requesphase();
        break;
      case "bytotalentities":
        requestEntitiesQuotes();
        break;
      case "bytotalproducts":
        requesproducts();
        break;
      case "byprospectEntities":
        requesprospectentities();
        break;
      case "byprospectOrigins":
        requesprospectorigins();
        break;
      case "byprospectType":
        requesprospectType();
        break;
      case "bysalesOrigin":
        requesSalesOrigin();
        break;
      case "bysalesEntities":
        requesSalesEntities();
        break;
      case "bysalesProducts":
        requesSalesProducts();
        break;
    }
  };


    const setDataOportunities = (array, total) => {
        SetDataReport(array);
         setIsLoading(false);
        };

        return{

    finishDate, 
    setFinishDate,
    startDate, 
    setStartDate,
    limit, 
    SetLimit,
    page,
    setPage,
    searchBy,
    setSearchBy,
    dataReport,
    SetDataReport,
    initialQuery, 
    setInitialQuery,
    options, 
    SetOptions,
    count,
    isLoading,
    handleRequest,
    labels,
    totals

        }

    }