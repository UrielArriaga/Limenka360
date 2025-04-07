import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "../../../services/api";
import usePagination from "../../../hooks/usePagination";

export default function useDirLogOutputs(productInventorySelected, tabSeletect) {
  const [isFetchingExit, setIsFetchingExit] = useState(false);
  const [dataOutputs, setDataOutputs] = useState(null);
  const { page, limit, handlePage, setPage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const [totalOutputs, setTotalOutputs] = useState(0);

  useEffect(() => {
    const getDataExits = async () => {
      try {
        const query = { productId: productInventorySelected?.id };
        const params = {
          where: JSON.stringify(query),
          include: "inventoryexit,warehouse",
          limit: limit,
          skip: page,
          count: 1,
        };
        setIsFetchingExit(true);
        const response = await api.get(`warehouseproducts`, { params });
        setDataOutputs(response.data.results);
        setTotalOutputs(response.data.count);
        setIsFetchingExit(false);
      } catch (error) {
        console.error(error);
        setIsFetchingExit(false);
      }
    };

    if (productInventorySelected && tabSeletect === "outputs") {
      getDataExits();
    }
  }, [productInventorySelected, tabSeletect, page, limit]);

  useEffect(() => {
    if (productInventorySelected && tabSeletect === "outputs") {
      restorePage();
    }
  }, [productInventorySelected, tabSeletect]);

  const restorePage = () => {
    if (page > 1) setPage(1);
  };

  return {
    isFetchingExit,
    dataOutputs,
    paginationDataOutput: {
      handlePage,
      page,
      limit,
    },
    totalOutputs,
  };
}
