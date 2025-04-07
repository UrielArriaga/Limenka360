import React, { useEffect, useState } from "react";
import { ProductsServices } from "../services";
import usePagination from "../../../hooks/usePagination";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export default function useOrderPeddings() {
  const productsService = new ProductsServices();
  const { roleId } = useSelector(userSelector);
  const [orderBy, setOrderBy] = useState("id");
  const { page, limit, handlePage } = usePagination({ defaultLimit: 60, defaultPage: 1 });
  const [keyword, setKeyword] = useState("");

  const getDates = [
    { id: 1, label: "Día", value: "day" },
    { id: 2, label: "Semana", value: "week" },
    { id: 3, label: "Mes", value: "month" },
  ];

  const [selectRange, setSelectRange] = useState(getDates[1]);

  const [dataAllProducts, setDataAllProducts] = useState({
    isFetching: false,
    count: 0,
  });

  const [dataOrders, setDataOrders] = useState({
    isFetching: false,
    count: 0,
  });
  const [countOrders, setCountOrders] = useState({
    isFetching: false,
    count: 0,
  });
  const [countAmountProvider, setCountAmountProvider] = useState({
    data: [],
    isFetching: false,
    count: 0,
  });

  const[peddinsData, setPeddinsData] = useState({
    isFetching: false,
    count: 0,
  })

  useEffect(() => {
    getDataProducts();
    getDataOrdersShoppingreports();
    getDataOrders();
    getAmountsProviders();
    getPendingOrders();
  }, [selectRange]);

  function getDateRange(selectRange) {
    switch (selectRange.value) {
      case "day":
        return {
          rangestart: dayjs().startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
          rangefinish: dayjs().endOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        };

      case "week":
        return {
          rangestart: dayjs().startOf("week").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
          rangefinish: dayjs().endOf("week").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        };

      case "month":
        return {
          rangestart: dayjs().startOf("month").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
          rangefinish: dayjs().endOf("month").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        };

      default:
        return { error: "Valor no válido" };
    }
  }

  const getDataProducts = async () => {
    try {
      setDataAllProducts(prev => ({ ...prev, isFetching: true }));
      const query = getDateRange(selectRange); // Obtener el rango de fechas
      const response = await productsService.getProducts(query);
      setDataAllProducts({ isFetching: false, count: response.data[0].total || 0 });
    } catch (error) {
      console.log("getProducts", error);
      setDataAllProducts(prev => ({ ...prev, isFetching: false }));
    }
  };

  const getDataOrdersShoppingreports = async () => {
    try {
      setDataOrders(prev => ({ ...prev, isFetching: true }));
      const query = getDateRange(selectRange); 
      const response = await productsService.getShoppingreports(query);
      setDataOrders({ isFetching: false, count: response.data[0].total || 0 });
    } catch (error) {
      console.log("getOgetDataOrdersShoppingreportsError", error);
      setDataOrders(prev => ({ ...prev, isFetching: false }));
    }
  };
  const getDataOrders = async () => {
    try {
      setCountOrders(prev => ({ ...prev, isFetching: true }));
      const query = getDateRange(selectRange); 
      const response = await productsService.getOrders(query,roleId);
     
      setCountOrders({ isFetching: false, count: response.data.count  });
    } catch (error) {
      console.log("getOrders", error);
      setDataOrders(prev => ({ ...prev, isFetching: false }));
    }
  };
  const getAmountsProviders = async () => {
    try {
      setCountAmountProvider(prev => ({ ...prev, isFetching: true }));
      const query = getDateRange(selectRange); 
      const response = await productsService.AmountsProviders(query);
      setCountAmountProvider({ data: response.data, isFetching: false,  });
    } catch (error) {
      console.log("AmountsProviders", error);
      setDataOrders(prev => ({ ...prev, isFetching: false }));
    }
  };

  const getPendingOrders = async () => {
    try {
      setPeddinsData((prev) => ({ ...prev, isFetching: true }));
      const query = getDateRange(selectRange);
      const response = await productsService.getPendingOrders(query, roleId); 
      ssetPeddinsData({ isFetching: false, count: response.data.count || 0, data: response.data.orders || [] });
    } catch (error) {
      console.log("getPendingOrdersError", error);
      setPeddinsData((prev) => ({ ...prev, isFetching: false }));
    }
  };

  

  return {
    dataAllProducts,
    dataOrders,
    countOrders,
    getDates,
    selectRange,
    setSelectRange,
    countAmountProvider,
    peddinsData
  };
}
