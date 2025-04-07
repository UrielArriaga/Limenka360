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
  const [ShippingsData, setShippingsData] = useState({
    results: [],
    isFetching: false,
    isError: false,
    messageError: "",
  });

  const [isFetchingOrder, setIsFetchingOrder] = useState(false);

  const getShippingsOrder = async () => {
    try {
      setShippingsData(prev => ({ ...prev, isFetching: true }));
      const shipping = (await ordersService.getShippings(orderSelectedData.id)).data?.results || [];
      const normalizedShipping = shipping.map(item => item.shippingtype?.name || "No especificado");
      console.log(shipping);
      setShippingsData(prev => ({ ...prev, results: normalizedShipping, isFetching: false }));
    } catch (error) {
      setShippingsData(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
    }
    };
  useEffect(() => {
    let getDataOrder = async () => {
      try {
        setIsFetchingOrder(true);
        const response = await ordersService.getOrder(orderSelected?.id);

        setOrderSelectedData(response.data);
        setIsFetchingOrder(false);
      } catch (error) {
        setIsFetchingOrder(false);
      }
    };

    if (orderSelected) {
      getDataOrder();

    }
  }, [orderSelected]);

  useEffect(() => {
    const getProductsOrder = async () => {
      try {
        setProducts(prev => ({ ...prev, isFetching: true }));
        const resProducts = (await ordersService.getWareProductsOrder(orderSelectedData.id)).data?.results || [];

        setProducts(prev => ({ ...prev, results: resProducts, isFetching: false }));
      } catch (error) {
        setProducts(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
      }
    };

    if (orderSelectedData) {
      getProductsOrder();
      getShippingsOrder();
    }
  }, [orderSelected, orderSelectedData]);

  return {
    orderSelectedData,
    isFetchingOrder,
    productsData,
    ShippingsData
  };
}
