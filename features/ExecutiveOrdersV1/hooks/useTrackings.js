import { useState, useEffect } from "react";
import { ApiServiceExOr } from "../service";
import usePagination from "../../../hooks/usePagination";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import useAlertToast from "../../../hooks/useAlertToast";

export default function useTrackings(orderSelected) {
  const request = new ApiServiceExOr();
  const [trackings, setTrackings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const prospectId = orderSelected?.prospectId;
  const { id_user } = useSelector(userSelector);
  const [observations, setObservations] = useState("");
  const { showAlertError, showAlertSucces } = useAlertToast();
  const { page, limit, handlePage } = usePagination({
    defaultLimit: 3,
    defaultPage: 1,
  });

  const fetchTrackings = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = { prospectId };
      const response = await request.getTrackings(limit, page, query);
      setTrackings(response.data.results);
      setCount(response.data.count);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prospectId) {
      fetchTrackings();
    } else {
      setTrackings([]);
      setLoading(false);
    }
  }, [prospectId, page]);

  const refetchDataTrackings = () => {
    fetchTrackings();
  };

  const createNewTracking = async () => {
    try {
      let body = {
        actionId: "62hHzqoSCj0452fT1sUAEzba",
        createById: id_user,
        observations: observations,
        oportunityId: orderSelected?.oportunityId,
        orderId: orderSelected?.id,
        phaseId: "qJzenUoCQ3amgoRZihcsHWus",
        prospectId: orderSelected?.prospectId,
        reason: "Seguimiento automatico",
        status: 4,
        type: 3,
      };

      let response = await request.postAutoTracking(body);
      if (response.status == 201) {
        showAlertSucces("Seguimiento creado correctamente");
        fetchTrackings();
      }
    } catch (error) {
      showAlertError("Error al crear seguimiento");
      console.log("createNewTracking ERROR", error);
    }
  };

  return {
    trackings,
    loading,
    error,
    count,
    setObservations,
    createNewTracking,
    fetchTrackings,
    refetchDataTrackings,
    paginationData: {
      handlePage,
      page,
      limit,
    },
  };
}
