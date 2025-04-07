import React, { useState } from "react";
import { DirLogInventarioStyled } from "./styles";
import useDirLogInventario from "./hooks/useDirLogInventario";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import InventoryDetails from "./components/InventoryDetails";
import { Fade, Grid, IconButton } from "@material-ui/core";
import ListInventory from "./components/ListInventory";
import useDirLogInventarioProduct from "./hooks/useDirLogInventarioProduct";
import {
  Close,
  Healing,
  LibraryAddCheck,
  RestoreFromTrash,
  Search,
  SwapHorizontalCircleOutlined,
  UpdateSharp,
} from "@material-ui/icons";
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
import useTransferArticles from "./hooks/useTransferArticles";
import ModalTransfers from "./components/ModalTransfers";

export default function DirLogInventarioUnit() {
  const [rowsSelected, setRowsSelected] = useState([]);

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
    handleSelectedProduct,
    selectedProduct,
    deleteKeyWord,
    setProductInventorySelected,
  } = useDirLogInventario(activeFilters);
  const { tabSeletect, handleOnClickTab, isFetchingProduct, orderSelectedData, setFlag, flag, returnsProducts, pagination } =
    useDirLogInventarioProduct(productInventorySelected);
  const { dataEntrance, totalEntrance, isFetchingEntrance } = useDirLogEntrance(productInventorySelected, tabSeletect);
  const { dataExit, isFetchingExit } = useDirLogOutput(productInventorySelected, tabSeletect);
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

  const {
    observations,
    handleOnChangeObservations,
    warehouses,
    handleOnChangeWareHouse,
    handleOpenModalTransfer,
    handleCloseTransferModal,
    openModalTransfer,
    handlersTransfers,
    statesTransfers,
  } = useTransferArticles(rowsSelected, setRowsSelected, refetchData);

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
              placeholder="Buscar"
            />

            {keyword.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>

          <select id="product-select" className="select" value={selectedProduct} onChange={handleSelectedProduct}>
            <option value="serialnumber">Serie</option>
            <option value="name">Producto</option>
          </select>

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
                      name: "Traspasar Articulo",
                      action: event => {
                        if (!rowsSelected.length > 0) {
                          handlersTransfers.handleOnClickSelectArticle(event);
                        } else {
                          alert("Tienes articulos seleccionados");
                        }
                      },
                    },
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
                  actionsSelected={[
                    {
                      icon: <SwapHorizontalCircleOutlined />,
                      name: "Traspasar Articulo",
                      action: rows => {
                        handleOpenModalTransfer(rows);
                      },
                    },
                  ]}
                  isSelectable
                  onRowClick={item => handleOnClickRow(item)}
                  selectedRows={rowsSelected}
                  setSelectedRows={newSelection => {
                    const validSelection = newSelection.filter(row => {
                      const isBlocked = row.statusrepair || row.isapart;
                      if (isBlocked) {
                        showAlertWarning("No se pueden seleccionar productos en reparación o apartados.");
                      }
                      return !isBlocked;
                    });
                
                    setRowsSelected(validSelection);
                  }}
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
                  returnsProducts={returnsProducts}
                  handleOnClickNewRepair={handleOnClickNewRepair}
                  isFetchingEntrance={isFetchingEntrance}
                  isFetchingExit={isFetchingExit}
                  refreshData={refetch}
                  dataId={data}
                  toggleTrackingsModal={toggleTrackingsModal}
                  handleOnClickNewReserve={handleOnClickNewReserve}
                  handleOnClickReset={handleOnClickReset}
                  handleOnClickSelectArticle={handlersTransfers.handleOnClickSelectArticle}
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

      <ModalTransfers
        statesTransfers={statesTransfers}
        handlersTransfers={handlersTransfers}
        warehouses={warehouses}
        rowsSelected={rowsSelected}
        setRowsSelected={setRowsSelected}
        open={openModalTransfer}
        observations={observations}
        handletoogle={handleCloseTransferModal}
        handleOnChangeWareHouse={handleOnChangeWareHouse}
        handleOnChangeObservations={handleOnChangeObservations}
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
