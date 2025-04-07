import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import useModal from "../../../hooks/useModal";

export default function usePendingWork(orderSelected) {
  const { open: openPendings, toggleModal: togglePendingWorkModal } = useModal();
  const [pendingData, setPendingData] = useState({
    results: [],
    count: 0,
    loading: false,
    isError: false,
    errorMessage: "",
  });
  const [pages, setPages] = useState(1);
  const [flag, setFlag] = useState(false);
  const [Fetching, setFetching] = useState(false);
  const lmt = 20;
  const [orderByPending, setOrderByPending] = useState({
    id: 1,
    name: "Órdenes Pendientes Recientes",
    value: "-createdAt",
  });
  const [pendingTypes, setPendingTypes] = useState ([]);

  const getPeddingsType = async () => {
    try {
      const response = await api.get("pendingstypes");
      setPendingTypes(response.data || []);
    } catch (error) {
      console.error("Error al obtener los tipos de pendientes:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);

      try {
        const params = {
          where: JSON.stringify({
            orderId: orderSelected?.id,
          }),
          lmt: lmt,
          include: "details",
          skip: pages,
          order: orderByPending.value,
          count: 1,
        };
        const response = await api.get("purchaseorders", { params });

        const newPendings = response.data?.results;

        setPendingData({
          results: newPendings || [],
          count: response?.data?.count,
          loading: false,
          isError: false,
          errorMessage: "",
        });
        setFetching(false);
      } catch (error) {
        setPendingData({
          ...pendingData,
          loading: false,
          isError: true,
          errorMessage: error.message,
        });
        setFetching(false);
      }
    };

    fetchData();
    getPeddingsType();
  }, [orderSelected, flag, pages, orderByPending]);

  const reloadPendings = () => {
    setFlag(!flag);
  };

  return {
    openPendings,
    togglePendingWorkModal,
    pendingData,
    reloadPendings,
    Fetching,
    pages,
    setPages,
    lmt,
    orderByPending,
    setOrderByPending,
    pendingTypes,
  };
}
