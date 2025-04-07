import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { OrdersServices } from "../services";
import { set } from "date-fns";

export default function usePurchasingManagerShoppingPedido(orderSelected) {
  const ordersService = new OrdersServices();
  const [flagToRefetch, setFlagToRefetch] = useState(false);
  const [orderSelectedData, setOrderSelectedData] = useState(null);

  const [totalOrdersShopping, settotalOrdersShopping] = useState(0);

  const [productsData, setProducts] = useState({
    results: [],
    isFetching: false,
    isError: false,
    messageError: "",
  });

  const [isFetchingOrder, setIsFetchingOrder] = useState(false);

  useEffect(() => {
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

    if (orderSelected) {
      getDataOrder();
    }
  }, [orderSelected, flagToRefetch]);

  useEffect(() => {
    const getProductsOrder = async () => {
      try {
        setProducts(prev => ({ ...prev, isFetching: true }));

        const resProducts = (await ordersService.getProductsOrder(orderSelectedData.oportunityId)).data?.results || [];

        setProducts(prev => ({
          ...prev,
          results: resProducts.map(item => ordersService.normalizeProductsOportunities(item)),
          isFetching: false,
        }));
      } catch (error) {
        setProducts(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
        console.log(error);
      }
    };

    if (orderSelectedData) {
      getProductsOrder();
    }
  }, [orderSelected, orderSelectedData, flagToRefetch]);

  useEffect(() => {
    console.log("----------------------");
    const getProductsByOrderCompras = async () => {
      console.log(orderSelected);
      try {
        let params = {
          where: {
            orderId: orderSelected?.id,
          },
          count: 1,
          limit: 0,
        };
        const response = (await api.get("pickuppurchaseorder", { params })).data;
        settotalOrdersShopping(response.count || 0);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (orderSelected) {
      getProductsByOrderCompras();
    }
  }, [orderSelected, flagToRefetch]);

  const getDataOrder = () => {
    console.log("ssss----ssss");
    setFlagToRefetch(!flagToRefetch);
  };

  return {
    orderSelectedData,
    isFetchingOrder,
    productsData,
    totalOrdersShopping,
    getDataOrder,
  };
}
