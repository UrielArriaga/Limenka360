import React, { useEffect, useState } from "react";
import { DirLogRecoleccioneStyled } from "./styles";
import { Fade, Grid, IconButton } from "@material-ui/core";
import { Close, Search, UpdateSharp, Visibility } from "@material-ui/icons";
import LogisticsFilters from "../../components/LogisticsFilters";
import useFilters from "./hooks/useFilters";
import useDirLogRecolecion from "./hooks/useDirLogRecolecion";
import ActiveFiltersRecolecion from "./components/ActiveFilters/ActiveFilters";
import useDirLogEntrance from "./hooks/useDirLogEntrance";
import useDirLogOutputs from "./hooks/useDirLogOutputs";
import useDirLogInventarioProduct from "./hooks/useDirLogInventarioProduct";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ListRecolecion from "./components/ListRecolecciones";
import RecolecionDetails from "./components/RecolecionDetails";
import DataFilter from "./data";

function AdminLogRecolecciones() {
  const { filtersRecolecion } = DataFilter();
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filtersRecolecion);
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
    pickupsSelect,
  } = useDirLogRecolecion(activeFilters);
  const { tabSeletect, handleOnClickTab, isFetchingProduct,} =
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
    <DirLogRecoleccioneStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Recolecciones <span>( Total {totalResults})</span>
          </h4>
        </div>

        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />

            <input
              value={keyword}
              onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por recoleccion"
            />

            {keyword.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>

          <LogisticsFilters
            filters={filtersRecolecion}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
          />

          <IconButton onClick={() => refetchData()}>
            <UpdateSharp />
          </IconButton>
        </div>
      </div>
      <ActiveFiltersRecolecion
        activeFilters={activeFilters}
        handleOnChangeFilter={handleOnChangeFilter}
        setActiveFilters={setActiveFilters}
      />

      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {isOpenPreview && (
              <ListRecolecion
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
                  mainColumn={"Fecha"}
                  onRowClick={item => handleOnClickRow(item)}
                  typeTable="border"
                  heads={tableData.heads}
                  data={tableData.data}
                  actions={tableData.actions}
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
                <RecolecionDetails
                  isFetchingData={isFetchingProduct}
                  tabSeletect={tabSeletect}
                  handleOnClickTab={handleOnClickTab}
                  productInventorySelected={productInventorySelected}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  pickupsSelect={pickupsSelect}
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
    </DirLogRecoleccioneStyled>
  );
}

export default AdminLogRecolecciones;
