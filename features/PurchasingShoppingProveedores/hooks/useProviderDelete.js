import { useEffect } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import { ProvidersServices } from "../services";
import { api } from "../../../services/api";

export default function useProviderDelete( handleToggleDelete, refetchData, providerSelectedDelete, providerSelected ) {  
  // const ordersService = new ProvidersServices();
  const { showAlertError, showAlertSucces } = useAlertToast();
  useEffect(() => {
    console.log('id ENCONTRADO', providerSelected?.id);
  }, [providerSelected ])
  const deleteProvider = async () => {
    try {
      // const response = await ordersService.getProviderDelete(providerSelected.item.id);
      const response = await api.delete(`providers/${ providerSelected?.item.id}`)
      console.log('res:', response);
      if (response.status === 200) {
        showAlertSucces("Proveedor eliminado correctamente");
        !refetchData();
      }

    } catch (error) {
      console.log(error);
      showAlertError("Error al eliminar proveedor");
    }
  };
  return { deleteProvider };
};



