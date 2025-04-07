import { useEffect, useState } from "react";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { api } from "../../../services/api";
useGlobalCommons;

export default function useComments(orderData) {
  const { id_user } = useSelector(userSelector);

  const [isPosting, setIsPosting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [valueCommnet, setValueCommnet] = useState("");

  const [commnents, setCommnents] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setIsFetching(true);
      let params = {
        order: "-createdAt",
        where: {
          orderId: orderData.id,
          type: 2,
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
      console.log(resComment);

      setValueCommnet("");

      setIsPosting(false);

      setCommnents(prev => [resComment.data, ...prev]);
    } catch (error) {
      setIsPosting(false);
    }
  };

  return {
    isPosting,
    commnents,
    valueCommnet,
    handleOnChangeComment,
    handleOnSaveComment,
  };
}
