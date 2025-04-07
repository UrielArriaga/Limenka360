import React from "react";
import { DirLogRutasStyled } from "./styles";
import { Fade, Grid, IconButton, Badge } from "@material-ui/core";
import { Close, Search, UpdateSharp, Cached } from "@material-ui/icons";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import LogisticsFilters from "../../components/LogisticsFilters";
import useFilters from "./hooks/useFilters";
import useDirLogRutas from "./hooks/useDirLogRutas";
import ListRutas from "./components/ListRutas";
import RutasDetails from "./components/RutasDetails";
import { filterRoutes } from "./data";
import useDirLogEntrance from "./hooks/useDirLogEntrance";
import Filters from "./components/Filters";
import { entriesFilters } from "./data";
import useFiltersEntries from "./hooks/useFilters";
import ActiveFilters from "./components/ActiveFilters";

function AdminDepDevoluciones() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter, } = useFiltersEntries(entriesFilters);
  
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
    data,
    tableDataRoutes,
    totalRoutes,  
  } = useDirLogRutas(activeFilters);

  const {dataEntrance, isFetchingEntrance,paginationDataEntrance } = useDirLogEntrance(routeSelected);

  return (
    <DirLogRutasStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Devoluciones <span>( Total {totalRoutes})</span> 
          </h4>
        </div>
     
        <div className="header__filters">
          <IconButton onClick={() => refetchData()}>
             <Cached />
          </IconButton>

          <Filters 
             filters={entriesFilters}
             activeFilters={activeFilters}
             setActiveFilters={setActiveFilters}
             handleOnChangeFilter={handleOnChangeFilter}
           />
        </div>
        <ActiveFilters 
           activeFilters={activeFilters}
           handleOnChangeFilter={handleOnChangeFilter}
           setActiveFilters={setActiveFilters}
         />
      </div>
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
                  onRowClick={item => handleOnClickRowRoutes(item)}
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
                    total: totalRoutes,
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
                   paginationData={paginationDataEntrance}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
    </DirLogRutasStyled>
  );
}

export default AdminDepDevoluciones;
