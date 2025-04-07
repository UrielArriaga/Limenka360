import React, { useEffect } from "react";
import { useState } from "react";
import usePagination from "../../../hooks/usePagination";
import DirLogRecolecionApi from "../services";

export default function useDirLogEntrance(pickupsSelect) {
  const [isFetchingEntrance, setIsFetchingEntrance] = useState(false);
  const [dataEntrance, setDataEntrance] = useState([]);
  const { page, limit, handlePage, setPage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const [totalEntrance, setTotalEntrance] = useState(0);
  const recoleccionService = new DirLogRecolecionApi();
  useEffect(() => {
    if (pickupsSelect) {
    getDataEntrance();  
    }
  }, [pickupsSelect]);

    let getDataEntrance = async () => {
      setIsFetchingEntrance(true);
      try {
        let query = {
          pickupId : pickupsSelect?.pickupId,
      }
      const response = (await recoleccionService.getpickuporders(query)).data;
      let results = response.results;
      setDataEntrance(results);
      setIsFetchingEntrance(false);
      } catch (error) {
        console.error(error);
        setIsFetchingEntrance(false);
      }
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