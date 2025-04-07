import React from "react";
import { DirLogInventarioStyled } from "./styles";
import useMasterInventario from "./hooks/useMasterInventario";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import InventoryDetails from "./components/InventoryDetails";
import { Fade, Grid, IconButton } from "@material-ui/core";
import ListInventory from "./components/ListInventory";
import useMasterInventarioProduct from "./hooks/useMasterInventarioProduct";
import { Close, Healing, LibraryAddCheck, RestoreFromTrash, Search, UpdateSharp } from "@material-ui/icons";
import useMasterEntrance from "./hooks/useMasterEntrance";
import useMasterOutput from "./hooks/useMasterOutput";
import useMasterRepair from "./hooks/useMasterRepair";
import RepairAcept from "./components/RepairAcept";
import useMasterInventarioId from "./hooks/useMasterInventarioId";
import TrackingInventory from "./components/TrackingInventory";
import userMasterTrackingInv from "./hooks/userMasterTrackingInv";
import LogisticsFilters from "../../components/LogisticsFilters";
import useLogisticsFilters from "../../hooks/useLogisticsFilters";
import { filtersProducts } from "./data";
import ActiveFilters from "../DirLogPedidos/components/ActiveFilters";
import ReserveArticle from "./components/ReserveArticle";
import useMasterReserve from "./hooks/useMasterReserve";
import useAlertToast from "../../hooks/useAlertToast";
import useMasterReset from "./hooks/useMasterReset";

export default function MasterInventarioUnit() {
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
    deleteKeyWord,
    setProductInventorySelected,
  } = useMasterInventario(activeFilters);
  const { tabSeletect, handleOnClickTab, isFetchingProduct, orderSelectedData, setFlag, flag, returnsProducts, pagination} =
  useMasterInventarioProduct(productInventorySelected);
  const { dataEntrance, totalEntrance, isFetchingEntrance } = useMasterEntrance(productInventorySelected, tabSeletect);
  const { dataExit, isFetchingExit } = useMasterOutput(productInventorySelected, tabSeletect);
  const { data, refreshDatas } = useMasterInventarioId(productInventorySelected, isOpenPreview);
  const { handleOnClickNewRepair, refetch, openRepair, handleToggleRepair, handleRepair, isLoadingUpdate } =
  useMasterRepair(refetchData, setFlag, flag, refreshDatas);
  const { handleOnClickNewReserve, openReserve, handleToggleReserve, handleReserve, isLoadingReserve } =
  useMasterReserve(refetchData, setFlag, flag, refreshDatas);
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
  } = userMasterTrackingInv(productInventorySelected);
  const { handleOnClickReset } = useMasterReset(productInventorySelected, refetchData, setFlag, flag, refreshDatas);

  const isValidAction = (key, event) => {
    switch (key) {
      case "apart":
        if (event?.stock > 0) {
          if (event?.isapart != true && event?.statusrepair != true) {
            setProductInventorySelected(event);
            handleOnClickNewReserve();
          } else {
            showAlertWarning("No se puede modificar cuando esta en reparacion o apartado");
          }
        } else {
          showAlertError("No hay stock del producto");
        }
        break;
      case "repair":
        if (event?.stock > 0) {
          if (event?.statusrepair != true && event?.isapart != true) {
            setProductInventorySelected(event);
            handleOnClickNewRepair();
          } else {
            showAlertWarning("No se puede modificar cuando esta en reparacion o apartado");
          }
        } else {
          showAlertError("No hay stock del producto");
        }
        break;
      case "reset":
        if (event?.statusrepair != true && event?.isapart != true) {
          showAlertSucces("Restablecido");
        } else if (event?.statusrepair == true || event?.isapart == true) {
          setProductInventorySelected(event);
          handleOnClickReset(event);
        }
        break;
      default:
        showAlertError("No hay stock del producto");
        break;
    }
  };

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
              onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por numero de serie"
            />

            {keyword.length > 3 && (
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
                      icon: <Healing />,
                      name: "Mover a Reparaciones",
                      action: event => {
                        isValidAction("repair", event);
                      },
                    },
                    {
                      icon: <LibraryAddCheck />,
                      name: "Mover Apartados",
                      action: event => {
                        isValidAction("apart", event);
                      },
                    },
                    {
                      icon: <RestoreFromTrash />,
                      name: "Resetear Producto",
                      action: event => {
                        isValidAction("reset", event);
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
                  totalEntrance={totalEntrance}
                  dataExit={dataExit}
                  handleOnClickNewRepair={handleOnClickNewRepair}
                  isFetchingEntrance={isFetchingEntrance}
                  isFetchingExit={isFetchingExit}
                  refreshData={refetch}
                  dataId={data}
                  toggleTrackingsModal={toggleTrackingsModal}
                  handleOnClickNewReserve={handleOnClickNewReserve}
                  handleOnClickReset={handleOnClickReset}
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
    </DirLogInventarioStyled>
  );
}
