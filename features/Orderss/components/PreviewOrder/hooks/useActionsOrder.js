import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { userSelector } from "../../../../../redux/slices/userSlice";
import { SocketContext } from "../../../../../context/socketContext";
import { ACTIONIDPRODUCTIONMODE, api, PHASEIDPRODUCTIONMODE } from "../../../../../services/api";
import { useSelector } from "react-redux";
import { handleGlobalAlert } from "../../../../../utils";
import { createNewTracking } from "../../../../../redux/slices/trackingSlice";

export default function useActionsOrder(props) {
  const [rejectReason, setRejectReason] = useState({});
  const { order, actionsClose, refetch } = props;
  const { handleCloseActions } = actionsClose;
  const { id_user } = useSelector(userSelector);
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  const handleValidateAction = isReject => {
    if (isReject) {
      handleRejectOrder();
    } else {
      handleApproveOrder();
    }
  };

  const handleRejectOrder = async () => {
    if (!rejectReason.id) {
      handleGlobalAlert("error", "Selecciona una opción de rechazo", "basic", dispatch, 6000);
      return;
    }
    try {
      let data = {
        rejectedreason: "",
        orderrejectId: rejectReason.id,
        rejectbyId: id_user,
      };
      let bodyNewTrackingChange = {
        prospectId: order?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: order?.oportunityId,
        orderId: order?.id,
        reason: `Seguimiento Automatico`,
        observations: `El Pedido ${order?.folio} fue rechazado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      let response = await api.put(`orders/reject/${order.id}`, data);
      handleGlobalAlert("success", "El estatus del pedido cambio", "basic", dispatch, 6000);
      sendNotifyOrder(order);
      dispatch(
        createNewTracking({
          data: bodyNewTrackingChange,
        })
      );
      handleCloseActions();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const handleApproveOrder = async () => {
    try {
      let bodyNewTrackingChange = {
        prospectId: order?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: order?.oportunityId,
        orderId: order?.id,
        reason: `Seguimiento Automatico`,
        observations: `El Pedido ${order?.folio} fue Aprobado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      let data = {
        orderstatusId: "9eQCIBnRvc990VlJfgswanCh",
      };
      let response = await api.put(`orders/${order?.id}`, data);
      handleGlobalAlert("success", "El estatus del pedido cambio", "basic", dispatch, 6000);
      sendNotifyOrder(order);
      dispatch(
        createNewTracking({
          data: bodyNewTrackingChange,
        })
      );
      handleCloseActions();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectRejectReason = option => setRejectReason(option);

  const sendNotifyOrder = item => {
    socket?.emit("send_notify_individual_order", {
      to: item?.oportunity?.soldbyId,
      orderId: item?.id,
      type: "reject",
    });
  };

  return {
    rejectReason,
    handleRejectOrder,
    handleSelectRejectReason,
    handleValidateAction,
  };
}
