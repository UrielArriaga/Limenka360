import React from "react";
import { StyledOrders } from "./styles";
import { Add, Cached, Close, Search } from "@material-ui/icons";
import { Badge, Button, Fade, Grid, IconButton } from "@material-ui/core";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import useShippingOrders from "./hooks/useShippingOrders";
import ListPurchaseOrders from "./components/ListPurchaseOrders";
import PreviewPurchase from "./components/PreviewPurchase";
import useShippingOrder from "./hooks/useShippingOrder";
import Filters from "../DirLogPedidos/components/Filters";
import useFilters from "../DirLogPedidos/hooks/useFilters";
import { filtersOrders } from "./data";
import ActiveFilters from "../DirLogPedidos/components/ActiveFilters";
import { useRouter } from "next/router";
import useShoppingFiles from "./hooks/useShoppingFiles";
import useShoppingTrackings from "./hooks/useShoppingTrackings";
import TrackingsOrder from "./components/TrackingsOrder";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";

export default function AdminLogShoppingOrdenes({ isAdmin = false }) {
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filtersOrders);
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
    refetchData,
    dataProducts,
  } = useShippingOrders(activeFilters, isAdmin);

  const { isFetchingOrder, orderSelectedData } = useShippingOrder(orderSelected);
  const { actionsFiles, statesFiles, paginationFiles, openFiles, handleToggleFiles } =
    useShoppingFiles(orderSelectedData);
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
  } = useShoppingTrackings(orderSelected);
  const router = useRouter();
  return (
    <StyledOrders>
      <div className="header">
        <div className="headers">
          <div className="header__title">
            <h4>
              Ordenes de Compra <span>({totalOrders})</span>
            </h4>
          </div>

          <div className="header__filters">
            <div className="inputContainer">
              <Search className="inputContainer__icon" />
              <input
                value={keyword}
                onChange={e => handleOnChangeKeyWord(e)}
                className="inputContainer__input"
                placeholder="Buscar por nombre"
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
            <IconButton className="icon" onClick={() => refetchData()}>
              <Cached />
            </IconButton>
          </div>
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
            {isOpenPreview && (
              <ListPurchaseOrders
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
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  mainColumn={"Folio"}
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
              </div>
            )}
          </Grid>

          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9} className="preview">
                <PreviewPurchase
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  isFetchingData={isFetchingOrder}
                  orderSelected={orderSelectedData}
                  dataProducts={dataProducts}
                  toggleTrackingsModal={toggleTrackingsModal}
                  handleToggleFiles={handleToggleFiles}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
      
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

      {/* TO DO */}
      {/* Aun no se puen subir los archivos de purcharseOrders */}
      <FilesUpload
        idOrder={orderSelectedData?.id}
        open={openFiles}
        handletoogle={handleToggleFiles}
        orderData={orderSelectedData}
        statesFiles={statesFiles}
        actionsFiles={actionsFiles}
        paginationFiles={paginationFiles}
      />
    </StyledOrders>
  );
}
