import { useEffect, useState } from "react";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import useAlertToast from "../../../hooks/useAlertToast";
import { api, ACTIONIDPRODUCTIONMODE, PHASEIDPRODUCTIONMODE } from "../../../services/api";

export default function useComments(orderData) {
  const { id_user } = useSelector(userSelector);
  const { showAlertError, showAlertSucces } = useAlertToast();
  const [isPosting, setIsPosting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [valueCommnet, setValueCommnet] = useState("");

  const [commnents, setCommnents] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [orderData.id]);

  const fetchComments = async () => {
    try {
      setIsFetching(true);
      let params = {
        order: "-createdAt",
        where: {
          purchaseorderId: orderData.id,
          or:[{type:3}, {type:2}],
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
        purchaseorderId: orderData.id,
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
      console.log(resComment);
      showAlertSucces("Comentario publicado correctamente");
      setValueCommnet("");

      setIsPosting(false);

      setCommnents(prev => [resComment.data, ...prev]);
    } catch (error) {
      setIsPosting(false);
      showAlertError("Error al publicar comentario");
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
      console.log(resComment);
      setValueCommnet("");

      setIsPosting(false);

      showAlertSucces("Comentario guardado correctamente");
      setCommnents(prev => [resComment.data, ...prev]);
    } catch (error) {
      showAlertError("Error al guardar el comentario");
      console.log(error);
      setIsPosting(false);
    }
  };
  
  return {
    isPosting,
    commnents,
    valueCommnet,
    handleOnChangeComment,
    handleOnSaveComment,
    handleOnSaveCommentAndTracking
  };
}
