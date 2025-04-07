import React, { useState } from "react";
import { DirLogInventarioStyled } from "./styles";
import useDirLogInventario from "./hooks/useDirLogInventario";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import InventoryDetails from "./components/InventoryDetails";
import { Fade, Grid, IconButton } from "@material-ui/core";
import ListInventory from "./components/ListInventory";
import useDirLogInventarioProduct from "./hooks/useDirLogInventarioProduct";
import { Close, Search, UpdateSharp, Visibility } from "@material-ui/icons";
import useDirLogEntrance from "./hooks/useDirLogEntrance";
import useDirLogOutput from "./hooks/useDirLogOutput";
import useDirLogRepair from "./hooks/useDirLogRepair";
import RepairAcept from "./components/RepairAcept";
import useDirLogInventarioId from "./hooks/useDirLogInventarioId";
import TrackingInventory from "./components/TrackingInventory";
import userDirLogTrackingInv from "./hooks/userDirLogTrackingInv";
import LogisticsFilters from "../../components/LogisticsFilters";
import useLogisticsFilters from "../../hooks/useLogisticsFilters";
import { filtersProducts } from "./data";
import ActiveFilters from "../DirLogPedidos/components/ActiveFilters";
import ReserveArticle from "./components/ReserveArticle";
import useDirLogReserve from "./hooks/useDirLogReserve";
import useAlertToast from "../../hooks/useAlertToast";
import useDirLogReset from "./hooks/useDirLogReset";
import useDirBiomedic from "./hooks/useDirLogBiomedic";
import DrawerBiomePDF from "./components/DrawerBiomePDF";
import useDrawerBiomePDF from "./hooks/useDrawerBiomePDF";

export default function AdminAlmacenInventarioIndividual() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter } = useLogisticsFilters();
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();
  const {
    refetchData,
    paginationData,
    isOpenPreview,
    productInventorySelected,
    tableData,
    handleOnClickRow,
    handleOnClickClosePreview,
    totalResults,
    isFetchingData,
    orderBy,
    setOrderBy,
    handleOnChangeKeyWord,
    keyword,
    setKeyword,
    deleteKeyWord,
    setProductInventorySelected,
    fetchProductsInventory,
  } = useDirLogInventario(activeFilters);
  const { tabSeletect, handleOnClickTab, isFetchingProduct, orderSelectedData, setFlag, flag, returnsProducts, pagination } =
    useDirLogInventarioProduct(productInventorySelected);
  const { dataEntrance, totalEntrance, isFetchingEntrance, paginationDataEntrance} = useDirLogEntrance(
    productInventorySelected,
    tabSeletect
  );
  const { dataExit, totalExit, isFetchingExit, paginationDataOutput} = useDirLogOutput(productInventorySelected, tabSeletect);
  const { dataBiomedical, isFetchingBiomedical } = useDirBiomedic(productInventorySelected, tabSeletect);
  const { data, refreshDatas } = useDirLogInventarioId(productInventorySelected, isOpenPreview);
  const { handleOnClickNewRepair, refetch, openRepair, handleToggleRepair, handleRepair, isLoadingUpdate } =
    useDirLogRepair(refetchData, setFlag, flag, refreshDatas);
  const { handleOnClickNewReserve, openReserve, handleToggleReserve, handleReserve, isLoadingReserve } =
    useDirLogReserve(refetchData, setFlag, flag, refreshDatas);
  const {
    openTrackings,
    toggleTrackingsModal,
    dataTracking,
    dataTrackingTotal,
    page,
    setPage,
    limit,
    isInventoryTracking,
    reloadTrackings,
  } = userDirLogTrackingInv(productInventorySelected);

  const { handleOnClickReset } = useDirLogReset(productInventorySelected, refetchData, setFlag, flag, refreshDatas);
  const { drawerOpen, rutaPDF, handleToggleDrawer } = useDrawerBiomePDF();

  // const isValidAction = (key, event) => {
  //   switch (key) {
  //     case "apart":
  //       if (event?.stock > 0) {
  //         if (event?.isapart != true && event?.statusrepair != true) {
  //           setProductInventorySelected(event);
  //           handleOnClickNewReserve();
  //         } else {
  //           showAlertWarning("No se puede modificar cuando esta en reparacion o apartado");
  //         }
  //       } else {
  //         showAlertError("No hay stock del producto");
  //       }
  //       break;
  //     case "repair":
  //       if (event?.stock > 0) {
  //         if (event?.statusrepair != true && event?.isapart != true) {
  //           setProductInventorySelected(event);
  //           handleOnClickNewRepair();
  //         } else {
  //           showAlertWarning("No se puede modificar cuando esta en reparacion o apartado");
  //         }
  //       } else {
  //         showAlertError("No hay stock del producto");
  //       }
  //       break;
  //     case "reset":
  //       if (event?.statusrepair != true && event?.isapart != true) {
  //         showAlertSucces("Restablecido");
  //       } else if (event?.statusrepair == true || event?.isapart == true) {
  //         setProductInventorySelected(event);
  //         handleOnClickReset(event);
  //       }
  //       break;
  //     default:
  //       showAlertError("No hay stock del producto");
  //       break;
  //   }
  // };

  return (
    <DirLogInventarioStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Inventario por articulo <span>( Total {totalResults})</span>
          </h4>
        </div>
        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />

            <input
              value={keyword}
              onChange={e => {
                const value = e.target.value;
                setKeyword(value);
                if (!value.trim()) {
                  refetchData();
                }
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  refetchData();
                }
              }}
              className="inputContainer__input"
              placeholder="Buscar nombre de producto"
            />

            {keyword.length > 0 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>
          <LogisticsFilters
            filters={filtersProducts}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
          />

          <IconButton onClick={() => refetchData()}>
            <UpdateSharp />
          </IconButton>
        </div>
      </div>

      {/* <pre>{JSON.stringify(activeFilters, null, 2)}</pre> */}

      <ActiveFilters
        activeFilters={activeFilters}
        handleOnChangeFilter={handleOnChangeFilter}
        setActiveFilters={setActiveFilters}
      />

      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {isOpenPreview && (
              <ListInventory
                data={tableData.data}
                onRowClick={item => handleOnClickRow(item)}
                isFetchingData={isFetchingData}
                rowsLoader={totalResults >= 20 ? 20 : totalResults}
                paginationData={{
                  ...paginationData,
                  total: totalResults,
                }}
              />
            )}

            {!isOpenPreview && (
              <div className="table">
                <TableLimenkaGeneral
                  actions={[
                    {
                      icon: <Visibility />,
                      name: "Ver",
                      action: (event, item) => {
                        handleOnClickRow(event);
                      },
                    },
                  ]}
                  onRowClick={item => handleOnClickRow(item)}
                  typeTable="border"
                  heads={tableData.heads}
                  data={tableData.data}
                  customColumns={tableData.customColumns}
                  rowsLoader={totalResults >= 20 ? 20 : totalResults}
                  setOrderBy={setOrderBy}
                  isLoading={isFetchingData}
                  orderBy={orderBy}
                  paginationData={{
                    ...paginationData,
                    total: totalResults,
                  }}
                />
              </div>
            )}
          </Grid>

          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9} className="preview">
                <InventoryDetails
                  isFetchingData={isFetchingProduct}
                  tabSeletect={tabSeletect}
                  handleOnClickTab={handleOnClickTab}
                  productInventorySelected={productInventorySelected}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  orderSelectedData={orderSelectedData}
                  dataEntrance={dataEntrance}
                  paginationDataEntrance={paginationDataEntrance}
                  totalEntrance={totalEntrance}
                  dataExit={dataExit}
                  handleOnClickNewRepair={handleOnClickNewRepair}
                  isFetchingEntrance={isFetchingEntrance}
                  isFetchingExit={isFetchingExit} 
                  paginationDataOutput={paginationDataOutput}
                  totalExit={totalExit}
                  refreshData={refetch}
                  dataId={data}
                  toggleTrackingsModal={toggleTrackingsModal}
                  handleOnClickNewReserve={handleOnClickNewReserve}
                  handleOnClickReset={handleOnClickReset}
                  dataBiomedical={dataBiomedical}
                  isFetchingBiomedical={isFetchingBiomedical}
                  handleToggleDrawer={handleToggleDrawer}
                  returnsProducts={returnsProducts}
                  pagination={pagination}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
      <RepairAcept
        open={openRepair}
        handletoogle={handleToggleRepair}
        handleRepair={handleRepair}
        productInventorySelected={productInventorySelected}
        isFetchingDataId={isLoadingUpdate}
      />
      <ReserveArticle
        open={openReserve}
        handletoogle={handleToggleReserve}
        handleReserve={handleReserve}
        productInventorySelected={productInventorySelected}
        isFetchingDataId={isLoadingReserve}
      />
      {openTrackings && (
        <TrackingInventory
          open={openTrackings}
          toggleTrackingsModal={toggleTrackingsModal}
          dataTracking={dataTracking}
          dataTotal={dataTrackingTotal}
          page={page}
          setPage={setPage}
          limit={limit}
          isInventoryTracking={isInventoryTracking}
          reloadTrackings={reloadTrackings}
        />
      )}

      <DrawerBiomePDF 
        open={drawerOpen} 
        onClose={handleToggleDrawer} 
        url={rutaPDF}
        handleOnClickTab={handleOnClickTab}
      />
    </DirLogInventarioStyled>
  );
}
