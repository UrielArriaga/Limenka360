import React from "react";
import { AdminAlmacenInventarioStyled } from "./styles";
import { Close, Search, UpdateSharp } from "@material-ui/icons";
import { Fade, Grid, IconButton } from "@material-ui/core";
import LogisticsFilters from "../../components/LogisticsFilters";
// import ActiveFilters from "../AdminAlmacenInventario/components/ActiveFilters";
import ListInventory from "./components/ListInventory";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import InventoryDetails from "./components/InventoryDetails";
import useFilters from "./hooks/useFilters";
import useAlmacenInventarioIn from "./hooks/useAlmacenInventarioIn";
import useAlmacengInventarioProduct from "./hooks/useAlmacenInventarioProduct";
import useAlmacenInventarioEntrance from "./hooks/useAlmacenInventarioEntrance";
import useAlmacenInventarioOutputs from "./hooks/useAlmacenInventarioOutputs";
import { filtersInventario } from "./data";
import ActiveFilters from "./components/ActiveFilters";

export default function AdminAlmacenInventario() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter } = useFilters();
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
    setKeyword,
    deleteKeyWord,
  } = useAlmacenInventarioIn(activeFilters);

  const { tabSeletect, handleOnClickTab, isFetchingProduct, orderSelectedData } =
    useAlmacengInventarioProduct(productInventorySelected);

  const { isFetchingEntrance, dataEntrance, paginationDataEntrance, totalEntrance } = useAlmacenInventarioEntrance(
    productInventorySelected,
    tabSeletect
  );
  const { isFetchingExit, dataOutputs, paginationDataOutput, totalOutputs } = useAlmacenInventarioOutputs(
    productInventorySelected,
    tabSeletect
  );

  return (
    <AdminAlmacenInventarioStyled>
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
              onChange={(e) => {
                const value = e.target.value;
                setKeyword(value);
                if (!value.trim()) {
                  refetchData();
                }
              }}
              onKeyDown={(e) => {
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
            filters={filtersInventario}
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
                      icon: "Ver",
                      tooltip: "Ver detalles",
                      action: (event, rowData) => {
                        handleOnClickRow(rowData);
                      },
                    },
                  ]}
                  mainColumn={"Codigo"}
                  onRowClick={item => {handleOnClickRow(item)}}
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
    </AdminAlmacenInventarioStyled>
  );
}
