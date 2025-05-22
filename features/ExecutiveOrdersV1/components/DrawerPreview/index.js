import React, { useState } from "react";
import { ModalPreviewStyled } from "./styles";
import { Close, Edit, Delete, PostAddTwoTone } from "@material-ui/icons";
import { Grid, IconButton, Tabs, Tooltip, Tab } from "@material-ui/core";
import InfoOrder from "./InfoOrder";
import useOrder from "../../hooks/useOrder";
import UseProspect from "../../hooks/useProspect";
import InfoProspect from "./InfoProspect";
import InfoSend from "./infoSend";
import InfoBilling from "./InfoBilling";
import InfoSales from "./InfoSales";
import TableProductsSales from "./TableProductsSales";
import useSalesProducts from "../../hooks/useSalesProducts";
import useTrackings from "../../hooks/useTrackings";
import LineTime from "./LineTime";
import AddTracking from "./AddTracking";
import Files from "./FilesUploader";
import useFiles from "../../hooks/useFiles";
import TableProductsSerialNum from "./TableProductsSerialNum";
import useWarehouseProducts from "../../hooks/useWarehouseProducts";
import DataOrderPdf from "../DataOrderPdf";
import { useRouter } from "next/router";
import useAlertToast from "../../../../hooks/useAlertToast";
import ModalDeleteOrder from "../ModalDeleteOrder";
import ModalTracking from "../ModalTracking";

export default function DrawerPreview({
  open,
  toggleModal,
  orderSelected,
  setOrderSelected,
}) {
  const [showAction, setShowAction] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const { orderData, loading, error } = useOrder(orderSelected);
  const { prospectData } = UseProspect(orderSelected);
  const { showAlertWarning } = useAlertToast();
  const {
    products,
    count: countProducts,
    paginationData: paginationDataProducts,
  } = useSalesProducts(orderSelected);
  const {
    trackings,
    paginationData: paginationDataTracks,
    count: countTracks,
    createNewTracking,
    setObservations,
    refetchDataTrackings,
  } = useTrackings(orderSelected);
  const {
    files,
    setFile,
    filesCount,
    isLoader,
    isLoaderUpload,
    refetch,
    pageFiles,
    file,
    fileSelected,
    setFileSelected,
    setPageFiles,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDownloadFile,
    setRefetch,
    string_to_slug,
    returnStyleTypeFile,
    searchColorStyle,
    limitFiles,
    filesLenght,
  } = useFiles(orderSelected);
  const {
    wareproducts,
    count: countWareProducts,
    paginationData: paginationDataWareProducts,
  } = useWarehouseProducts(orderSelected);
  const router = useRouter();
  const { version = "v1" } = router.query;
  const handleClickEditOrder = (item) => {
    if (orderSelected?.status === 2) {
      showAlertWarning("No es posible editar un pedido Aprobado");
    } else {
      router.push({
        pathname: `/ejecutivo/pedidos/${version}/EditarPedido`,
        query: {
          pe: item?.id,
          op: item?.oportunityId,
        },
      });
    }
  };
  // ---> para el modal de descartar
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const handleOpenConfirmDelete = () => {
    if (orderSelected?.status === 3) {
      setOpenConfirmDelete(true);
    } else {
      showAlertWarning("Solo puedes descartar pedidos Rechazados");
    }
  };
  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };
  // <---
  // ---> modal de seguimientos
  const [openModalTracking, setOpenModalTracking] = useState(false);
  const handleOpenModalTracking = () => {
    setOpenModalTracking(true);
  };
  const handleCloseModalTracking = () => {
    setOpenModalTracking(false);
  };
  // <---
  const handleOnCancel = () => {
    setShowAction(null);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);

  const toggleEditDrawer = (open) => () => {
    setEditDrawerOpen(open);
  };

  return (
    <ModalPreviewStyled
      anchor={"right"}
      open={open}
      onClose={() => toggleModal()}
    >
      <div className="row">
        <div className="modalcontainer">
          <div className="headerPreview">
            <h1>{orderData?.folio}</h1>
            <div>
              <DataOrderPdf
                infoOrders={orderData}
                productsCotization={products}
              />
            </div>
          </div>
          <div className="headertabs">
            <Tabs
              indicatorColor="primary"
              value={tabValue}
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab label="Información general" />
              <Tab label="Datos de ventas" />
              <Tab label="Seguimientos" />
              <Tab label="Documentos" />
              <Tab label="Números de serie" />
            </Tabs>
          </div>

          {tabValue === 0 && (
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <InfoOrder
                  orderData={orderData}
                  loading={loading}
                  error={error}
                  setOrderSelected={setOrderSelected}
                />
                <InfoProspect
                  prospectData={prospectData}
                  setOrderSelected={setOrderSelected}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <InfoSend orderData={orderData} />
                <InfoBilling orderData={orderData} />
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <InfoSales
                  orderData={orderData}
                  prospectData={prospectData}
                  setOrderSelected={setOrderSelected}
                />
              </Grid>
              <Grid item md={11} xs={15}>
                <TableProductsSales
                  products={products}
                  countProducts={countProducts}
                  paginationDataProducts={{
                    ...paginationDataProducts,
                    total: countProducts,
                  }}
                />
              </Grid>
            </Grid>
          )}

          {tabValue === 2 && (
            <Grid container spacing={2}>
              <Grid item md={11} xs={15}>
                <LineTime
                  trackings={trackings}
                  paginationDataTracks={{
                    ...paginationDataTracks,
                    total: countTracks,
                  }}
                />
                <Grid item md={11} xs={15}>
                  <AddTracking
                    createNewTracking={createNewTracking}
                    setObservations={setObservations}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}

          {tabValue === 3 && (
            <Files
              files={files}
              setFile={setFile}
              filesCount={filesCount}
              isLoader={isLoader}
              isLoaderUpload={isLoaderUpload}
              refetch={refetch}
              pageFiles={pageFiles}
              file={file}
              fileSelected={fileSelected}
              setFileSelected={setFileSelected}
              setPageFiles={setPageFiles}
              handleFileSelect={handleFileSelect}
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              handleDownloadFile={handleDownloadFile}
              setRefetch={setRefetch}
              string_to_slug={string_to_slug}
              returnStyleTypeFile={returnStyleTypeFile}
              searchColorStyle={searchColorStyle}
              limitFiles={limitFiles}
              filesLenght={filesLenght}
            />
          )}

          {tabValue === 4 && (
            <TableProductsSerialNum
              wareproducts={wareproducts}
              orderData={orderData}
              countWareProducts={countWareProducts}
              paginationDataWareProducts={{
                ...paginationDataWareProducts,
                total: countWareProducts,
              }}
            />
          )}
          <div className="close" onClick={() => toggleModal()}>
            <Close />
          </div>
        </div>
        <div className="actionsbar">
          <div className="actionsbar__item">
            <Tooltip title="Editar pedido" arrow>
              <IconButton
                className="actionsbar__icon"
                onClick={() => handleClickEditOrder(orderData)}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </div>
          <div className="actionsbar__item">
            <Tooltip title="Descartar pedido" arrow>
              <IconButton
                className="actionsbar__icon"
                onClick={handleOpenConfirmDelete}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
          <div className="actionsbar__item">
            <Tooltip title="Agregar seguimiento" arrow>
              <IconButton
                className="actionsbar__icon"
                onClick={handleOpenModalTracking}
              >
                <PostAddTwoTone />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <ModalDeleteOrder
        openConfirmDelete={openConfirmDelete}
        setopenConfirmDelete={setOpenConfirmDelete}
        orderTable={[orderData]}
        orders={orderData}
      />
      <ModalTracking
        isOrder={true}
        prospect={prospectData}
        open={openModalTracking}
        close={handleCloseModalTracking}
        prospectEdit={prospectData}
        refetchDataTrackings={refetchDataTrackings}
      />
    </ModalPreviewStyled>
  );
}
