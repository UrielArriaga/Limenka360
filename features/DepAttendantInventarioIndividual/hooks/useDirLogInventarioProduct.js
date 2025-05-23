import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "../../../services/api";

export default function useDirLogInventarioProduct(productInventorySelected) {
  const [tabSeletect, setTabSeletect] = useState("infoProduct");
  const [isFetchingProduct, setIsFetchingProduct] = useState(false);
  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    let getDataProduct = async () => {
      try {
        let query = { id: productInventorySelected?.productId };
        let params = {
          where: JSON.stringify(query),
          include: "brand,category,provider",
        };
        setIsFetchingProduct(true);
        const response = await api.get(`products`, { params });
        setOrderSelectedData(response?.data?.results[0]);
        setIsFetchingProduct(false);
      } catch (error) {
        console.log(error);
        setIsFetchingProduct(false);
      }
    };

    if (productInventorySelected) {
      getDataProduct();
    }
  }, [productInventorySelected, flag]);

  const handleOnClickTab = tab => {
    setTabSeletect(tab);
  };

  return {
    tabSeletect,
    handleOnClickTab,
    isFetchingProduct,
    orderSelectedData,

    setFlag,
    flag,
  };
}
