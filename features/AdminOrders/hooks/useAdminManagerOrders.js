import React, { useContext, useEffect, useState } from "react";
import { CommonFiltersContext } from "../../../context/commonFiltersContext";
import { OrdersAdminServices } from "../services";
import { normalizeTableDataOrdesAdmin } from "../../../utils/normalizeData";

export default function useAdminManagerOrders() {
  const [valueToFind, setValueToFind] = useState({ search: false, keySearch: "", type: "inQuery" });

  const [filters, setFilters] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderBy, setOrderBy] = useState({ by: "createdAt", desc: false });
  const [counters, setCounters] = useState({
    all: 0,
    approve: 0,
    pending: 0,
    denied: 0,
  });

  const [totalOrders, setTotalOrders] = useState(0);
  const [page, setPage] = useState(1);
  const ordersService = new OrdersAdminServices();
  const [refetch, setRefetch] = useState(false);
  const [isLoandingOrders, setIsLoadingOrders] = useState(true);
  const { adminAndPursachesOptionsOrders: options } = useContext(CommonFiltersContext);
  const limitPage = 20;
  const totalPages = Math.ceil(totalOrders / limitPage);
  const includes =
    "oportunity,oportunity.prospect,oportunity.soldby,oportunity.typesale,orderstatus,createdbyid,paymentaccount,bill";

  useEffect(() => {
    getData();
  }, [refetch, page, filters, orderBy]);

  useEffect(() => {
    getDataCounters();
  }, [refetch]);

  const validateParams = () => {
    let includeValues = includes;
    let params = {
      include: includeValues,
      order: `${orderBy.desc ? "-" : ""}${orderBy.by}`,
      skip: page,
      count: 1,
      limit: limitPage,
      join: validateJoinsFilters(filters),
      where: generateFilters(),
    };
    return params;
  };
  const generateFilters = () => {
    let query = {};
    let inQueryEjecutive = {};
    let inQueryBill = {};
    query.createdbyid = inQueryEjecutive;
    query.bill = inQueryBill;
    filters?.forEach(currentQuery => {
      switch (currentQuery.id) {
        case "keySearch":
          const key = currentQuery.value?.trim();
          if (key) {
            query.folio = { iRegexp: key };
          }
          break;
        case "id":
        case "groupId":
          inQueryEjecutive[currentQuery.id] = currentQuery.value;
          break;
        case "cfdiId":
        case "paymentmethodId":
        case "paymentwayId":
        case "taxregimeId":
          inQueryBill[currentQuery.id] = currentQuery.value;
          break;
        default:
          query[currentQuery.id] =
            currentQuery.typeof === "date" ? { between: currentQuery.value } : currentQuery.value;
          break;
      }
    });

    return JSON.stringify(query);
  };
  const validateJoinsFilters = filtersOrder => {
    // Verificar la existencia de los filtros
    const cfdiExists = filtersOrder?.some(item => item.id === "cfdiId");
    const paymentMethodExists = filtersOrder?.some(item => item.id === "paymentmethodId");
    const paymentwayIdExists = filtersOrder?.some(item => item.id === "paymentwayId");
    const baseJoins = "oportunity,oportunity.prospect,oportunity.soldby,oportunity.typesal,orderstatus,createdbyid,p";
    // Determinar el final del join para pedidos con factura y sin factura
    const additionalJoin = cfdiExists || paymentMethodExists || paymentwayIdExists ? "bill" : "bil";
    // Combinar los joins
    const joins = [`${baseJoins},${additionalJoin}`];
    return joins.join(",");
  };

  const getData = async () => {
    try {
      setIsLoadingOrders(true);
      let response = await ordersService.getOrders(validateParams());
      let ordenes = normalizeTableDataOrdesAdmin(response.data.results) || [];
      setOrders(ordenes);
      setTotalOrders(response.data.count);
      setIsLoadingOrders(false);
    } catch (error) {
      setIsLoadingOrders(false);
      console.log(error);
    }
  };

  const validateParamsCounters = status => {
    let query = {};
    if (status) query.orderstatus = { status: status };
    let params = {
      where: JSON.stringify(query),
      count: 1,
      subquery: 0,
      include: "orderstatus",
    };
    return params;
  };

  const getDataCounters = async () => {
    try {
      let counters = {};
      counters.all = await ordersService.getCounterAll(validateParamsCounters());
      counters.pending = await ordersService.getCounterPending(validateParamsCounters(1));
      counters.approve = await ordersService.getCounterApprove(validateParamsCounters(2));
      counters.denied = await ordersService.getCounterDenied(validateParamsCounters(3));
      setCounters(counters);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefetch = () => setRefetch(!refetch);

  const handleDataOrder = event => {
    let option = event.target.value;
    setOrderBy({ ...orderBy, by: option });
  };

  const handleOrderDesc = event => {
    let option = event.target.value;
    setOrderBy({ ...orderBy, desc: option });
  };

  const handlePage = (event, page) => setPage(page);
  const restorePage = () => {
    if (page > 1) setPage(1);
  };

  return {
    dataPagination: {
      page: page,
      countPages: totalPages,
      handlePage: handlePage,
    },
    optionsFilters: options.optionsFilters,
    filters,
    ordersData: {
      orders: orders,
      isLoad: isLoandingOrders,
      refetch: handleRefetch,
      count: totalOrders,
    },
    orderBy,
    counters,
    valueToFind,
    setValueToFind,
    setFilters,
    restorePage,
    handleRefetch,
    handleDataOrder,
    handleOrderDesc,
  };
}
