import React, { useEffect } from "react";
import { useState } from "react";
import usePagination from "../../../hooks/usePagination";
import { api } from "../../../services/api";
import DirLogInventaryUnitService from "../services";

export default function useDirLogEntrance(productInventorySelected, tabSeletect) {
  const [isFetchingEntrance, setIsFetchingEntrance] = useState(false);
  const [dataEntrance, setDataEntrance] = useState(null);
  const { page, limit, handlePage, setPage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const [totalEntrance, setTotalEntrance] = useState(0);
  const DirLogInventaryUnitEntrance = new DirLogInventaryUnitService();

  useEffect(() => {
    const getProductsInventoryEntry = async () => {
      try {
        let query = {};
        query.id = productInventorySelected?.id;
        setIsFetchingEntrance(true);
        const resData = (await DirLogInventaryUnitEntrance.getProductsInventoryEntry(query, page)).data;
        setDataEntrance(resData.results);
        setTotalEntrance(resData.count);
        setIsFetchingEntrance(false);
      } catch (error) {
        console.log(error);
        setIsFetchingEntrance(false);
      }
    };

    if (productInventorySelected && tabSeletect === "entries") {
      getProductsInventoryEntry();
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
      total: totalEntrance,
    },
    totalEntrance,
  };
}
