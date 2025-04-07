import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "../../../services/api";
import { ShippingsOrdersServices } from "../services";

export default function useShippingOrder(orderSelected) {
  const [isFetchingOrder, setIsFetchingOrder] = useState(false);
  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const ordersService = new ShippingsOrdersServices();
  useEffect(() => {
    let getDataOrder = async () => {
      try {
        setIsFetchingOrder(true);
        const response = await ordersService.getOrderId(orderSelected.id);
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
  }, [orderSelected]);

  return {
    isFetchingOrder,
    orderSelectedData,
  };
}
