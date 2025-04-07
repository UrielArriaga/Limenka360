import { useEffect, useState } from "react";
import { OrdersApi } from "../services";

export default function useDirLogPedidoSelected(orderSelected) {
  const ordersService = new OrdersApi();

  const [productsData, setProducts] = useState({
    results: [],
    isFetching: false,
    isError: false,
    messageError: "",
  });

  useEffect(() => {
    if (orderSelected) {
      getProductsOrders();
    }
  }, [orderSelected]);

  const getProductsOrders = async () => {
    try {
      setProducts(prev => ({ ...prev, isFetching: true }));
      const resProducts = (await ordersService.getProductsOrder(orderSelected.oportunityId)).data?.results || [];
      setProducts(prev => ({ ...prev, results: resProducts, isFetching: false }));
    } catch (error) {
      setProducts(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
      console.log(error);
    }
  };

  const refetchPedido = async () => {
    getProductsOrders();
  };

  return {
    productsData,
    refetchPedido,
  };
}
