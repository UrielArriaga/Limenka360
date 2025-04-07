import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "../../../services/api";
import { ShippingsOrdersServices } from "../services";
import { handleGlobalAlert } from "../../../utils";
import { useDispatch } from "react-redux";

export default function useShippingOrder(orderSelected,dataProducts) {
  const [isFetchingOrder, setIsFetchingOrder] = useState(false);
  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dayselect, setDaySelect] = useState(null);
  const [optionselect, setOptionSelect] = useState(null);
  const ordersService = new ShippingsOrdersServices();
  const [tabSeletect, setTabSeletect] = useState("infoSeg");
  const dispatch = useDispatch();
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
  const handleEditDate = async () => {
    if (!selectedProduct || (!dayselect && !optionselect)) return;
    
    try {
      const newSupplies = {};
      if (dayselect) {
        newSupplies.deliverytimedone = dayselect; 
      }
      if(optionselect){
        newSupplies.statuspooId = optionselect;
      }
      const addSupplies = await api.put(`supplies/productsoportunities/${selectedProduct.id}`, newSupplies);
      if (addSupplies.status === 200) {
        handleGlobalAlert("success", "Actualizacion realizada!", "basic", dispatch, 6000);
      }
    } catch (error) {
      handleGlobalAlert("error", "Ocurrió un error, no se actualizó correctamente!", "basic", dispatch, 6000);
      console.log(error);
    }
  };

  const handleDateChange = (index, event) => {
    const productoSeleccionado = dataProducts?.data[index];
    setSelectedProduct(productoSeleccionado);
    setDaySelect(event);
    
  };

  const handleSelectChange = (index, selectedOption, productOrder) => {
    setSelectedProduct(productOrder);
    setOptionSelect(selectedOption.value);
  };

  const handleOnClickTab = tab =>{ 
    setTabSeletect(tab);
  }

  useEffect(() => {
    if (selectedProduct && (dayselect || optionselect)) {
      handleEditDate();
    }
  }, [selectedProduct, dayselect,optionselect]); 
  useEffect(() => {
    if (orderSelected) {
      getDataOrder();

    }
  }, [orderSelected]);

  return {
    isFetchingOrder,
    orderSelectedData,
    getDataOrder,
    handleDateChange,
    handleSelectChange,
    handleEditDate,
    handleEditDate,
    handleOnClickTab,
    tabSeletect,
  };
}