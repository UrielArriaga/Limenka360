import React, { useState } from "react";
import ProspectsApi from "../services";

export default function usePending() {
  const prospectsApi = new ProspectsApi();

  const [pendingsData, setpendingsData] = useState({
    results: [],
    isFetching: false,
    count: 0,
    isError: false,
    messageError: "",
    isSuccess: false,
  });

  async function fetchPendings(prospectId) {
    try {
      setpendingsData((prev) => {
        return {
          ...prev,
          isFetching: true,
        };
      });
      let params = {
        where: {
          prospectId: prospectId,
        },
        order: "date_from",
      };
      let data = (await prospectsApi.getPendings(params)).data;

      console.log(results);
      setpendingsData({
        results: data.results || [],
        isFetching: false,
        count: data.count || 0,
      });
    } catch (error) {
      console.log(error);
      setpendingsData((prev) => {
        return {
          ...prev,
          isFetching: false,
          isError: true,
          messageError: error.message,
        };
      });
    }
  }
  return { pendingsData };
}
