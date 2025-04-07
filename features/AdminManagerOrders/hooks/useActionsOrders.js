import { useContext, useEffect, useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import { ACTIONIDPRODUCTIONMODE, api, PHASEIDPRODUCTIONMODE } from "../../../services/api";
import dayjs from "dayjs";
import { statuspoo, typeSockets } from "../../../constants";
import useModal from "../../../hooks/useModal";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { SocketContext } from "../../../context/socketContext";
import useNotifications from "../../../hooks/useNotifications";

export const useActionsOrders = (orderSelected, updatePropertyLocal, updateItemPropertyLocal) => {
  const { showAlertError, showAlertSucces } = useAlertToast();
  const { pushNotification } = useNotifications();
  const { addTracking } = useGlobalCommons();
  const [anchorEl, setAnchorEl] = useState(null);
  const [options, setOptions] = useState([]);
  const [orderFa, setOrderFa] = useState();
  const { socket, online } = useContext(SocketContext);

  const { open: openModalApproved, toggleModal: toggleModalApproved } = useModal();
  const { open: openModalReject, toggleModal: toggleModalReject } = useModal();
  const { open: openModalCanceled, toggleModal: toggleModalCanceled } = useModal();
  const [reasonSelected, setReasonSelected] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const { id_user } = useSelector(userSelector);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setOrderFa(orderSelected);
  }, [orderSelected]);

  useEffect(() => {
    const getData = async () => {
      try {
        let resp = await api.get("orderstatus", {
          params: {
            where: JSON.stringify({
              // status: 1,
              // type: "Compras",
            }),
          },
        });

        setOptions(prev => [
          ...resp?.data?.results?.map(e => ({
            label: e.name,
            value: e.id,
            action: () => handleOnClickOption(e, orderFa),
          })),
        ]);
      } catch (error) {}
    };
    if (orderSelected) {
      getData();
    }
  }, [orderSelected]);

  const handleOnClickOption = async (e, orderData) => {
    console.log("e", e);
    try {
      if (e.name === "Aprobado") {
        toggleModalApproved();
      }
      if (e.name === "Rechazado") {
        toggleModalReject();
      }
      if (e.name === "Cancelado") {
        toggleModalCanceled();
      }
      if (e.name === "Edicion de datos") {
        let confirm = window.confirm(
          "¿Estás seguro de cambiar el estado a Edicion de datos? Una vez hecho, el ejecutivo podra actualizar los datos del pedido."
        );
        if (!confirm) return;

        let finalIdToUpdate = "";

        if (orderData) {
          finalIdToUpdate = orderData?.id;
        }
        if (orderSelected) {
          finalIdToUpdate = orderSelected?.id;
        }
        if (router.query.idOrder != "") {
          finalIdToUpdate = router.query.idOrder;
        }

        await api.put(`orders/${finalIdToUpdate}`, {
          orderstatusId: e.id,
          rejected: false,
          rejectedAt: null,
          rejectedreason: "",
        });

        let dataTracking = {
          prospectId: orderSelected?.oportunity?.prospectId,
          status: "5",
          actionId: ACTIONIDPRODUCTIONMODE,
          oportunityId: orderSelected?.oportunityId,
          orderId: orderSelected?.id,
          observations: `El Pedido ${orderSelected?.folio} fue cambio a edicion de datos.`,
          createdbyId: id_user,
          phaseId: PHASEIDPRODUCTIONMODE,
          reason: `Seguimiento Automatico`,
        };

        updatePropertyLocal("orderstatusId", e.id);

        updatePropertyLocal("orderstatus", {
          id: e.id,
          name: "Edicion de datos",
        });

        updateItemPropertyLocal(orderSelected.id, "orderstatus", "Edicion de datos");

        addTracking(dataTracking);

        showAlertSucces("Se actualizó correctamente");
      }

      // toggleModalApproved();
      // if (e.name === statuspoo?.listopararecolecion?.label) {
      //   const confirm = window.confirm(
      //     "¿Estás seguro de cambiar el estado a listo para recolección? Una vez hecho, no podrás modificarlo y será notificado logística."
      //   );
      //   if (!confirm) return;
      // }

      // const respUpdate = await api.put(`purchaseorders/${orderData.id}`, {
      //   statuspooId: e.id,
      //   deliveryDate: dayjs().format(),
      //   delivered: true,
      // });

      // getDataOrder();
      // refetchData();
      // showAlertSucces("Se actualizó correctamente");
    } catch (error) {
      console.log(error);
      showAlertError("Ocurrió un error");
    }
  };

  const handleOnChangeReason = option => {
    setReasonSelected(option);
  };

  const handleOnClickApprove = async () => {
    try {
      let data = {
        orderstatusId: "9eQCIBnRvc990VlJfgswanCh",
        approvedbyId: id_user,
      };

      let dataTracking = {
        prospectId: orderSelected?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: orderSelected?.oportunityId,
        orderId: orderSelected?.id,
        observations: `El Pedido ${orderSelected?.folio} fue Aprobado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
        reason: `Seguimiento Automatico`,
      };

      await api.put(`orders/${orderSelected?.id}`, data);

      updatePropertyLocal("orderstatusId", "9eQCIBnRvc990VlJfgswanCh");
      updatePropertyLocal("orderstatus", {
        id: "9eQCIBnRvc990VlJfgswanCh",
        name: "Aprobado",
      });

      updateItemPropertyLocal(orderSelected.id, "orderstatus", "Aprobado");

      addTracking(dataTracking);

      // socket?.emit("newnotification", {
      //   orderId: orderSelected?.id,
      //   notificationtype: "pedidonuevo",
      //   message: "Pedido Nuevo aprobado por administraciòn",
      // });

      toggleModalApproved();

      showAlertSucces("Se actualizó correctamente");
      pushNotification(typeSockets.new_order_approved.value, {
        orderId: orderData.id,
        folio: orderData.folio,
      });
    } catch (error) {
      showAlertError("Ocurrió un error");
    }
  };
  const handleOnClickReject = async () => {
    try {
      let data = {
        rejectedreason: "",
        orderrejectId: reasonSelected.id,
        rejectbyId: id_user,
      };

      let dataTracking = {
        prospectId: orderSelected?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: orderFa?.oportunityId,
        orderId: orderSelected?.id,
        observations: `El Pedido ${orderSelected?.folio} fue Rechazado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
        reason: `Seguimiento Automatico`,
      };
      await api.put(`orders/reject/${orderSelected.id}`, data);

      addTracking(dataTracking);

      updatePropertyLocal("orderstatusId", reasonSelected.id);
      // updatePropertyLocal("orderstatus", {});
      updateItemPropertyLocal(orderSelected.id, "orderstatus", "Rechazado");

      toggleModalReject();
      showAlertSucces("Se actualizó correctamente");
    } catch (error) {
      showAlertError("Ocurrió un error");
    }
  };
  const handleOnClickCanceled = async () => {
    try {
      let data = {
        rejectedreason: "",
        orderstatusId: "ZSNWIj2RxW6FDR9v4WiwW3SS",
        rejectbyId: id_user,
        orderrejectId: reasonSelected.id,
      };

      let dataTracking = {
        prospectId: orderSelected?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: orderSelected?.oportunityId,
        orderId: orderSelected?.id,
        observations: `El Pedido ${orderSelected?.folio} fue Cancelado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
        reason: `Seguimiento Automatico`,
      };
      await api.put(`orders/${orderSelected.id}`, data);

      addTracking(dataTracking);

      updatePropertyLocal("orderstatusId", reasonSelected.id);
      updateItemPropertyLocal(orderSelected.id, "orderstatus", "Cancelado");
      toggleModalCanceled();
      showAlertSucces("Se cancelo correctamente");
    } catch (error) {
      showAlertError("Ocurrió un error");
    }
  };
  return {
    options,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    openModalApproved,
    toggleModalApproved,
    toggleModalCanceled,
    openModalReject,
    openModalCanceled,
    toggleModalReject,
    reasonSelected,
    handleOnChangeReason,
    handleOnClickReject,
    handleOnClickApprove,
    handleOnClickCanceled,
    isSaving,
  };
};
