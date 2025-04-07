import React from "react";
import { FloorManagerInventarioStyled } from "./styles";
import InventoryDetails from "./components/InventoryDetails";
import useFilters from './hooks/useFilters';
import useFloorManagerInventarioIn from './hooks/useFloorManagerInventarioIn';
import useFloorManagerInventarioProduct from './hooks/useFloorManagerInventarioProduct';
import useFloorManagerInventarioEntrance from './hooks/useFloorManagerInventarioEntrance';
import useFloorManagerInventarioOutput from './hooks/useFloorManagerInventarioOutputs';
import { Close, Search, UpdateSharp } from "@material-ui/icons";
import { Fade, Grid, IconButton } from "@material-ui/core";
import LogisticsFilters from "../../components/LogisticsFilters";
import ActiveFilters from "./components/ActiveFilters";
import ListInventory from "./components/ListInventory";
import { filtersInventario } from "./data";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";

export default function FloorManagerInventario() {
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
      deleteKeyWord,
    } = useFloorManagerInventarioIn(activeFilters);
  
    const { tabSeletect, handleOnClickTab, isFetchingProduct, orderSelectedData } =
    useFloorManagerInventarioProduct(productInventorySelected);
  
    const { isFetchingEntrance, dataEntrance, paginationDataEntrance, totalEntrance } = useFloorManagerInventarioEntrance(
      productInventorySelected,
      tabSeletect
    );
    const { isFetchingExit, dataOutputs, paginationDataOutput, totalOutputs } = useFloorManagerInventarioOutput(
      productInventorySelected,
      tabSeletect
    );
  return <FloorManagerInventarioStyled>
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
 
  </FloorManagerInventarioStyled>;
}
