import { Fade, Grid, IconButton } from "@material-ui/core";
import { Close, Search, UpdateSharp } from "@material-ui/icons";
import React from "react";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ActiveFilters from "./components/ActiveFilters";
import Filters from "./components/Filters";
import { filtersOrders } from "./data";
import ListOrders from "./components/ListOrders";
import PreviewOrder from "./components/PreviewOrder";
import useDirLogTrackings from "./hooks/useDirLogTrackings";
import useFilters from "./hooks/useFilters";
import useFloorManagerFiles from "./hooks/useFloorManagerFiles";
import useFloorManagerPedido from "./hooks/useFloorManagerPedido";
import useFloorManagerPedidos from "./hooks/useFloorManagerPedidos";
import { DirLogDashboardStyled } from "./styles";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";
import TrackingsOrder from "../DepAttendantOrders/components/TrackingsOrder";
import useComments from "./hooks/useComments";

export default function FloorManagerPedidos() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter,filters } = useFilters(filtersOrders);

  const {
    isOpenPreview,
    orderSelected,
    keyword,
    isFetchingData,
    setOrderBy,
    orderBy,
    tableData,
    paginationData,
    totalOrders,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    handleOnClickNewExit,
    deleteKeyWord,
    handleClickProduct,
    refetchData,
  } = useFloorManagerPedidos(activeFilters);

  // * LOGICA PEDIDO SELECCIONADO
  const { orderSelectedData, productsData,ShippingsData} = useFloorManagerPedido(orderSelected);

  // * LOGICA DE ARCHIVOS
  const { openFiles, handleToggleFiles, paginationFiles, statesFiles, actionsFiles, handleOnClickArticle } =
    useFloorManagerFiles(orderSelectedData);

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
                  orderSelectedData={orderSelectedData}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  toggleTrackingsModal={toggleTrackingsModal}
                  productsData={productsData}
                  handleClickProduct={handleClickProduct}
                  handleOnClickNewExit={handleOnClickNewExit}
                  handleOnClickArticle={handleOnClickArticle}
                  handleToggleFiles={handleToggleFiles}
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
    </DirLogDashboardStyled>
  );
}
