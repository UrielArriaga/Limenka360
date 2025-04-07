import React, { useState } from "react";
import { AdminManagerStyled } from "./styled";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import { Cached, Close, Search } from "@material-ui/icons";
import { Grid, IconButton } from "@material-ui/core";
import useSales from "./hooks/useSales";
import useSaleId from "./hooks/useSaleId";
import ListSales from "./Components/ListOrders";
import { AnimatePresence, motion } from "framer-motion";
import PreviewSale from "./Components/PreviewSale";
import PreviewCuote from "../../components/DrawerPreview";
import useTrackings from "./hooks/useTrackings";
import TrackingsSale from "./Components/TrackingsSale";
import { filtersSales } from "./data";
import Filters from "./Components/Filters";
import ActiveFilters from "./Components/ActiveFilters";
import useFilters from "../AdminManagerOrders/hooks/useFilters";
import useModalExportFile from "./hooks/useModalExportFile";
import ModalExportFileExcel from "./Components/ModalExportFileExcel";

export default function AdminManagerSales() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filtersSales);
  const {
    handleOnChangeKeyWord,
    deleteKeyWord,
    handleOnClickRow,
    handleOnKeyEnter,
    orderBy,
    setOrderBy,
    keyword,
    totalActivities,
    setIsFetchingData,
    isFetchingData,
    refetchData,
    paginationData,
    tableData,
    dispatch,
    orderSelected,
    isOpenPreview,
    handleOnClickClosePreview,
  } = useSales(activeFilters, setActiveFilters);

  const {
    orderSelectedData,
    isFetchingOrder,
    dataPayments,
    tabIndex,
    handleOpenPreview,
    handleTabChange,
    setOpenpreview,
    openpreview,
    handleDownloadFile,
    loadingPdf,
  } = useSaleId(orderSelected);

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
  } = useTrackings(orderSelected);
  const oportunitySelect = [orderSelectedData];
  const { modalExport, handleExportFile, rangeDate, setRangeDate } = useModalExportFile();
  return (
    <AdminManagerStyled isFilterActive={activeFilters?.length > 0}>
      <div className="header">
        <div className="head">
          <div className="header__title">
            <h4>
              Ventas <span>({totalActivities})</span>
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
                placeholder="Buscar por Nombre."
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
              // handleOnChangeFilter={handleOnChangeFilter}
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
              <ListSales
                orderSelected={orderSelected}
                data={tableData.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={totalActivities >= 20 ? 20 : totalActivities}
                isLoading={isFetchingData}
                paginationData={{
                  ...paginationData,
                  total: totalActivities,
                }}
              />
            )}
            {!isOpenPreview && (
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  mainColumn={"nombre"}
                  heads={tableData?.heads}
                  isLoading={isFetchingData}
                  data={tableData?.data}
                  customColumns={tableData.customColumns}
                  typeTable="border"
                  typeActions="icon"
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                  rowsLoader={totalActivities >= 20 ? 20 : totalActivities || 20}
                  paginationData={{
                    ...paginationData,
                    total: totalActivities,
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
                    <PreviewSale
                      orderSelectedData={orderSelectedData}
                      handleOnClickClosePreview={handleOnClickClosePreview}
                      isFetchingOrder={isFetchingOrder}
                      orderSelected={orderSelected}
                      dataPayments={dataPayments}
                      handleDownloadFile={handleDownloadFile}
                      tabIndex={tabIndex}
                      handleOpenPreview={handleOpenPreview}
                      handleTabChange={handleTabChange}
                      loadingPdf={loadingPdf}
                      toggleTrackingsModal={toggleTrackingsModal}
                    />
                  </motion.div>
                </div>
              </AnimatePresence>
            </Grid>
          )}
        </Grid>
      </div>
      <TrackingsSale
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

      <PreviewCuote open={openpreview} setOpen={setOpenpreview} oportunitySelect={oportunitySelect} />

      <ModalExportFileExcel
        open={modalExport.open}
        handletoogle={modalExport.toggleModal}
        handleExportFile={handleExportFile}
        rangeDate={rangeDate}
        setRangeDate={setRangeDate}
      />
      {!isOpenPreview && (
        <a onClick={() => modalExport?.toggleModal()} class="btn-flotante">
          Exportar Achivo
        </a>
      )}
    </AdminManagerStyled>
  );
}
