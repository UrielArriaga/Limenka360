import React, { useEffect, useState } from "react";
import { InventoryEntriesService } from "../services";
import usePagination from "../../../hooks/usePagination";

export default function usePreviewEntry(idEntry) {
  const intentoryService = new InventoryEntriesService();
  const [inventoryProducts, setInventoryProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    getInventoryProducts(idEntry);
    console.log("valor de pag", page, limit, totalResults);
  }, [idEntry, page]);

  const getInventoryProducts = async id => {
    try {
      setIsLoading(true);
      const resData = await intentoryService.getWharehouseproducts(id, limit, page);
      const normalizeData = resData.data.results.map(item => ({
        id: item.id,
        code: item.product.code,
        producto: item.product.name,
      }));
      console.log("pre total", resData.data.count);
      const total = resData.data.count || 0;
      setInventoryProducts(normalizeData);
      setTotalResults(total);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return {
    totalResults,
    inventoryProducts,
    isLoading,
    paginationData: {
      handlePage,
      page,
      limit,
    },
  };
}
