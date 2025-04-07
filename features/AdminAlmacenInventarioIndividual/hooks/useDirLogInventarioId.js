import React, { useEffect } from "react";
import { useState } from "react";
import DirLogInventaryUnitService from "../services";

export default function useDirLogInventarioId(productInventorySelected, isOpenPreview) {
  const DirLogService = new DirLogInventaryUnitService();
  const [data, setData] = useState({});
  const [flagId, setFlagId] = useState(false);

  useEffect(() => {
    if (isOpenPreview) {
      fetchProductsInventory();
    }
  }, [isOpenPreview, productInventorySelected, flagId]);

  const fetchProductsInventory = async () => {
    try {
      const resData = await DirLogService.getProductsInventoryId(productInventorySelected?.id);
      let products = resData.data || [];
      setData(products);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshDatas = () => {
    setFlagId(!flagId);
  };

  return {
    data,
    refreshDatas,
  };
}
