import React, { useEffect, useState } from "react";
import { ProvidersServices } from "../services";

export default function useDirLogProvider(providerSelected) {
  const ordersService = new ProvidersServices();
  const [selectedData, setSelectedData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let getDataOrder = async () => {
      try {
        setIsFetching(true);
        const response = await ordersService.getProvider(providerSelected.id);
        setSelectedData(response.data);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setIsFetching(false);
      }
    };

    if (providerSelected) {
      getDataOrder();
    }
  }, [providerSelected]);

  return {
    selectedData,
    isFetching,
  };
}
