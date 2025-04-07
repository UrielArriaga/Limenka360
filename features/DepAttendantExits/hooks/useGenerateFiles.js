import { useEffect, useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import { api } from "../../../services/api";

export default function useGenerateFiles(orderSelected) {
    const { showAlertError } = useAlertToast();
    const [groupNameOrder, setGroupNameOrder] = useState(null);
    const [articleToGenerateFile, setArticleSelected] = useState(null);
    const { open: openModalGenerateFile, toggleModal: toggleModalGenerateFile } = useModal();
    const handleOnClickGenerateData = article => {
      setArticleSelected(article);
      toggleModalGenerateFile();
      // TODO LOGICA PARA OBTENER EL NOMBRE DEL GRUPO
    };
  
    useEffect(() => {
      if (orderSelected?.orderId) {
        fetchGroupNameByOrder();
      }
    }, [orderSelected]);
  
    const fetchGroupNameByOrder = async () => {
      try {
        let resp = await api.get(`/orders/infogroup/${orderSelected.orderId}`);
        setGroupNameOrder(resp?.data?.name);
      } catch (e) {
        showAlertError("Error al obtener grupo de ejecutivo");
      }
    };
  
    return {
      articleToGenerateFile,
      openModalGenerateFile,
      groupNameOrder,
      toggleModalGenerateFile,
      handleOnClickGenerateData,
    };
  }
  