import { useEffect, useState } from "react";
import DirLogRutasApi from "../services";
import usePagination from "../../../hooks/usePagination";
import useModal from "../../../hooks/useModal";
import useAlertToast from "../../../hooks/useAlertToast";

export default function useDirLogEntry(routeSelected) {
  const DirLogService = new DirLogRutasApi();
  const { page, limit, handlePage, setPage, handlePagination } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const [isFetchingEntrance, setIsFetching] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [dataEntrance, setDataEntries] = useState();
  const { open, closeModal, toggleModal } = useModal();
  const { showAlertSucces, showAlertWarning } = useAlertToast();

  useEffect(() => {
    fetchEntries();
  }, [page, limit, routeSelected]);

  useEffect(() => {}, [dataEntrance]);

  const fetchEntries = async () => {
    try {
      let query = {};
      query.returnsId = routeSelected?.id;
      setIsFetching(true);
      let response = await DirLogService.getEntry(limit, page, query);
      let products = response?.data.results || [];
      let normalizeData = products?.map(item => DirLogService.normalizeDeliveryReturns(item));
      console.log("response", response);
      setDataEntries(normalizeData);
      setTotalEntries(response?.data?.count);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching entries:", error);
      setIsFetching(false);
    }
  };

  const generateEntry = async () => {
    try {
      let response = await DirLogService.inventoryentriesReturn(routeSelected?.id);
      if (response.status == 200 || response.status == 201) {
        showAlertSucces("Entrada Generada Correctamente");
        toggleModal();
        fetchEntries()
      }
    } catch (error) {
      console.log(error);
      showAlertWarning("Error al generar la entrada")
    }
  };

  // Configuración de la paginación
  const paginationDataEntrance = {
    handlePagination,
    page,
    limit,
    total: totalEntries,
  };

  return {
    dataEntrance,
    isFetchingEntrance,
    paginationDataEntrance,
    open,
    closeModal,
    toggleModal,
    generateEntry,
  };
}
