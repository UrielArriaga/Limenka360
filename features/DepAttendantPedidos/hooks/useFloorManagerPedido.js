import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { OrdersServices } from "../services";
import useAlertToast from "../../../hooks/useAlertToast";
import { ORDERSTATUS } from "../../../constants";
import dayjs from "dayjs";
import { templateGeneralMedicalEquipmentOutput } from "../../../templates/templatesHtml";

export default function useFloorManagerPedido(orderSelected, handleToggleFiles, updateStateData) {
  const ordersService = new OrdersServices();
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();
  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const [articleSelected, setArticleSelected] = useState(null);
  const [inventoryExitId, setInventoryExitId] = useState(null);

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
      setShippingsData(prev => ({ ...prev, results: normalizedShipping, isFetching: false }));
    } catch (error) {
      setShippingsData(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
    }
    };
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

  useEffect(() => {
    if (orderSelected) {
      getDataOrder();
    }
  }, [orderSelected]);

  useEffect(() => {
    const getProductsOrder = async () => {
      try {
        //
        setProducts(prev => ({ ...prev, isFetching: true }));
        const resProducts =
          (await ordersService.getArticlesByWareHouseOrder(orderSelected?.orderId)).data?.results || [];
        setInventoryExitId(resProducts[0]?.inventoryexitId);
        setProducts(prev => ({ ...prev, results: resProducts, isFetching: false }));
      } catch (error) {
        setProducts(prev => ({ ...prev, isFetching: false, isError: true, messageError: error.message }));
      }
    };

    if (orderSelected) {
      getProductsOrder();
      getShippingsOrder();
    }
  }, [orderSelected, orderSelectedData]);

  const handleOnClickArticle = article => {
    setArticleSelected(article);
    handleToggleFiles();
  };

  const handleOnClickNewExit = async () => {
    // let isConfirm = window.confirm("¿Estás seguro de marcar la salida como completada?");
    // if (!isConfirm) return;

    try {
      let data = {
        products: productsData.results.map(product => product?.warehouseorder?.statuswho),
        folio: `SALIDA-${dayjs().format("SSS")}`,
      };

      let url = await generatePDF(productsData);

      data.url = url;

      await ordersService.markAsCompleteExit(orderSelected?.orderId, data);

      // await ordersService.updateWarehouseOrder(orderSelected?.id, ORDERSTATUS.completado);
      // await ordersService.updateOrderStatus(orderSelected?.orderId, ORDERSTATUS.completado);

      updateStateData(orderSelected?.id, {
        status: ORDERSTATUS.completado,
      });

      refetchDataPedido();
      showAlertSucces("Salida marcada como completada");
    } catch (error) {

      if (error?.response?.data?.code === "A1CD0") {
        showAlertWarning("La salida ya ha sido marcada como completada");
        return;
      }

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

    setProducts({ ...productsData, results: newProducts });
  };

  const generatePDF = async data => {
    if (productsData.results) {
      let response = templateGeneralMedicalEquipmentOutput(data);
      try {
        let form = new FormData();
        form.append("name", "oportunidad de prueba");
        form.append("data", response);
        form.append("company", "Meison");
        form.append("group", "yT3L1A9xZr8V3hgUOSJSqOqX");
        form.append("ejecutive", "YNQHRt32OCbt0shXa0yOa51t");
        let dataresults = await api.post("convert/pdf", form);
        let { url } = dataresults.data;
        return url;
      } catch (error) {
        console.log(error, "ERROR TEMPLATE");
      }
    } else {
      console.log("No existe productos ");
    }
  };

  const refetchDataPedido = () => {
    getDataOrder();
  };

  return {
    orderSelectedData,
    isFetchingOrder,
    productsData,
    articleSelected,
    inventoryExitId,
    ShippingsData,
    updateStateProducts,
    handleOnClickArticle,
    handleOnClickNewExit,
    generatePDF,
  };
}
