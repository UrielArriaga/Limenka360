import React, { useEffect, useState } from "react";
import { LoaderTable, TableStyle } from "./style";
import TableComponent from "../../../../components/UI/organism/TableOrdersAdministration";
import useTableOrders from "./hooks/useTableOrders";
import { headsOrdersAdmin } from "./utils";
import PreviewOrder from "../PreviewOrder";
import { LinearProgress, Pagination } from "@mui/material";
import ApprovedOrder from "../ModalApprovedOrder";
import RejectedOrder from "../ModalRejectedOrder";
import { Button, capitalize } from "@material-ui/core";
import ModalDateRange from "../ModalDateRange";
import useOrderId from "../../hooks/useOrderId";

export default function TableOrders(params) {
  const { ordersData, dataPagination } = params;
  const { orders, isLoad, refetch } = ordersData;
  const { page, countPages, handlePage } = dataPagination;
  const {
    showPdf,
    productsData,
    trackingsData,
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
    setLoaderCompleteApproved,
    setLoaderCompleteRejected,
    handleClickName,
    handleClickEditProspect,
    handleClickapproveOrder,
    handleOnChangeShowPdf,
    handleClickRejectOrder,
    handleClosePreviewOrder,
    handleRefreshTrackings,
    handleExportButtonClick,
    sendDateRangeToApi,
    closeModalApproved,
    closeModalRejected,
    toggleApprovedModal,
    toggleRejectedModal,
  } = useTableOrders(ordersData);

  const [openModal, setOpenModal] = useState(false); //estado que controla la apertura de la modal
  const handleOpenModal = () => setOpenModal(true); //función para abrir la modal
  const handleCloseModal = () => setOpenModal(false); // función para cerrar la modal

  const handleSendDateRange = (startDate, endDate) => {
    sendDateRangeToApi(startDate, endDate);
  };

  const { orderSelectedData } = useOrderId(dataDrawerPreviewOrder, openDrawerPreviewOrder);

  if (isLoad)
    return (
      <LoaderTable>
        <div className="ctr_load">
          <div className="ctr_load__img">
            <img src="/load.png" />
          </div>
          <div className="ctr_load__load">
            <p>Cargando</p>
            <LinearProgress color="primary" />
          </div>
        </div>
      </LoaderTable>
    );

  return (
    <TableStyle>
      <TableComponent
        data={orders}
        id="nombre"
        heads={headsOrdersAdmin}
        secondaryColor="#dce1f6"
        primaryColor="#405189"
        handleClickName={handleClickName}
        handleClickEditProspect={handleClickEditProspect}
        approveOrder={handleClickapproveOrder}
        rejectOrder={handleClickRejectOrder}
        showed={showed}
        setShowed={setShowed}
        setFlag={setFlag}
        flag={flag}
        ordersFetched={ordersFetched}
        setOrdersFetched={setOrdersFetched}
      />
      <div className="pagination">
        <Pagination
          style={{ display: "flex", justifyContent: "center" }}
          page={page}
          defaultPage={1}
          onChange={handlePage}
          shape="rounded"
          count={countPages}
          color="primary"
        />
         {/* <Button
          color="primary"
          variant="contained"
          style={{ textTransform: `capitalize` }}
          disabled={loadingExport}
          onClick={handleExportButtonClick}
        >{loadingExport ? "Generando" : "Exportar"}
        </Button>  */}

        <Button
          color="primary"
          variant="contained"
          style={{ textTransform: "capitalize" }}
          disabled={loadingExport}
          onClick={handleOpenModal}
        >{loadingExport ? "Generando" : "Exportar excel"}
        </Button>
      </div>

      <ModalDateRange
        open={openModal}
        handleClose={handleCloseModal}
        onGenerate={handleSendDateRange} //Le estoy pasando la función para enviar fechas
        loadingExport={loadingExport}
      />

      <PreviewOrder
        open={openDrawerPreviewOrder}
        onClose={handleClosePreviewOrder}
        orderData={orderSelectedData}
        trackingsData={trackingsData}
        productsData={productsData}
        showPdf={showPdf}
        handleOnChangeShowPdf={handleOnChangeShowPdf}
        refreshTrackings={handleRefreshTrackings}
        refetch={refetch}
      />

      <ApprovedOrder
        isRoleShopping={false}
        open={openApprovedModal}
        ordersApproved={ordersApproved}
        close={closeModalApproved}
        setLoaderCompleteApproved={setLoaderCompleteApproved}
        loaderCompleteApproved={loaderCompleteApproved}
        toggleApprovedModal={toggleApprovedModal}
        refetch={refetch}
      />
      <RejectedOrder
        isRoleShopping={false}
        open={openRejectedModal}
        ordersReject={ordersReject}
        close={closeModalRejected}
        refetch={refetch}
        toggleRejectedModal={toggleRejectedModal}
        loaderCompleteRejected={loaderCompleteRejected}
        setLoaderCompleteRejected={setLoaderCompleteRejected}
      />
    </TableStyle>
  );
};

