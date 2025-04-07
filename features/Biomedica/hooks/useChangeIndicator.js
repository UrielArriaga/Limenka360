import { useState } from "react";
import { BiomedicServices } from "../services";
import useAlertToast from "../../../hooks/useAlertToast";

export default function useChangeIndicator({ setIsFetchingData, refreshData, setProductSelect }) {
  const [isLoading, setIsLoading] = useState(false);
  const { showAlertSucces, showAlertError } = useAlertToast();
  const biomedicServices = new BiomedicServices();


  const handleChangeIndicator = async ({ id, newIndicator }) => {
    try {
      setIsLoading(true);
      const res = await biomedicServices.changeIndicator(id, newIndicator);
      if (res.status === 200) {
        showAlertSucces("Indicador actualizado con éxito");
        setIsFetchingData(false);
        refreshData();
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      showAlertError("Error al actualizar el indicador");
    }
  };

  return { handleChangeIndicator, isLoading };
}
