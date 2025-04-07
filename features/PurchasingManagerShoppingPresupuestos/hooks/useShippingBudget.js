import React, { useEffect, useState } from "react";
import { BudgetsServices } from "../services";

export default function useShippingBudget(budgetsSelected) {
  const BubgetsService = new BudgetsServices();
  const [dataBudget, setDataButget] = useState({
    data: [],
    fetching: false,
    count: 0,
  });

  useEffect(() => {
    if (budgetsSelected) {
      getData();
    }
  }, [budgetsSelected]);

  const getData = async () => {
    try {
      setDataButget({ ...dataBudget, fetching: true });

      const response = await BubgetsService.getBudgetId(budgetsSelected?.id);
      let results = response?.data;
      setDataButget({ ...dataBudget, fetching: false, data: results });
    } catch (error) {
      console.log(error);
    }
  };

  return { dataBudget };
}
