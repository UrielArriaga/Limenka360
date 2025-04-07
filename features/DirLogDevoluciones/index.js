import React from "react";
import { DirLogRutasStyled } from "./styles";
import { Fade, Grid, IconButton, Badge } from "@material-ui/core";
import { Close, Search, Cached } from "@material-ui/icons";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import LogisticsFilters from "../../components/LogisticsFilters";
import Filters from "./components/Filters";
import useFilters from "./hooks/useFilters";
import useDirLogRutas from "./hooks/useDirLogRutas";
import ActiveFiltersRutas from "./components/ActiveFilters/ActiveFilters";
import useDirLogRouteTab from "./hooks/useDirLogRouteTab";
import ListRutas from "./components/ListRutas";
 import RutasDetails from "../DepEntriesOrdersDevoluciones/components/RutasDetails";
import { filterRoutes } from "./data";

function DirLogDevoluciones() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filterRoutes);
  const {
    refetchData,
    paginationData,
    isOpenPreview,
    handleOnClickClosePreview,
    orderBy,
    setOrderBy,
    handleOnChangeKeyWord,
    keyword,
    deleteKeyWord,
    // routes
    routeSelected,
    handleOnClickRowRoutes,
    tableDataRoutes,
    dataEntrance,
    isFetchingEntrance
  } = useDirLogRutas(activeFilters);

  const { tabSeletect, handleOnClickTab } = useDirLogRouteTab();

  return (
    <DirLogRutasStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Devoluciones <span>( Total {tableDataRoutes?.allData?.count})</span>
          </h4>
        </div>

            <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              value={keyword}
              onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por ejecutivo"
            />

            {keyword.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>
            <Filters
            filters={filters}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
            />
          <IconButton className="icon" onClick={() => refetchData()}>
             <Badge
                overlap="rectangular"
                color="primary"
                        >
                <Cached />
                </Badge>
          </IconButton>
          </div>
      </div>
      <ActiveFiltersRutas
        activeFilters={activeFilters}
        handleOnChangeFilter={handleOnChangeFilter}
        setActiveFilters={setActiveFilters}
      />

      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {isOpenPreview && (
              <ListRutas
                data={tableDataRoutes?.data}
                onRowClick={item => handleOnClickRowRoutes(item)}
                isFetchingData={tableDataRoutes?.allData?.isfetching}
                rowsLoader={tableDataRoutes?.allData?.count >= 20 ? 20 : tableDataRoutes?.allData?.count}
                paginationData={{
                  ...paginationData,
                  total: tableDataRoutes?.allData?.count,
                }}
              />
            )}

            {!isOpenPreview && (
              <div className="table">
                <TableLimenkaGeneral
                  // actions={[
                  //   {
                  //     icon: `ver ruta`,
                  //     tooltip: "Ver detalles",
                  //     action: rowData => {
                  //       handleOnClickRowRoutes(rowData);
                  //     },
                  //   },
                  // ]}
                  onRowClick={item => handleOnClickRowRoutes(item)}
                  // mainColumn={"Unidad"}
                  typeTable="border"
                  heads={tableDataRoutes.heads}
                  data={tableDataRoutes.data}
                  customColumns={tableDataRoutes.customColumns}
                  rowsLoader={tableDataRoutes?.allData?.count >= 20 ? 20 : tableDataRoutes?.allData?.count}
                  setOrderBy={setOrderBy}
                  isLoading={tableDataRoutes?.allData?.isfetching}
                  orderBy={orderBy}
                  paginationData={{
                    ...paginationData,
                    total: tableDataRoutes,
                  }}
                />
              </div>
            )}
          </Grid>

          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9} className="preview">
                <RutasDetails
              handleOnClickClosePreview={handleOnClickClosePreview}
              routeSelected={routeSelected}
              dataEntrance={dataEntrance}
              isFetchingEntrance={isFetchingEntrance}              
                               />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
    </DirLogRutasStyled>
  );
}

export default DirLogDevoluciones;
