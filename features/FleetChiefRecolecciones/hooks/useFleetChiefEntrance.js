import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "../../../services/api";
import usePagination from "../../../hooks/usePagination";

export default function useFleetChiefEntrance(productInventorySelected, tabSeletect) {
  const [isFetchingEntrance, setIsFetchingEntrance] = useState(false);
  const [dataEntrance, setDataEntrance] = useState(null);
  const { page, limit, handlePage, setPage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const [totalEntrance, setTotalEntrance] = useState(0);

  useEffect(() => {
    const getDataEntrance = async () => {
      try {
        const query = { productId: productInventorySelected?.id };
        const params = {
          where: JSON.stringify(query),
          include: "inventoryentry,warehouse",
          limit: limit,
          skip: page,
          count: 1,
        };
        setIsFetchingEntrance(true);
        const response = await api.get(`wharehouseproducts`, { params });

        setDataEntrance(response.data.results);
        setTotalEntrance(response.data.count);
        setIsFetchingEntrance(false);
      } catch (error) {
        console.error(error);
        setIsFetchingEntrance(false);
      }
    };

    if (productInventorySelected && tabSeletect === "entries") {
      getDataEntrance();
      restorePage();
    }
  }, [productInventorySelected, tabSeletect, page]);

  useEffect(() => {
    if (productInventorySelected && tabSeletect === "entries") {
      restorePage();
    }
  }, [productInventorySelected, tabSeletect]);

  const restorePage = () => {
    if (page > 1) setPage(1);
  };

  return {
    isFetchingEntrance,
    dataEntrance,
    paginationDataEntrance: {
      handlePage,
      page,
      limit,
    },
    totalEntrance,
  };
}
