import { Fade, Grid, IconButton } from "@material-ui/core";
import { Close, Search, UpdateSharp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ActiveFilters from "./components/ActiveFilters";
import Filters from "./components/Filters";
import ListOrders from "./components/ListOrders";
import PreviewOrder from "./components/PreviewOrder";
import useDirLogTrackings from "./hooks/useDirLogTrackings";
import useFilters from "./hooks/useFilters";
import useFloorManagerFiles from "./hooks/useFloorManagerFiles";
import useFloorManagerPedido from "./hooks/useFloorManagerPedido";
import useFloorManagerPedidos from "./hooks/useFloorManagerPedidos";
import { DirLogDashboardStyled } from "./styles";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";
import ModalFileGenerate from "./components/ModalFileGenerate";
import useModal from "../../hooks/useModal";
import { api } from "../../services/api";
import useAlertToast from "../../hooks/useAlertToast";
import TrackingsOrder from "../DepAttendantOrders/components/TrackingsOrder";
import { filtersOrders } from "./data";
import useComments from "./hooks/useComments";

function useGenerateFiles(orderSelected) {
  const { showAlertError } = useAlertToast();
  const [groupNameOrder, setGroupNameOrder] = useState(null);
  const [articleToGenerateFile, setArticleSelected] = useState(null);
  const { open: openModalGenerateFile, toggleModal: toggleModalGenerateFile } = useModal();

  const handleOnClickGenerateData = article => {
    setArticleSelected(article);
    toggleModalGenerateFile();
    // TODO LOGICA PARA OBTENER EL NOMBRE DEL GRUPO
  };

  useEffect(() => {
    if (orderSelected?.orderId) {
      fetchGroupNameByOrder();
    }
  }, [orderSelected]);

  const fetchGroupNameByOrder = async () => {
    try {
      let resp = await api.get(`/orders/infogroup/${orderSelected.orderId}`);
      setGroupNameOrder(resp?.data?.name);
    } catch (e) {
      showAlertError("Error al obtener grupo de ejecutivo");
    }
  };

  return {
    articleToGenerateFile,
    openModalGenerateFile,
    groupNameOrder,
    toggleModalGenerateFile,
    handleOnClickGenerateData,
  };
}

export default function DepAttendantPedidos() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filtersOrders);

  // * MAIN HOOK  LOGICA DE PEDIDOS
  const {
    isOpenPreview,
    orderSelected,
    keyword,
    isFetchingData,
    orderBy,
    tableData,
    paginationData,
    totalOrders,
    setOrderBy,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    deleteKeyWord,
    handleClickProduct,
    refetchData,
    updateStateData,
  } = useFloorManagerPedidos(activeFilters, inventoryExitId);

  // * LOGICA PEDIDO SELECCIONADO
  const {
    refetchDataPedido,
    orderSelectedData,
    productsData,
    handleOnClickNewExit,
    inventoryExitId,
    ShippingsData,
    updateStateProducts,
    generatePDF,
  } = useFloorManagerPedido(orderSelected, null, updateStateData);

  // * LOGICA DE ARCHIVOS
  const {
    openFiles,
    handleToggleFiles,
    paginationFiles,
    statesFiles,
    actionsFiles,
    handleOnClickArticle,
    articleSelected,
  } = useFloorManagerFiles(orderSelected);

  // * LOGICA DE SEGUIMIENTOS
  const {
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
  } = useDirLogTrackings(orderSelected);

  // * LOGICA DE GENERAR ARCHIVOS
  const {
    groupNameOrder,
    articleToGenerateFile,
    openModalGenerateFile,
    toggleModalGenerateFile,
    handleOnClickGenerateData,
  } = useGenerateFiles(orderSelected);

  // newDate es un nuevo arreglo con la infromacion del la orden seleccioanda y el articulo seleccionado para agrgarlo a la preview y al template....

  const newDate = { ...articleToGenerateFile, ...orderSelectedData };

  const {
    commnents,
    isPosting,
    valueCommnet,
    handleOnChangeComment,
    handleOnSaveComment,
    handleOnSaveCommentAndTracking,
  } = useComments(orderSelectedData);

  return (
    <DirLogDashboardStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Pedidos <span>({totalOrders})</span>
          </h4>
        </div>

        {/* <div style={{ height: 50 }}>
          <pre>{JSON.stringify(orderSelected, null, 2)}</pre>
        </div> */}

        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />

            <input
              value={keyword}
              onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por folio"
            />

            {keyword.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>

          <Filters
            filters={filters}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
          />

          <IconButton onClick={() => refetchData()}>
            <UpdateSharp />
          </IconButton>
        </div>
      </div>

      <ActiveFilters
        activeFilters={activeFilters}
        handleOnChangeFilter={handleOnChangeFilter}
        setActiveFilters={setActiveFilters}
      />

      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {/* <p>dwqedcwedc</p> */}
            {isOpenPreview && (
              <ListOrders
                orderSelected={orderSelected}
                data={tableData.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={totalOrders >= 20 ? 20 : totalOrders}
                isLoading={isFetchingData}
                paginationData={{
                  ...paginationData,
                  total: totalOrders,
                }}
              />
            )}

            {!isOpenPreview && (
              <TableLimenkaGeneral
                onRowClick={item => handleOnClickRow(item)}
                mainColumn={"Fecha"}
                heads={tableData.heads}
                isLoading={isFetchingData}
                actions={tableData.actions}
                data={tableData.data}
                customColumns={tableData.customColumns}
                typeTable="border"
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                rowsLoader={totalOrders >= 20 ? 20 : totalOrders || 20}
                paginationData={{
                  ...paginationData,
                  total: totalOrders,
                }}
              />
            )}
          </Grid>

          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9}>
                <PreviewOrder
                  products={[]}
                  ShippingsData={ShippingsData}
                  isFetchingOrder={false}
                  wareHouseSelected={orderSelected}
                  orderSelectedData={orderSelectedData}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  toggleTrackingsModal={toggleTrackingsModal}
                  productsData={productsData}
                  handleClickProduct={handleClickProduct}
                  handleOnClickNewExit={handleOnClickNewExit}
                  handleOnClickArticle={handleOnClickArticle}
                  handleOnClickGenerateData={handleOnClickGenerateData}
                  handleToggleFiles={handleToggleFiles}
                  generatePDF={generatePDF}
                  dataComments={{
                    commnents,
                    isPosting,
                    valueCommnet,
                    handleOnChangeComment,
                    handleOnSaveComment,
                    handleOnSaveCommentAndTracking,
                  }}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>

      <ModalFileGenerate
        orderSelectedData={orderSelected}
        articleToGenerateFile={articleToGenerateFile}
        open={openModalGenerateFile}
        onClose={toggleModalGenerateFile}
        groupNameOrder={groupNameOrder}
        updateStateProducts={updateStateProducts}
        updateStateData={updateStateData}
        newDate={newDate}
      />

      <FilesUpload
        open={openFiles}
        handletoogle={handleToggleFiles}
        orderData={orderSelectedData}
        statesFiles={statesFiles}
        actionsFiles={actionsFiles}
        paginationFiles={paginationFiles}
      />
      <TrackingsOrder
        open={openTrackings}
        toggleTrackingsModal={toggleTrackingsModal}
        trackingData={trackingData}
        reloadTrackings={reloadTrackings}
        isFetching={isFetching}
        orderSelectedData={orderSelectedData}
        page={page}
        setPage={setPage}
        limit={limit}
        orderBy={orderByTracking}
        setOrderBy={setOrderByTracking}
      />
      {/* <div style={{ display: "flex" }}>
        <pre>{JSON.stringify(orderSelected, null, 2)}</pre>

        <pre>{JSON.stringify(orderSelectedData, null, 2)}</pre>
      </div> */}
    </DirLogDashboardStyled>
  );
}
