import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { OrdersServices } from "../services";

export default function useDirLogPedido(orderSelected) {
  const ordersService = new OrdersServices();

  const [orderSelectedData, setOrderSelectedData] = useState(null);

  const [productsData, setProducts] = useState({
    results: [],
    isFetching: false,
    isError: false,
    messageError: "",
  });

  const [isFetchingOrder, setIsFetchingOrder] = useState(false);

  useEffect(() => {
    if (orderSelected) {
      getDataOrder();
    }
  }, [orderSelected]);

  useEffect(() => {
    const getProductsOrder = async () => {
      try {
        setProducts(prev => ({ ...prev, isFetching: true }));
        const resProducts = (await ordersService.getProductsOrder(orderSelectedData.oportunityId)).data?.results || [];

        setProducts(prev => ({ ...prev, results: resProducts, isFetching: false }));
      } catch (error) {
        setProducts(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
        console.log(error);
      }
    };

    if (orderSelectedData) {
      getProductsOrder();
    }
  }, [orderSelected, orderSelectedData]);

  let getDataOrder = async () => {
    try {
      setIsFetchingOrder(true);
      const response = await ordersService.getOrder(orderSelected.id);
      console.log("response.data", response.data?.oportunity);

      setOrderSelectedData(response.data);
      setIsFetchingOrder(false);
    } catch (error) {
      console.log(error);
      setIsFetchingOrder(false);
    }
  };

  const refetchPedido = async () => {
    getDataOrder();
  };

  return {
    orderSelectedData,
    isFetchingOrder,
    productsData,
    refetchPedido,
  };
}
