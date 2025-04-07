import { Badge, Fade, Grid, IconButton } from "@material-ui/core";
import { Cached, Close, Search, UpdateSharp } from "@material-ui/icons";
import React from "react";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ActiveFilters from "./components/ActiveFilters";
import FilesOrder from "./components/FilesOrder";
import Filters from "./components/Filters";
import ListOrders from "./components/ListOrders";
import PreviewOrder from "./components/PreviewOrder";
import TrackingsOrder from "./components/TrackingsOrder";
import { filtersOrders } from "./data";
import useDirLogFiles from "./hooks/useDirLogFiles";
import useDirLogPedido from "./hooks/useDirLogPedido";
import useDirLogPedidos from "./hooks/useDirLogPedidos";
import useDirLogTrackings from "./hooks/useDirLogTrackings";
import useFilters from "./hooks/useFilters";
import { DirLogDashboardStyled } from "./styles";
import { useSelector } from "react-redux";
import { globalNotificationsSelector } from "../../redux/slices/globalNotificationsSlice";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";

export default function LogisticaPedidos({ isAdmin = false }) {
  const { data: notificationData, lastNotificationAt } = useSelector(globalNotificationsSelector);
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
    handleClickFillOrder,
    handleOnChangeKeyWord,
    deleteKeyWord,
    refetchData,
    lastFetchDate,
    // activeFilters,
    // setActiveFilters,
    // handleOnChangeFilter,
  } = useDirLogPedidos(activeFilters, isAdmin);

  const { orderSelectedData, isFetchingOrder, productsData, refetchPedido } = useDirLogPedido(orderSelected);
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
  const { openFiles, handleToggleFiles, filesData, handleRefetchFiles } = useDirLogFiles(orderSelected);

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
              placeholder="Buscar por folio, producto"
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
            <Badge badgeContent={lastNotificationAt && lastNotificationAt > lastFetchDate ? 1 : 0} color="primary">
              <Cached />
            </Badge>
          </IconButton>

          <div className={lastNotificationAt && lastNotificationAt > lastFetchDate && "refetchdata"}>
            {lastNotificationAt && lastNotificationAt > lastFetchDate && <p>Tienes nuevos pedidos</p>}
          </div>
        </div>
      </div>
      {/* <div>{lastNotificationAt && lastNotificationAt > lastFetchDate && <p>Pedido Nuevo</p>}</div>
      <div>{JSON.stringify(notificationData, null, 2)}</div> */}
      <ActiveFilters
        activeFilters={activeFilters}
        handleOnChangeFilter={handleOnChangeFilter}
        setActiveFilters={setActiveFilters}
      />
      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
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
              <div className="containertable">
                {/* <p>dasd</p> */}
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  mainColumn={"Fecha"}
                  heads={tableData.heads}
                  isLoading={isFetchingData}
                  actions={tableData.actions}
                  data={tableData.data}
                  customColumns={tableData.customColumns}
                  typeTable="border"
                  typeActions="icon"
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
                <PreviewOrder
                  isFetchingOrder={isFetchingOrder}
                  orderSelectedData={orderSelectedData}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  toggleTrackingsModal={toggleTrackingsModal}
                  handleToggleFiles={handleToggleFiles}
                  productsData={productsData}
                  handleClickFillOrder={handleClickFillOrder}
                  refetchPedido={refetchPedido}
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
      <FilesUpload
        open={openFiles}
        handletoogle={handleToggleFiles}
        filesData={filesData}
        idOrder={orderSelectedData?.id}
        refetch={handleRefetchFiles}
      />

      {/* <FilesOrder
        open={openFiles}
        handletoogle={handleToggleFiles}
        filesData={filesData}
        idOrder={orderSelectedData?.id}
        refetch={handleRefetchFiles}
      /> */}
    </DirLogDashboardStyled>
  );
}
