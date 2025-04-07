import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import useModal from "../../../hooks/useModal";

export default function useDirLogTrackings(orderSelected) {
  const { open: openTrackings, toggleModal: toggleTrackingsModal } = useModal();
  const [trackingData, setTrackingData] = useState({
    results: [],
    count: 0,
    loading: false,
    isError: false,
    errorMessage: "",
  });
  const [page, setPage] = useState(1);
  const [flag, setFlag] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const limit = 20;
  const [orderByTracking, setOrderByTracking] = useState({
    id: 1,
    name: "Seguimientos Recientes",
    value: "-createdAt",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      try {
        const params = {
          where: JSON.stringify({
            orderId: orderSelected?.id,
          }),
          limit: limit,
          include: "phase",
          skip: page,
          order: orderByTracking.value,
          count: 1,
        };
        const response = await api.get("trackings", { params });

        const newTrackings = response.data?.results;

        setTrackingData({
          results: newTrackings || [],
          count: response?.data?.count,
          loading: false,
        });
        setIsFetching(false);
      } catch (error) {
        setTrackingData({
          ...trackingData,
          loading: false,
          isError: true,
          errorMessage: error.message,
        });
        setIsFetching(false);
      }
    };

    if (orderSelected && openTrackings) {
      fetchData();
    }
  }, [orderSelected, flag, page, orderByTracking]);

  const reloadTrackings = () => {
    setFlag(!flag);
  };

  return {
    openTrackings,
    toggleTrackingsModal,
    trackingData,
    reloadTrackings,
    isFetching,
    page,
    setPage,
    limit,
    orderByTracking,
    setOrderByTracking,
  };
}
