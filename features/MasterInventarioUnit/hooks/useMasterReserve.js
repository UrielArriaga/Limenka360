import React from "react";
import { useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import DirLogInventaryUnitService from "../services";

function useMasterReserve(refetchData, setFlag, flag, refreshDatas) {
  const DirLogInventaryUnitChange = new DirLogInventaryUnitService();
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { open: openReserve, toggleModal: handleToggleReserve } = useModal();
  const [isLoadingReserve, setIsLoadingReserve] = useState(false);
  const handleOnClickNewReserve = articleID => handleToggleReserve();

  const refetch = () => {
    refetchData();
    setFlag(!flag);
    refreshDatas();
  };

  const handleReserve = async article => {
    let bodyChangeReserve = {
        cancel:false
    };
    try {
      setIsLoadingReserve(true);
      const response = await DirLogInventaryUnitChange.changeReserve(article.id, bodyChangeReserve);
      if (response.status === 200) {
        showAlertSucces("Articulo Apartado");
        refetch();
        handleToggleReserve();
        setIsLoadingReserve(false);
      }
    } catch (error) {
      console.log("Error reserva: ",error);
      setIsLoadingReserve(false);
      showAlertError("Error al marcar como apartado, sin Stock");
    }
  };

  return {
    handleOnClickNewReserve,
    openReserve,
    handleToggleReserve,
    handleReserve,
    isLoadingReserve
  };
}

export default useMasterReserve;
