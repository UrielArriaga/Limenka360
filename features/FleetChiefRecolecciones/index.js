import React from "react";
import { FleetChiefRecoleccionesStyled } from "./styles";
import DataFilter from "./data";
import useFilters from "./hooks/useFilters";
import useFleetChiefRecolecciones from "./hooks/useFleetChiefRecolecciones";
import useFleetChiefInventarioProduct from "./hooks/useFleetChiefInventarioProduct";
import useFleetChiefEntrance from "./hooks/useFleetChiefEntrance";
import useFleetChiefOutputs from "./hooks/useFleetChiefOutputs";
import { Close, Search, UpdateSharp } from "@material-ui/icons";
import { Fade, Grid, IconButton } from "@material-ui/core";
import LogisticsFilters from "../../components/LogisticsFilters";
import ActiveFilters from "./components/ActiveFilters/ActiveFilters";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ListRecolection from "./components/ListRecolection";
import PickupsDetails from "./components/PickupsDetails";

export default function FleetChiefRecolecciones(props) {
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
  } = useFleetChiefRecolecciones(activeFilters);
  const { tabSeletect, handleOnClickTab, isFetchingProduct } = useFleetChiefInventarioProduct(productInventorySelected);
  const { isFetchingEntrance, dataEntrance, paginationDataEntrance, totalEntrance } = useFleetChiefEntrance(
    productInventorySelected,
    tabSeletect
  );
  const { isFetchingExit, dataOutputs, paginationDataOutput, totalOutputs } = useFleetChiefOutputs(
    productInventorySelected,
    tabSeletect
  );
  return (
    <FleetChiefRecoleccionesStyled>
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

      <ActiveFilters
        activeFilters={activeFilters}
        handleOnChangeFilter={handleOnChangeFilter}
        setActiveFilters={setActiveFilters}
      />

      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {isOpenPreview && (
              <ListRecolection
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
                <PickupsDetails
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
    </FleetChiefRecoleccionesStyled>
  );
}
