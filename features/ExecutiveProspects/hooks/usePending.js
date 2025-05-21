import React, { useEffect, useState } from "react";
import ProspectsApi from "../services";

export default function usePending(prospectSelected) {
  const prospectsApi = new ProspectsApi();

  const [pendingsData, setPendingsData] = useState({
    results: [],
    isFetching: false,
    count: 0,
    isError: false,
    messageError: "",
    isSuccess: false,
  });
  useEffect(() => {
    if (prospectSelected) {
      fetchPendings(prospectSelected.id);
    }
  }, [prospectSelected]);

  async function fetchPendings(prospectId) {
    try {
      setPendingsData((prev) => ({ ...prev, isFetching: true }));
      let params = {
        where: JSON.stringify({
          prospectId: prospectId,
        }),
      };

      let data = (await prospectsApi.getPendings(params)).data;

      console.log("🚀 Pendings obtenidos:", data.results);
      setPendingsData((prev) => ({
        ...prev,

        results: data.results || [],
        isFetching: false,
        count: data.count || 0,
      }));
    } catch (error) {
      console.log(error);
      setPendingsData((prev) => {
        return {
          ...prev,
          isFetching: false,
          isError: true,
          messageError: error.message,
        };
      });
    }
  }
  return {
    pendingsData,
    refetch: fetchPendings,
  };
}
