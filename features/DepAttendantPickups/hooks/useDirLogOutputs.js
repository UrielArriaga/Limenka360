import React, { useEffect } from "react";
import { useState } from "react";
import usePagination from "../../../hooks/usePagination";
import DirLogRecolecionApi from "../services";
export default function useDirLogOutputs(dataEntrance) {
  const [isFetchingExit, setIsFetchingExit] = useState(false);
  const [dataOutputs, setDataOutputs] = useState(null);
  const { page, limit, handlePage, setPage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const [totalOutputs, setTotalOutputs] = useState(0);
  const suppliesService = new DirLogRecolecionApi();
  useEffect(() => {
if(dataEntrance){
  getDataSupplies();
}
  },[dataEntrance]);

  let getDataSupplies = async () => {
    setIsFetchingExit(true);
    try {
      let query = {
        purchaseorderId : dataEntrance?.[0]?.purchaseorder?.id
      };
      const response = (await suppliesService.getsupplies(query)).data;
      let results =  response.results;
      const normalizeData = results.map(suppliesService.normalizeSupplies);
      setDataOutputs(normalizeData);
      setIsFetchingExit(false);
    } catch (error) {
      console.error(error);
      setIsFetchingExit(false);
    }
  }

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
