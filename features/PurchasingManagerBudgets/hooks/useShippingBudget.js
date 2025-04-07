import React, { useEffect, useState } from "react";
import { BudgetsServices } from "../services";
import useModal from "../../../hooks/useModal";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import useAlertToast from "../../../hooks/useAlertToast";

export default function useShippingBudget(budgetsSelected, refetchData) {
  const BubgetsService = new BudgetsServices();
  const { id_user } = useSelector(userSelector);
  const { open: openAssing, toggleModal: toggleAssing } = useModal();
  const [dataBudgetAssing, setDataBudgetAssing] = useState({});
  const { showAlertSucces, showAlertError, showAlertWarning } = useAlertToast();
  const [dataBudget, setDataButget] = useState({
    data: [],
    fetching: false,
    count: 0,
  });
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    if (budgetsSelected) {
      getData();
    }
  }, [budgetsSelected, fetch]);

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

  const handleAssing = item => {
    setDataBudgetAssing(item);
    toggleAssing();
  };

  const UpdateBudgetAllocation = async itemData => {
    console.log("kjfdklsdfjlsdf", itemData);
    try {
      let update = {};
      update.assignedbyId = id_user;
      const response = await BubgetsService.asingBudget(itemData?.id, update);
      console.log("error", response);
      showAlertSucces("Presupuesto Asignado correctamente");
      toggleAssing();
      refetchData();
      setFetch(!fetch);
    } catch (error) {
      showAlertError("Ocurrio un error al asignar presupuesto");
      console.log(error);
    }
  };

  return { dataBudget, toggleAssing, openAssing, handleAssing, dataBudgetAssing, UpdateBudgetAllocation };
}
