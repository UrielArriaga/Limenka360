import { Button, Fade, Grid, IconButton } from "@material-ui/core";
import { Cached, Close, Search } from "@material-ui/icons";
import React from "react";
import LogisticsFilters from "../../components/LogisticsFilters";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ListExits from "./components/ListExits";
import PreviewOutPut from "./components/PreviewOutPut";
import useDirLogSalida from "./hooks/useDirLogSalida";
import useDirLogSalidas from "./hooks/useDirLogSalidas";
import { DirLogSalidasStyled } from "./styles";
import { useRouter } from "next/router";
import { filtersInventoryExit } from "./data";
import useFilters from "./hooks/useFiltersInventoryExit";
import ActiveFilters from "./components/ActiveFilters";

export default function DirLogSalidas() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filtersInventoryExit);
  const router = useRouter();
  const {
    exitSelected,
    totalExits,
    isFetchingData,
    isOpenPreview,
    paginationData,
    tableData,
    keyword,
    orderBy,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    deleteKeyWord,
    setOrderBy,
    refetchData,
  } = useDirLogSalidas(activeFilters);

  const { exitSelectedData, isFetchingOrder, productsExit, isFechingProduct, totalProductsExits } =
    useDirLogSalida(exitSelected);

  return (
    <DirLogSalidasStyled>
      <div className="header">
        <div className="header__leftside">
          <div className="header__title">
            <h4>
              Salidas <span>({totalExits})</span>
            </h4>
          </div>

          <div className="header__filters">
            <div className="inputContainer">
              <Search className="inputContainer__icon" />

              <input
                value={keyword}
                onChange={e => handleOnChangeKeyWord(e)}
                className="inputContainer__input"
                placeholder="Buscar por folio"
              />
              {keyword.length > 3 && (
                <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                  <Close />
                </IconButton>
              )}
            </div>

            <LogisticsFilters filters={filters} handleOnChangeFilter={handleOnChangeFilter} />

            <IconButton onClick={() => refetchData()}>
              <Cached />
            </IconButton>
          </div>
        </div>
        <div className="header__btn">
          <Button
            className="btnEntry"
            onClick={() =>
              router.push({
                pathname: `./salidas/nueva`,
              })
            }
          >
            Generar Salida Manual
          </Button>
        </div>
      </div>

      <ActiveFilters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {isOpenPreview && (
              <ListExits
                exitSelected={exitSelected}
                data={tableData.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={totalExits >= 20 ? 20 : totalExits}
                isLoading={isFetchingData}
                setOrderBy={setOrderBy}
                orderBy={orderBy}
                paginationData={{
                  ...paginationData,
                  total: totalExits,
                }}
              />
            )}
            {!isOpenPreview && (
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  isSelectable={true}
                  mainColumn={"Fecha"}
                  heads={tableData.heads}
                  data={tableData.data}
                  actions={tableData.actions}
                  customColumns={tableData.customColumns}
                  typeTable="border"
                  isLoading={isFetchingData}
                  rowsLoader={totalExits >= 20 ? 20 : totalExits}
                  paginationData={{
                    ...paginationData,
                    total: totalExits,
                  }}
                />
              </div>
            )}
          </Grid>
          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9}>
                <PreviewOutPut
                  isFetchingOrder={isFetchingOrder}
                  exitSelectedData={exitSelectedData}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  dataproducts={productsExit}
                  isFechingProduct={isFechingProduct}
                  totalProductsExits={totalProductsExits}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
    </DirLogSalidasStyled>
  );
}
