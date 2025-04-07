import { useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import DirLogInventaryUnitService from "../services";

export default function useDirLogRepair(refetchData, setFlag, flag, refreshDatas) {
  const DirLogInventaryUnitChange = new DirLogInventaryUnitService();
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { open: openRepair, toggleModal: handleToggleRepair } = useModal();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const refetch = () => {
    refetchData();
    setFlag(!flag);
    refreshDatas();
  };

  const handleOnClickNewRepair = () => {
    handleToggleRepair();
  };

  const handleRepair = async article => {
    let bodyChangeRepair = {
      cancel:false
    };
    try {
      setIsLoadingUpdate(true);
      const response = await DirLogInventaryUnitChange.changeRepairs(article.id, bodyChangeRepair);
      if (response.status === 200) {
        showAlertSucces("Articulo en Reparacion");
        refetch();
        handleToggleRepair();
        setIsLoadingUpdate(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingUpdate(false);
      showAlertError("Error al marcar como reparado, sin Stock");
    }
  };
  return { handleOnClickNewRepair, refetch, openRepair, handleToggleRepair, handleRepair, isLoadingUpdate };
}
