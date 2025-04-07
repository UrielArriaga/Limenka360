import useAlertToast from "../../../hooks/useAlertToast";
import { ProvidersServices } from "../services";

export default function useProviderDelete(providerSelectedDelete, handleToggleDelete, refetchData) {
  const ordersService = new ProvidersServices();
  const { showAlertError, showAlertSucces } = useAlertToast();

  const deleteProvider = async () => {
    try {
      const response = await ordersService.getProviderDelete(providerSelectedDelete.id);
      if (response.status === 200) {
        handleToggleDelete();
        showAlertSucces("Proveedor eliminado correctamente");
        refetchData();
      }
    } catch (error) {
      console.log(error);
      showAlertError("Error al eliminar proveedor");
    }
  };

  return { deleteProvider };
}
