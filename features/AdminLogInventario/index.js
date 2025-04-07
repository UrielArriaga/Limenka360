import React from "react";
import { DirLogInventarioStyled } from "./styles";
import useDirLogInventario from "./hooks/useDirLogInventario";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import InventoryDetails from "./components/InventoryDetails";
import { Fade, Grid, IconButton } from "@material-ui/core";
import ListInventory from "./components/ListInventory";
import useDirLogInventarioProduct from "./hooks/useDirLogInventarioProduct";
import { Close, Search, UpdateSharp, Visibility } from "@material-ui/icons";
import Filters from "./components/Filters";
import useDirLogEntrance from "./hooks/useDirLogEntrance";
import useFilters from "../DirLogPedidos/hooks/useFilters";
import ActiveFilters from "../DirLogPedidos/components/ActiveFilters";
import useDirLogOutputs from "./hooks/useDirLogOutputs";
import LogisticsFilters from "../../components/LogisticsFilters";
import { filtersInventario } from "./data";

export default function AdminLogInventario() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filtersInventario);
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
    inventorySelected,
    handleOnChangeKeyWord,
    keyword,
    deleteKeyWord,
  } = useDirLogInventario(activeFilters);

  const { tabSeletect, handleOnClickTab, isFetchingProduct, orderSelectedData } =
    useDirLogInventarioProduct(productInventorySelected);

  const { isFetchingEntrance, dataEntrance, paginationDataEntrance, totalEntrance } = useDirLogEntrance(
    productInventorySelected,
    tabSeletect
  );
  const { isFetchingExit, dataOutputs, paginationDataOutput, totalOutputs } = useDirLogOutputs(
    productInventorySelected,
    tabSeletect
  );
  return (
    <DirLogInventarioStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Inventario <span>( Total {totalResults})</span>
          </h4>
        </div>

        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />

            <input
              value={keyword}
              onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar nombre de producto"
            />

            {keyword.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>

          <LogisticsFilters
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
            {isOpenPreview && (
              <ListInventory
                inventorySelected={inventorySelected}
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
                      icon: <Visibility/>,
                      name: "Ver detalles",
                      action: (event, rowData) => {
                        handleOnClickRow(event);
                      },
                    },
                  ]}
                  mainColumn={"Codigo"}
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
                  isFetchingEntrance={isFetchingEntrance}
                  dataOutputs={dataOutputs}
                  isFetchingExit={isFetchingExit}
                  paginationData={{
                    ...paginationDataEntrance,
                    total: totalEntrance,
                  }}
                  paginationDataOutput={{
                    ...paginationDataOutput,
                    total: totalOutputs,
                  }}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
    </DirLogInventarioStyled>
  );
}
