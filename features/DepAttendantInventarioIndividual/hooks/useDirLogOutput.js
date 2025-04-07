import React, { useEffect } from "react";
import { useState } from "react";
import usePagination from "../../../hooks/usePagination";
import DirLogInventaryUnitService from "../services";

export default function useDirLogOutput(productInventorySelected, tabSeletect) {
  const [isFetchingExit, setIsFetchingExit] = useState(false);
  const [dataExit, setDataExit] = useState(null);
  const { page, limit, handlePage, setPage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const [totalExit, setTotalExit] = useState(0);
  const DirLogInventaryUnitEntrance = new DirLogInventaryUnitService();

  useEffect(() => {
    const getProductsInventoryExit = async () => {
      try {
        let query = {};
        query.productId = productInventorySelected?.productId;
        setIsFetchingExit(true);
        const resData = (await DirLogInventaryUnitEntrance.getProductsInventoryExit(query)).data;
        setDataExit(resData.results);
        setTotalExit(resData.count);
        setIsFetchingExit(false);
      } catch (error) {
        console.log(error);
        setIsFetchingExit(false);
      }
    };

    if (productInventorySelected && tabSeletect === "outputs") {
      getProductsInventoryExit();
    }
  }, [productInventorySelected, tabSeletect]);

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
    dataExit,
    paginationDataExit: {
      handlePage,
      page,
      limit,
    },
    totalExit,
  };
}
