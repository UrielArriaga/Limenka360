import React, { useEffect, useState } from "react";
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
import PaymentsDrawer from "./components/PaymentsDrawer";
import { api } from "../../services/api";
import useAlertToast from "../../hooks/useAlertToast";
import { usePayments } from "./hooks/usePayments";
import { statuspoo } from "../../constants";
import dayjs from "dayjs";
import { useActionsOrders } from "./hooks/useActionsOrders";

export default function PurchasingShoppingOrdenes({ isAdmin = false }) {
  const router = useRouter();

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

  const { isFetchingOrder, orderSelectedData, getDataOrder,handleDateChange,handleSelectChange} = useShippingOrder(orderSelected,dataProducts);
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

  const { anchorEl, options, handleMenuOpen, handleMenuClose } = useActionsOrders(
    orderSelected,
    getDataOrder,
    refetchData
  );

  const {
    edit,
    preview,
    payments,
    paymentPeriods,
    setEdit,
    generatePreview,
    handleChange,
    seePreview,
    openPaymentsDrawer,
    togglePaymentsDrawer,
    paymentspurchaseorder,
    updatePayments,
    pay,
    loadingPay,
    updating,
    count,
    pagePayments,
    handlePagination,
    limitPayments,
    loadingPP,
  } = usePayments(orderSelectedData, dataProducts);

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
        <Button
          color="primary"
          variant="contained"
          className="add"
          onClick={() => {
            router.push("./ordenes/nueva");
          }}
        >
          <Add />
          Nueva orden de compra
        </Button>
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
                  handleDateChange={handleDateChange}
                  handleSelectChange={handleSelectChange}
                  isFetchingData={isFetchingOrder}
                  orderSelected={orderSelectedData}
                  dataProducts={dataProducts}
                  toggleTrackingsModal={toggleTrackingsModal}
                  handleToggleFiles={handleToggleFiles}
                  togglePaymentsDrawer={togglePaymentsDrawer}
                  handleMenuOpen={handleMenuOpen}
                  handleMenuClose={handleMenuClose}
                  anchorEl={anchorEl}
                  options={options}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>

      <PaymentsDrawer
        isOpen={openPaymentsDrawer}
        toggleDrawer={togglePaymentsDrawer}
        paymentspurchaseorder={paymentspurchaseorder}
        edit={edit}
        preview={preview}
        payments={payments}
        setEdit={setEdit}
        generatePreview={generatePreview}
        handleChange={handleChange}
        paymentPeriods={paymentPeriods}
        seePreview={seePreview}
        orderSelectedData={orderSelectedData}
        updatePayments={updatePayments}
        pay={pay}
        loadingPay={loadingPay}
        updating={updating}
        count={count}
        pagePayments={pagePayments}
        handlePagination={handlePagination}
        limitPayments={limitPayments}
        loadingPP={loadingPP}
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
