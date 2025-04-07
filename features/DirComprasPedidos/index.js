import { Badge, Button, Fade, Grid, IconButton } from "@material-ui/core";
import { Cached, Close, Search, UpdateSharp } from "@material-ui/icons";
import React, { useContext, useEffect } from "react";
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
import { useState } from "react";
import useModal from "../../hooks/useModal";
import AddProductToOrder from "./components/AddProductToOrder";
import ProductDelivery from "./components/MarkedDelivery";
import ModalAssingPorder from "../ShoppingOrdenes/components/ModalAssingWereHouse";
import ModalAssingByProduct from "../ShoppingOrdenes/components/ModalAssingByProduct";
import FilesUpload from "./components/FilesUpload";
import ModalMarkDelivery from "../ShoppingOrdenes/components/ModalMarkDelivery";
import useRejectedShippingsOrders from "./hooks/useRejectedShippingsOrders";
import { useRouter } from "next/router";
import { SocketContext } from "../../context/socketContext";

const useAddProductToOrder = () => {
  const { open, toggleModal } = useModal();
  const [productToOrderSelected, setProductToOrderSelected] = useState([]);

  const handleClickProduct = product => {
    setProductToOrderSelected([product]);
    toggleModal();
  };

  return {
    open,
    toggleModal,
    handleClickProduct,
    productToOrderSelected,
    setProductToOrderSelected,
  };
};

export default function DirComprasPedidos({ isAdmin = false }) {
  const { socket, online } = useContext(SocketContext);

  const { data: notificationData, lastNotificationAt } = useSelector(globalNotificationsSelector);

  const router = useRouter();
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filtersOrders);

  const {
    isOpenPreview,
    setIsOpenPreview,
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
    handleOnKeyEnter,
    deleteKeyWord,
    refetchData,
    lastFetchDate,
    openModalDelivery,
    toggleModalDelivery,
    markedDeliveryProduct,
    GetSuplaceProducts,
    productsModal,
    // activeFilters,
    // setActiveFilters,
    // handleOnChangeFilter,
  } = useDirLogPedidos(activeFilters, setActiveFilters);

  const { orderSelectedData, isFetchingOrder, productsData, totalOrdersShopping, getDataOrder, folioNew } =
    useDirLogPedido(orderSelected);
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

  const { openFiles, handleToggleFiles, statesFiles, actionsFiles, paginationFiles } =
    useDirLogFiles(orderSelectedData);

  const { open, toggleModal, handleClickProduct, productToOrderSelected, setProductToOrderSelected } =
    useAddProductToOrder();
  const {
    handleReject,
    setRejectedOptionSelected,
    handleMenuOpen,
    handleRejectOrder,
    anchorEl,
    openRejected,
    closeModalReject,
    handleMenuClose,
    toggleModalRejected,
    handleRemoveRejectOrder,
  } = useRejectedShippingsOrders(orderSelected, refetchData, setIsOpenPreview, orderSelectedData);

  return (
    <DirLogDashboardStyled isFilterActive={activeFilters?.length > 0}>
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
              onKeyDown={e => handleOnKeyEnter(e)}
              className="inputContainer__input"
              placeholder="Buscar por folio de pedido"
            />

            {keyword?.length > 3 && (
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
            <Badge
              overlap="rectangular"
              badgeContent={lastNotificationAt && lastNotificationAt > lastFetchDate ? 1 : 0}
              color="primary"
            >
              <Cached />
            </Badge>
          </IconButton>

          <div className={lastNotificationAt && lastNotificationAt > lastFetchDate && "refetchdata"}>
            {lastNotificationAt && lastNotificationAt > lastFetchDate && <p>Tienes nuevos pedidos</p>}
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
                  handleClickProduct={handleClickProduct}
                  markedDeliveryProduct={markedDeliveryProduct}
                  isChecked={openModalDelivery}
                  setRejectedOptionSelected={setRejectedOptionSelected}
                  handleReject={handleReject}
                  handleMenuOpen={handleMenuOpen}
                  handleRejectOrder={handleRejectOrder}
                  anchorEl={anchorEl}
                  openRejected={openRejected}
                  closeModalReject={closeModalReject}
                  handleMenuClose={handleMenuClose}
                  toggleModalRejected={toggleModalRejected}
                  handleRemoveRejectOrder={handleRemoveRejectOrder}
                  totalOrdersShopping={totalOrdersShopping}
                  productToOrderSelected={productToOrderSelected}
                  setProductToOrderSelected={setProductToOrderSelected}
                  toggleModal={toggleModal}
                  getDataOrder={getDataOrder}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
      <ModalAssingPorder
        open={open}
        handleToggle={toggleModal}
        productToOrderSelected={productToOrderSelected}
        orderSelectedData={orderSelectedData}
        productsData={productsData}
        getDataOrder={getDataOrder}
      />

      <ModalMarkDelivery
        open={openModalDelivery}
        handleToggle={toggleModalDelivery}
        orderDataSelect={orderSelectedData}
        GetSuplaceProducts={GetSuplaceProducts}
        productsModal={productsModal}
        folioNew={folioNew}
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
      <FilesUpload
        idOrder={orderSelectedData?.id}
        open={openFiles}
        handletoogle={handleToggleFiles}
        orderData={orderSelectedData}
        statesFiles={statesFiles}
        actionsFiles={actionsFiles}
        paginationFiles={paginationFiles}
      />
    </DirLogDashboardStyled>
  );
}
