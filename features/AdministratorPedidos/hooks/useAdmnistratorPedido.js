import React, { useEffect, useState } from "react";
import AdministratorPedidosService from "../services";
import useAlertToast from "../../../hooks/useAlertToast";

export default function useAdmnistratorPedido(orderSelected) {
  const admService = new AdministratorPedidosService();
  const [orderData, setOrderData] = useState(null);
  const { showAlertSucces, showAlertError } = useAlertToast();

  const [showPdf, setShowPdf] = useState(false);

  const [productsData, setProductsData] = useState({
    products: [],
    isFetching: false,
    count: 0,
    isError: false,
    isSuccess: false,
  });

  useEffect(() => {
    if (orderSelected) {
      fecthOrderData();
    }
    if (orderSelected) {
      fetchProductsOportunity();
    }
  }, [orderSelected]);

  const fecthOrderData = async () => {
    try {
      let resp = await admService.getOrderById(orderSelected?.id);

      setOrderData(resp.data);
    } catch (error) {
      showAlertError("Error al obtener la información del pedido");
      console.log(error);
    }
  };

  const fetchProductsOportunity = async () => {
    try {
      let resp = await admService.getProductsOportunity(orderSelected?.oportunityId);

      setProductsData(prev => ({
        ...prev,
        products: resp.data?.results,
        count: resp.data.length,
        isFetching: false,
        isSuccess: true,
      }));
    } catch (error) {
      showAlertError("Error al obtener la información del pedido");
      console.log(error);
    }
  };

  const handleOnChangeShowPdf = e => {
    setShowPdf(e.target.checked);
  };

  return {
    orderData,
    productsData,
    showPdf,
    handleOnChangeShowPdf,
  };
}
