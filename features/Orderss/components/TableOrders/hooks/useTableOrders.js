import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { handleGlobalAlert } from "../../../../../utils";
import { useDispatch } from "react-redux";
import useModal from "../../../../../hooks/useModal";
import { OrdersAdminServices } from "../../../services";
import { api, api2, apiRange, sendDatesRange } from "../../../../../services/api";
import { saveAs } from "file-saver";

export default function useTableOrders(ordersData) {
  const router = useRouter();
  const ordersService = new OrdersAdminServices();

  const dispatch = useDispatch();
  const { open: openApprovedModal, toggleModal: toggleApprovedModal, closeModal: closeModalApproved } = useModal();
  const { open: openRejectedModal, toggleModal: toggleRejectedModal, closeModal: closeModalRejected } = useModal();
  const { open, toggleModal } = useModal();
  const [showed, setShowed] = useState([]);

  const [ordersApproved, setOrdersApproved] = useState({});
  const [orderData, setOrderData] = useState(null);
  const [orderSelected, setOrderSelected] = useState({});
  const [ordersReject, setOrdersReject] = useState();

  const [dataDrawerPreviewOrder, setDataDrawerPreviewOrder] = useState({});
  const [openDrawerPreviewOrder, setOpenDrawerPreviewOrder] = useState(false);
  const [loaderCompleteApproved, setLoaderCompleteApproved] = useState(false);
  const [loaderCompleteRejected, setLoaderCompleteRejected] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);

  const [flag, setFlag] = useState(false);
  const [ordersFetched, setOrdersFetched] = useState(false);
  const [refreshTrackings, setRefreshTrackings] = useState(false);
  const [productsData, setProductsData] = useState({
    products: [],
    isFetching: false,
    count: 0,
    isError: false,
    isSuccess: false,
  });

  const [trackingsData, setTrackingsData] = useState({
    isFetching: true,
    trackings: [],
    count: 0,
    isError: false,
    isSuccess: false,
  });
  const orders = ordersData?.orders || [];
  const [flagTrackings, setFlagTrackings] = useState(false);
  const [showPdf, setShowPdf] = useState(false);

  //variables para usar en la modal Rango de Fechas
  const [openModalRange, setOpenModalRange] = useState("");
  const handleOpenModalRange = () => setOpenModalRange(true);
  const handleCloseModalRange = () => setOpenModalRange(false); 

  useEffect(() => {
    if (dataDrawerPreviewOrder.oportunity) getTrackingsOrder(dataDrawerPreviewOrder.oportunity.prospectId);
  }, [refreshTrackings]);

  const handleClickName = (item, value) => {
    if (value) {
      let itemBD = item.data;
      setDataDrawerPreviewOrder(itemBD);
      getTrackingsOrder(itemBD.oportunity.prospectId);
      getProductsOrder(itemBD.oportunityId);
      setOpenDrawerPreviewOrder(true);
      setFlagTrackings(!flagTrackings);
    } else {
      router.push({
        pathname: "/administracion/pedidos/pedido",
        query: { pe: item.id, pr: item.prospectId, op: item?.data?.oportunityId },
      });
    }
  };

  const getProductsOrder = async idOportunity => {
    try {
      let response = await ordersService.getProductsOportunity(idOportunity);
      setProductsData(prev => ({
        ...prev,
        products: response.data?.results,
        count: response.data.length,
        isFetching: false,
        isSuccess: true,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrackingsOrder = async idProspect => {
    try {
      setTrackingsData({ ...trackingsData, isFetching: true });
      let response = await ordersService.getTrackings(idProspect);
      let seguimientos = response.data.results || [];
      setTrackingsData(prev => ({
        ...prev,
        trackings: seguimientos,
        count: seguimientos.length,
        isFetching: false,
        isSuccess: true,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickEditProspect = item => {
    if (item?.data?.orderstatus?.status === 2) {
      handleGlobalAlert(
        "error",
        `Este pedido no puede ser editado por Estado de pedido APROBADO`,
        "basic",
        dispatch,
        6000
      );
    } else {
      router.push({
        pathname: "pedidos/EditarPedido",
        query: {
          pe: item.id,
          op: item.data.oportunityId,
        },
      });
    }
  };

  const handleClickapproveOrder = item => {
    if (item.estado !== "Aprobado") {
      setOrdersApproved(item);
      toggleApprovedModal();
    } else {
      return handleGlobalAlert("error", "¡El pedido ya fue Aprobado!", "basic", dispatch);
    }
  };

  const handleOnCloseModal = () => {
    setOrderSelected(null);
    toggleModal();
  };

  const handleClickRejectOrder = item => {
    if (item.estado !== "Rechazado") {
      setOrdersReject(item);
      toggleRejectedModal();
    } else {
      return handleGlobalAlert("error", "¡El pedido ya fue Rechazado!", "basic", dispatch);
    }
  };

  const handleExportButtonClick = async () => {
    try {
      setLoadingExport(true);

      let finalExcel = [];
      orders.forEach((item, index) => {
        let value = {};
        value["NOMBRE EJECUTIVO"] = orders[index]?.nombre;
        value["Correo"] = orders[index]?.correo;
        value["TELEFONO"] = orders[index]["teléfono"];
        value["FOLIO"] = orders[index]["folio"];
        value["TOTAL"] = orders[index]["total"];
        value["ESTADO DE PEDIDO"] = orders[index]["estado"];
        value["CUENTA DE PAGO"] = orders[index]["cuenta de pago"];
        finalExcel.push(value);
      });

      const data = await api.post("/convert/excel",
        { data: finalExcel },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([data.data], { type: "application/xlsx" });
      saveAs(pdfBlob, "pedidos.xlsx");
    } catch (error) {
      alert("Problema al generar el documento");
      setLoadingExport(false);
    } finally {
      setLoadingExport(false);
    }
  };

  //código para generar el EXCEL de los rangos de fecha
  const sendDateRangeToApi = async (startDate, endDate) => {
    try {
      setLoadingExport(true); //Activa el loader
      const sendDatesRange = ( startDate, endDate) => {
        return api2.get('/orders/excel', {
          range: {
            start: startDate,
            end: endDate,
          }
        })
      };
      sendDatesRange();
      const response = await sendDatesRange(startDate, endDate);
      alert('Archivo Generado con éxito');
      const exportUrl = response.data?.url || '';
      if(response.data && exportUrl){
        saveAs( exportUrl, "pedidosExcel.xlsx");
      } 
    } catch (error) {
      console.log(`Error al exportar fechas`, error);
      alert('Error al generar el archivo');
    }finally{
      setLoadingExport(false); //Desactiva el loader al finalizar
    }
  };

  const handleClosePreviewOrder = () => {
    setOpenDrawerPreviewOrder(false);
  };

  const handleRefreshTrackings = () => setRefreshTrackings(!refreshTrackings);
  const handleOnChangeShowPdf = e => setShowPdf(e.target.checked);
  return {
    showPdf,
    orderData,
    productsData,
    trackingsData,
    open,
    orderSelected,
    showed,
    flag,
    ordersFetched,
    openDrawerPreviewOrder,
    dataDrawerPreviewOrder,
    loaderCompleteApproved,
    loaderCompleteRejected,
    ordersApproved,
    ordersReject,
    openApprovedModal,
    openRejectedModal,
    loadingExport,
    setOrdersFetched,
    setFlag,
    setShowed,
    setOrdersApproved,
    setLoaderCompleteApproved,
    setLoaderCompleteRejected,
    handleClickName,
    handleClickEditProspect,
    handleClickapproveOrder,
    handleOnChangeShowPdf,
    handleOnCloseModal,
    handleClickRejectOrder,
    handleClosePreviewOrder,
    handleRefreshTrackings,
    handleExportButtonClick,
    openModalRange,
    setOpenModalRange,
    handleCloseModalRange,
    sendDateRangeToApi,
    closeModalApproved,
    closeModalRejected,
    toggleApprovedModal,
    toggleRejectedModal,
  };
}
