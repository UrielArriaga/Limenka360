import { useEffect, useState } from "react";
import { userSelector } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import useAlertToast from "../hooks/useAlertToast";
import { api, ACTIONIDPRODUCTIONMODE, PHASEIDPRODUCTIONMODE } from "../services/api";

export default function useComments(orderData, inventoryType) {
  const { id_user } = useSelector(userSelector);
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
        include: "createdby",
        where: {},
      };

      if (inventoryType == "entradas") params.where.inventoryentryId = orderData?.id;
      if (inventoryType == "salidas") params.where.inventoryexitId = orderData?.id;

      let resComments = await api.get("/trackingslogistic", { params });
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
        status: 1,
      };
      if (inventoryType == "entradas") bodyData["inventoryentryId"] = orderData?.id;
      if (inventoryType == "salidas") bodyData["inventoryexitId"] = orderData?.id;

      let resComment = await api.post("/trackingslogistic", bodyData);
      setValueCommnet("");
      showAlertSucces("Comentario publicado correctamente");
      setIsPosting(false);
      setCommnents(prev => [resComment.data, ...prev]);
      fetchComments();
    } catch (error) {
      setIsPosting(false);
    }
  };

  const handleOnSaveCommentAndTracking = async () => {
    try {
      setIsPosting(true);
      let bodyData = {
        createById: id_user,
        reason: "Seguimiento automatico",
        observations: valueCommnet.trim(),
        actionId: ACTIONIDPRODUCTIONMODE,
        phaseId: PHASEIDPRODUCTIONMODE,
        oportunityId: orderData?.oportunityId,
        status: 1,
        type: 1,
      };
      if (inventoryType == "entradas") bodyData["inventoryentryId"] = orderData?.id;
      if (inventoryType == "salidas") bodyData["inventoryexitId"] = orderData?.id;

      let resComment = await api.post("/trackingslogistic", bodyData);
      setValueCommnet("");
      setIsPosting(false);
      showAlertSucces("Comentario guardado correctamente");
      setCommnents(prev => [resComment.data, ...prev]);
      fetchComments();
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
