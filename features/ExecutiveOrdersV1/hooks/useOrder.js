import React, { useState, useEffect, useMemo } from "react";
import { ApiServiceExOr } from "../service";

export default function useOrder(orderSelected) {
  const request = useMemo(() => new ApiServiceExOr(), []);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const orderId = orderSelected?.id;

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      if (orderId) {
        const response = await request.getOrder(orderId);
        setOrderData(response.data);
      } else {
        setOrderData(null);
      }
    } catch (error) {
      setError(error);
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    } else {
      setOrderData(null);
      setLoading(false);
      setError(null);
    }
  }, [orderId, request]);

  return {
    orderData,
    loading,
    error,
  };
}
