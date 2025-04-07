import React from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import DirLogInventaryUnitService from "../services";

function useMasterReset(productInventorySelected, refetchData, setFlag, flag, refreshDatas) {
  const { showAlertError, showAlertWarning, showAlertSucces } = useAlertToast();
  const requestApi = new DirLogInventaryUnitService();

  const refetch = () => {
    refetchData();
    setFlag(!flag);
    refreshDatas();
  };

  const handleOnClickReset = async data => {
    if (data.isapart == true) {
      try {
        let bodyreserve = {
            cancel:true
        }
        let response = await requestApi.changeReserve(data.id, bodyreserve);
        if(response.status == 200 || response.status == 201){
            showAlertSucces("Producto Restablecido");
            refetch();
        }
      } catch (error) {
        console.log("Error reset", error);
        showAlertError("Error al resetear producto");
      }
    } else if (data.statusrepair == true) {
      try {
        let bodyrepairs = {
            cancel:true
        }
        let response = await requestApi.changeRepairs(data.id, bodyrepairs);
        if(response.status == 200 || response.status == 201){
            showAlertSucces("Producto Restablecido");
            refetch();
        }
      } catch (error) {
        console.log("Error reset2", error);
        showAlertError("Error al resetear producto");
      }
    } else {
        showAlertWarning("No puedes restablecer un producto que no este en stock, en reparacion o apartado");
    }
  };

  return {
    handleOnClickReset,
  };
}

export default useMasterReset;
