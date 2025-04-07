import React from "react";
import { AdminAlmacenSalidasStyled } from "./styles";
import { Cached, Close, Search } from "@material-ui/icons";
import { Fade, Grid, IconButton } from "@material-ui/core";
import LogisticsFilters from "../../components/LogisticsFilters";
import ListExits from "./components/ListExits";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import PreviewOutPut from "./components/PreviewOutPut";
import useAdminAlmacenSalida from "./hooks/useAdminAlmacenSalida";
import useAdminAlmacenSalidas from "./hooks/useAdminAlmacenSalidas";
import { filtersData } from "./data";
import useFilters from "./hooks/useFilters";
import ActiveFilters from "./components/ActiveFilters";

export default function AdminAlmacenSalidas() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filtersData); 
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
    refetch
  } = useAdminAlmacenSalidas(activeFilters);

  const { exitSelectedData, isFetchingOrder, productsExit, isFechingProduct, totalProductsExits } =
    useAdminAlmacenSalida(exitSelected);
  return (
    <AdminAlmacenSalidasStyled>
      <div className="header">
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

          <LogisticsFilters filters={filters} handleOnChangeFilter={handleOnChangeFilter}/>

          <IconButton onClick={() => refetch()}>
            <Cached />
          </IconButton>
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
    </AdminAlmacenSalidasStyled>
  );
}
