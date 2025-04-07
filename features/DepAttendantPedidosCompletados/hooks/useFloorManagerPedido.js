import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { OrdersServices } from "../services";
import useAlertToast from "../../../hooks/useAlertToast";
import { ORDERSTATUS } from "../../../constants";

export default function useFloorManagerPedido(orderSelected, handleToggleFiles, updateStateData) {
  const ordersService = new OrdersServices();

  const { showAlertError, showAlertSucces } = useAlertToast();

  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const [articleSelected, setArticleSelected] = useState(null);

  const [inventoryExitId, setInventoryExitId] = useState(null);

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
        const response = await ordersService.getOrder(orderSelected?.orderId);

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
        //
        setProducts(prev => ({ ...prev, isFetching: true }));
        const resProducts = (await ordersService.getArticlesByWareHouseOrder(orderSelected?.orderId)).data?.results || [];
        setInventoryExitId(resProducts[0]?.inventoryexitId);
        setProducts(prev => ({ ...prev, results: resProducts, isFetching: false }));
      } catch (error) {
        setProducts(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
      }
    };

    if (orderSelected) {
      getProductsOrder();
    }
  }, [orderSelected, orderSelectedData]);

  const handleOnClickArticle = article => {
    setArticleSelected(article);
    handleToggleFiles();
  };

  const handleOnClickNewExit = async () => {
    let isConfirm = window.confirm("¿Estás seguro de marcar la salida como completada?");
    if (!isConfirm) return;

    try {
      await ordersService.markAsCompleteExit(inventoryExitId);
      await ordersService.updateWarehouseOrder(orderSelected?.id, ORDERSTATUS.completado);
      await ordersService.updateOrderStatus(orderSelected?.orderId, ORDERSTATUS.completado);

      updateStateData(orderSelected?.id, {
        status: ORDERSTATUS.completado,
      });
      showAlertSucces("Salida marcada como completada");
    } catch (error) {
      console.log(error);

      console.log(JSON.stringify(error));
      showAlertError("Error al marcar salida como completo");
    }
  };

  const updateStateProducts = (id, state) => {
    let newProducts = productsData.results.map(product => {
      if (product.id === id) {
        return { ...product, state };
      }
      return product;
    });

    console.log(newProducts);

    setProducts({ ...productsData, results: newProducts });
  };

  return {
    orderSelectedData,
    isFetchingOrder,
    productsData,
    articleSelected,
    inventoryExitId,
    updateStateProducts,
    handleOnClickArticle,
    handleOnClickNewExit,
  };
}
