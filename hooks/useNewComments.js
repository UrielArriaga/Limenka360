import { useEffect, useState } from "react";
import { userSelector } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import useAlertToast from "../hooks/useAlertToast";
import { api, ACTIONIDPRODUCTIONMODE, PHASEIDPRODUCTIONMODE } from "../services/api";
import { SocketContext } from "../context/socketContext";
import { useContext } from "react";
import { typeSockets } from "../constants";
import pushNotification from "./notifications";

export default function useComments(orderData) {
  const { id_user } = useSelector(userSelector);
  const { socket } = useContext(SocketContext);
  const { showAlertError, showAlertSucces } = useAlertToast();
  const [isPosting, setIsPosting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [valueCommnet, setValueCommnet] = useState("");

  const [commnents, setCommnents] = useState([]);

  useEffect(() => {
    if (orderData?.id) {
      fetchComments();
    }
  }, [orderData]);

  const fetchComments = async () => {
    try {
      setIsFetching(true);
      let params = {
        order: "-createdAt",
        include: "ejecutive",
        where: {
          orderId: orderData.id,
          or: [{ type: 3 }, { type: 2 }],
        },
      };
      let resComments = await api.get("/trackings/coments", { params });
      setCommnents(resComments.data?.results || []);
      setIsFetching(false);
      console.log(resComments);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };
  const handleOnChangeComment = e => {
    setValueCommnet(e.target.value);
  };

  const handleOnSaveComment = async () => {
    try {
      setIsPosting(true);
      let bodyData = {
        createById: id_user,
        reason: "Comentario",
        observations: valueCommnet.trim(),
        orderId: orderData.id,
        status: 5,

        // reason: `Pago ${countPaidPayments.data.count} de ${oportunity.payments}`,
        // observations: `El pago ${countPaidPayments.data.count} de ${oportunity.payments} fue realizado`,
        // actionId: ACTIONIDPRODUCTIONMODE,
        // prospectId,
        // phaseId: oportunity.phaseId,
        // oportunityId: p.oportunityId,
        // status: 4,
      };
      let resComment = await api.post("/trackings/type", bodyData);
      setValueCommnet("");
      showAlertSucces("Comentario publicado correctamente");
      setIsPosting(false);
      setCommnents(prev => [resComment.data, ...prev]);
      // socket?.emit(`newcommentorder`, {
      //   idOrder: orderData.id,
      //   message: valueCommnet.trim(),
      // });

      // socket?.emit(`newEvent`, {
      //   type: typeSockets.new_comment_order.value,
      //   orderId: orderData.id,
      //   message: valueCommnet.trim(),
      //   metadata: {
      //     folio: orderData.folio,
      //   },
      // });

      pushNotification(typeSockets.new_comment_order.value, {
        orderId: orderData.id,
        message: valueCommnet.trim(),
        folio: orderData.folio,
      });

      fetchComments();
    } catch (error) {
      setIsPosting(false);
    }
  };

  const handleOnSaveCommentAndTracking = async () => {
    try {
      const { oportunity } = orderData;

      setIsPosting(true);
      let bodyData = {
        createById: id_user,
        reason: "Seguimiento automatico",
        observations: valueCommnet.trim(),
        orderId: orderData.id,
        actionId: ACTIONIDPRODUCTIONMODE,
        prospectId: oportunity.prospectId,
        phaseId: PHASEIDPRODUCTIONMODE,
        oportunityId: orderData.oportunityId,
        status: 4,
        type: 3,
      };
      let resComment = await api.post("/trackings/type", bodyData);
      setValueCommnet("");
      setIsPosting(false);
      showAlertSucces("Comentario guardado correctamente");
      setCommnents(prev => [resComment.data, ...prev]);
      socket?.emit(`newEvent`, {
        type: typeSockets.new_comment_order.value,
        orderId: orderData.id,
        message: valueCommnet.trim(),
        metadata: {
          folio: orderData.folio,
        },
      });
      fetchComments();

      pushNotification(typeSockets.new_comment_order.value, {
        orderId: orderData.id,
        message: valueCommnet.trim(),
        folio: orderData.folio,
      });
    } catch (error) {
      showAlertError("Error al guardar el comentario");
      console.log(error);
      setIsPosting(false);
    }
  };

  return {
    isPosting,
    isFetching,
    commnents,
    valueCommnet,
    fetchComments,
    handleOnChangeComment,
    handleOnSaveComment,
    handleOnSaveCommentAndTracking,
  };
}
