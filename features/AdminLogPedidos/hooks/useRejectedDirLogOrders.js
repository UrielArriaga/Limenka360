import {useState, useEffect} from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { createNewTracking } from "../../../redux/slices/trackingSlice";
import { ACTIONIDPRODUCTIONMODE, api, PHASEIDPRODUCTIONMODE } from "../../../services/api";

function useRejectedDirLogOrders(orderSelected, refetchData, setIsOpenPreview, orderSelectedData) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { open: openRejected, toggleModal: toggleModalRejected, closeModal: closeModalReject } = useModal();
  const [rejectedOptionSelected, setRejectedOptionSelected] = useState("");
  const { showAlertSucces, showAlertError, showAlertWarning } = useAlertToast();
  const { id_user } = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRejectOrder = () => {
    if (orderSelectedData?.statuspoo?.name) {
      showAlertWarning(`El pedido ya fue Rechazado por la razon : ${orderSelectedData?.statuspoo?.name}`);
      return;
    }
    handleMenuClose();
    toggleModalRejected();
  };

  const handleRemoveRejectOrder = async () => {
    try {
      let data = {
        isverified: false,
        statuspooId: "",
      };

      let bodyNewTrackingChange = {
        prospectId: orderSelectedData?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: orderSelectedData?.oportunity?.id,
        orderId: orderSelectedData?.id,
        reason: `Seguimiento Automatico`,
        observations: `El Pedido ${orderSelectedData?.folio} fue removido de rechazado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };

      console.log("dataaa", data);
      let responseremove = await api.put(`orders/${orderSelected?.id}`, data);
      if (responseremove.status === 200) {
        showAlertSucces("El pedido se removio de pedidos rechazados exitosamente");
        closeModalReject();
        refetchData();
        setIsOpenPreview(false);
        dispatch(
          createNewTracking({
            data: bodyNewTrackingChange,
          })
        );
      }
    } catch {}
  };

  const handleReject = async () => {
    if (rejectedOptionSelected === "") {
      showAlertWarning("Selecciona una opción de rechazo");
      return;
    }
    try {
      let data = {
        isverified: false,
        statuspooId: rejectedOptionSelected?.id,
      };

      let bodyNewTrackingChange = {
        prospectId: orderSelectedData?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: orderSelectedData?.oportunity?.id,
        orderId: orderSelectedData?.id,
        reason: `Seguimiento Automatico`,
        observations: `El Pedido ${orderSelectedData?.folio} fue rechazado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };

      let responseRejected = await api.put(`orders/${orderSelected?.id}`, data);
      if (responseRejected.status === 200) {
        showAlertSucces("El pedido se rechazo exitosamente");
        closeModalReject();
        refetchData();
        setIsOpenPreview(false);
        dispatch(
          createNewTracking({
            data: bodyNewTrackingChange,
          })
        );
      }
    } catch (error) {
      showAlertError("Error al rechazar pedido");
    }
  };
  return {
    handleReject,
    setRejectedOptionSelected,
    handleMenuOpen,
    handleRejectOrder,
    anchorEl,
    openRejected,
    closeModalReject,
    handleMenuClose,
    toggleModalRejected,
    handleRemoveRejectOrder,
  };
}

export default useRejectedDirLogOrders;
