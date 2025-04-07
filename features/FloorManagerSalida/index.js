import React from "react";
import LogisticsFilters from "../../components/LogisticsFilters";
import { filtersOrders } from "./data";
import useLogisticsFilters from "../../hooks/useLogisticsFilters";
import { FloorManagerExitsStyled } from "./styles";
import { Cached, Close, Search } from "@material-ui/icons";
import { Fade, Grid, IconButton } from "@material-ui/core";

import ListExits from "./components/ListExits";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import PreviewOutPut from "./components/PreviewOutPut";
import useFloorManagerSalida from "./hooks/useFloorManagerSalida";
import useFloorManagerSalidas from "./hooks/useFloorManagerSalidas";

export default function FloorManagerSalida() {
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
  } = useFloorManagerSalidas();

  const { exitSelectedData, isFetchingOrder, productsExit, isFechingProduct, totalProductsExits } =
    useFloorManagerSalida(exitSelected);

  return (
    <FloorManagerExitsStyled>
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

          {/* <LogisticsFilters /> */}

          <IconButton onClick={() => refetchData()}>
            <Cached />
          </IconButton>
        </div>
      </div>
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
                  isSelectable={false}
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
    </FloorManagerExitsStyled>
  );
}
