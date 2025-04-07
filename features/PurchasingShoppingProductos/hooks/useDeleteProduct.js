import { useEffect } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import { api } from "../../../services/api";

export default function useDeleteProduct( refetchData, idDelete ) {
  const {showAlertSucces, showAlertError} = useAlertToast();
  // console.log('idDEEEEEEELE', idDelete);  
  const deleteProduct = async idDelete => {
    try {
      const deleteApiProduct = await api.delete(`products/${idDelete}`)
      if (deleteApiProduct.status === 200) {
        showAlertSucces("Producto eliminado correctamente");
        refetchData();
      }
    } catch (error) {
      console.log(error);
      showAlertError("Error al eliminar el producto")
    }
  };
  return { deleteProduct };
};

