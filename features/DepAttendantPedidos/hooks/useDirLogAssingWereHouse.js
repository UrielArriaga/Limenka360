import React, { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import { api } from "../../../services/api";

export default function useDirLogAssingWereHouse(orderSelected, productsData) {
  const { open: openWereHouses, toggleModal: handleToggleWereHouses } = useModal();
  const [warehouses, setWarehouses] = useState([]);
  const [wharehousSelected, setWharehousSelected] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let params = {
        count: 1,
      };
      let resp = await api.get("warehouses", { params });
      setWarehouses(resp.data.results);
      // console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssing = () => {
    const assignments = productsData.results.map(product => ({
      orderId: orderSelected?.id,
      productId: product.productId,
      total: product.quantity,
    }));

    // console.log(" nueva asignacion", assignments);
  };
  return {
    openWereHouses,
    handleToggleWereHouses,
    warehouses,
    setWharehousSelected,
    handleAssing,
    wharehousSelected,
  };
}
