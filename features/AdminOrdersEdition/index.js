import React, { useState } from "react";
import { AdminManagerOrdersStyled } from "./styles";
import useAdminManagerOrders from "./hooks/useAdminManagerOrders";
import { Badge, Grid, IconButton } from "@material-ui/core";
import { Cached, Close, Search } from "@material-ui/icons";
import Filters from "./components/Filters";

import { filtersOrders } from "./data";
import ListOrders from "./components/ListOrders";
import useDirLogPedidos from "./hooks/useDirLogPedidos";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import PreviewOrder from "./components/PreviewOrder";
import { AnimatePresence, motion } from "framer-motion";
import useDirLogPedido from "./hooks/useDirLogPedido";
import useDirLogFiles from "./hooks/useDirLogFiles";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";
import EditOrderShipping from "./components/EditOrderShipping";
import useEditOrderShipping from "./hooks/useEditOrderShipping";
import EditOrderBilling from "./components/EditOrderBilling";
import useEditOrderBilling from "./hooks/useEditOrderBilling";
import { useActionsOrders } from "./hooks/useActionsOrders";
import ModalApprovedOrder from "./components/ModalApprovedOrder";
import ModalRejectOrder from "./components/ModalRejectOrder";
import TrackingsOrder from "./components/TrackingsOrder";
import useDirLogTrackings from "./hooks/useDirLogTrackings";
import ActiveFilters from "./components/ActiveFilters";
import { useActionsOrderDowloand } from "./hooks/useActionsOrderDowloand";
import useFilters from "./hooks/useFilters";
import useAlertToast from "../../hooks/useAlertToast";
import { toast } from "react-toastify";
import useEditOrderData from "./hooks/useEditOrderData";
import EditOrderData from "./components/EditOrderData";
import { clearState } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import ModalCanceledOrder from "../AdminOrders/components/ModalCanceledOrder";
import HeaderActions from "../AdminOrders/components/HeaderActions";

export default function AdminOrdersEdition() {
  const dispatch = useDispatch();
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
    updateItemPropertyLocal,
    handleOnChangeKeyWord,
    handleOnKeyEnter,
    deleteKeyWord,
    refetchData,
  } = useDirLogPedidos(activeFilters, setActiveFilters);

  const {
    orderSelectedData,
    isFetchingOrder,
    productsData,
    refetchPedido,
    updatePropertyLocal,
    getProductsSerial,
    serialProducts,
  } = useDirLogPedido(orderSelected);

  const { openFiles, handleToggleFiles, paginationFiles, statesFiles, actionsFiles } =
    useDirLogFiles(orderSelectedData);

  const {
    openEditOrderShipping,
    handleToggleEditShipping,
    registerShipping,
    handleOnChangePostalCode,
    handleSelectEntity,
    handleSelectCity,
    handleSubmitShipping,
    errorsShipping,
    controlShipping,
    handleOnClickUpdateShipping,
    handleOnChangeSelect,
  } = useEditOrderShipping(orderSelectedData, refetchPedido);

  const {
    openEditOrderBill,
    handleToggleEditBill,
    registerBilling,
    setValueBilling,
    controlBilling,
    watchBilling,
    handleSubmitBilling,
    handleSelectEntity: handleSelectEntityBill,
    handleSelectCity: handleSelectCityBill,
    handleOnChangePostalCodeBill,
    handleOnChangeSelectBilling,
    handleOnClickUpdateBilling,
    optionsSelectBilling,
    errorsBilling,
    hasBilling,
    setHasBilling,
  } = useEditOrderBilling(orderSelectedData, refetchPedido);

  const {
    openEditOrdeData,
    handleToggleEditOrderData,
    controlOrderData,
    errorsOrderData,
    handleSubmitOrderData,
    handleOnClickUpdateOrderData,
    registerOrderData,
    setValueOrderData,
  } = useEditOrderData();

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

  const actionsMenu = useActionsOrders(orderSelectedData, updatePropertyLocal, updateItemPropertyLocal);

  const actionsMenuPDF = useActionsOrderDowloand(
    orderSelectedData,
    updatePropertyLocal,
    updateItemPropertyLocal,
    productsData
  );

  return (
    <AdminManagerOrdersStyled isFilterActive={activeFilters?.length > 0}>
      <div className="header">
        <div className="header__flex">
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
                placeholder="Buscar por folio."
              />

              <select className="inputContainer__select">
                <option value="1">Folio</option>
                <option value="2">Ejecutivo</option>
              </select>

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
              // handleOnChangeFilter={handleOnChangeFilter}
            />

            <IconButton className="icon" onClick={() => refetchData()}>
              <Badge
                overlap="rectangular"
                // badgeContent={lastNotificationAt && lastNotificationAt > lastFetchDate ? 1 : 0}
                color="primary"
              >
                <Cached />
              </Badge>
            </IconButton>
          </div>
        </div>

        <HeaderActions />
        {/* <div
              className="close"
              onClick={() => {
                dispatch(clearState());
              }}
            >
              <p>Cerrar Sesion</p>
            </div> */}
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
            <Grid item md={9} className="preview">
              <AnimatePresence>
                <div style={{ overflow: "hidden" }}>
                  <motion.div
                    key="previewOrder"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PreviewOrder
                      orderSelectedData={orderSelectedData}
                      handleOnClickClosePreview={handleOnClickClosePreview}
                      productsData={productsData}
                      isFetchingOrder={isFetchingOrder}
                      handleToggleFiles={handleToggleFiles}
                      toggleTrackingsModal={toggleTrackingsModal}
                      actionsEditOrder={{
                        handleToggleEditShipping,
                        handleToggleEditBill,
                        handleToggleEditOrderData,
                      }}
                      actionsMenu={actionsMenu}
                      actionsMenuPDF={actionsMenuPDF}
                      getProductsSerial={getProductsSerial}
                      serialProducts={serialProducts}
                    />
                  </motion.div>
                </div>
              </AnimatePresence>
            </Grid>
          )}
        </Grid>
      </div>

      <FilesUpload
        idOrder={orderSelectedData?.id}
        open={openFiles}
        handletoogle={handleToggleFiles}
        orderData={orderSelectedData}
        statesFiles={statesFiles}
        actionsFiles={actionsFiles}
        paginationFiles={paginationFiles}
      />

      <EditOrderShipping
        open={openEditOrderShipping}
        handletoogle={handleToggleEditShipping}
        registerShipping={registerShipping}
        controlShipping={controlShipping}
        handleSelectEntity={handleSelectEntity}
        handleOnChangePostalCode={handleOnChangePostalCode}
        handleSelectCity={handleSelectCity}
        handleOnClickUpdateShipping={handleOnClickUpdateShipping}
        handleSubmitShipping={handleSubmitShipping}
        errorsShipping={errorsShipping}
        handleOnChangeSelect={handleOnChangeSelect}
      />

      <EditOrderBilling
        open={openEditOrderBill}
        handletoogle={handleToggleEditBill}
        registerBilling={registerBilling}
        controlBilling={controlBilling}
        handleSubmitBilling={handleSubmitBilling}
        watchBilling={watchBilling}
        handleSelectCity={handleSelectCityBill}
        handleSelectEntity={handleSelectEntityBill}
        handleOnClickUpdateBilling={handleOnClickUpdateBilling}
        optionsSelectBilling={optionsSelectBilling}
        errorsBilling={errorsBilling}
        handleOnChangeSelectBilling={handleOnChangeSelectBilling}
        handleOnChangePostalCodeBill={handleOnChangePostalCodeBill}
        setValueBilling={setValueBilling}
        hasBilling={hasBilling}
        setHasBilling={setHasBilling}
      />

      <EditOrderData
        open={openEditOrdeData}
        handletoogle={handleToggleEditOrderData}
        orderSelectedData={orderSelectedData}
        controlOrderData={controlOrderData}
        errorsOrderData={errorsOrderData}
        handleSubmitOrderData={handleSubmitOrderData}
        registerOrderData={registerOrderData}
        setValueOrderData={setValueOrderData}
        handleOnClickUpdateOrderData={handleOnClickUpdateOrderData}
      />

      <ModalApprovedOrder
        open={actionsMenu.openModalApproved}
        handletoogle={actionsMenu.toggleModalApproved}
        orderSelectedData={orderSelectedData}
        isSaving={actionsMenu.isSaving}
        handleOnClickApprove={actionsMenu.handleOnClickApprove}
      />

      <ModalRejectOrder
        open={actionsMenu.openModalReject}
        handletoogle={actionsMenu.toggleModalReject}
        orderSelectedData={orderSelectedData}
        reasonSelected={actionsMenu.reasonSelected}
        handleOnChangeReason={actionsMenu.handleOnChangeReason}
        handleOnClickReject={actionsMenu.handleOnClickReject}
        isSaving={actionsMenu.isSaving}
      />

      <ModalCanceledOrder
        open={actionsMenu.openModalCanceled}
        handletoogle={actionsMenu.toggleModalCanceled}
        orderSelectedData={orderSelectedData}
        reasonSelected={actionsMenu.reasonSelected}
        handleOnChangeReason={actionsMenu.handleOnChangeReason}
        handleOnClickReject={actionsMenu.handleOnClickCanceled}
        isSaving={actionsMenu.isSaving}
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
    </AdminManagerOrdersStyled>
  );
}
