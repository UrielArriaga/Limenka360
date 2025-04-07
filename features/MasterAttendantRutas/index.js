import React from "react";
import { DirLogRutasStyled } from "./styles";
import { Fade, Grid, IconButton } from "@material-ui/core";
import { Close, Search, UpdateSharp } from "@material-ui/icons";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import LogisticsFilters from "../../components/LogisticsFilters";
import useFilters from "./hooks/useFilters";
import useDeliveryRoutes from "./hooks/useDeliveryRoutes";
import { filtersRutas } from "./data";
import ActiveFiltersRutas from "./components/ActiveFilters/ActiveFilters";
import ListRutas from "./components/ListRutas";
import RutasDetails from "./components/RutasDetails";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";
import TrackingsRoutes from "./components/TrackingsRoutes";
import useDepAttendantRoutesFiles from "./hooks/useDepAttendantRoutesFiles";
import useDepAttendantRoutesTrackings from "./hooks/useDepAttendantRoutesTrackings";

function MasterAttendantRutas() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter } = useFilters();
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
    handleOnClickSaveDelivery,
    tabSeletect,
    handleOnClickTab,
    orderSelectedData,
    routeData,
  } = useDeliveryRoutes(activeFilters);

  const { actionsFiles, statesFiles, openFiles, handleToggleFiles, paginationFiles } = useDepAttendantRoutesFiles(
    orderSelectedData?.data
  );
  const {
    openTrackings,
    toggleTrackingsModal,
    trackingData,
    reloadTrackings,
    isFetching,
    page,
    setPage,
    limit,
    orderByTracking,
    setOrderByTracking,
  } = useDepAttendantRoutesTrackings(orderSelectedData?.data);
  return (
    <DirLogRutasStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Rutas <span>( Total {tableDataRoutes?.allData?.count})</span>
          </h4>
        </div>

        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />

            <input
              value={keyword}
              onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por rutas"
            />

            {keyword.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>
          {/* Falta el componente de filtros de rutas */}
          <LogisticsFilters
            filters={filtersRutas}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
          />

          <IconButton onClick={() => refetchData()}>
            <UpdateSharp />
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
                  actions={[
                    {
                      icon: `ver ruta`,
                      tooltip: "Ver detalles",
                      action: rowData => {
                        handleOnClickRowRoutes(rowData);
                      },
                    },
                  ]}
                  mainColumn={"Unidad"}
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
                    total: tableDataRoutes?.allData?.count,
                  }}
                />
              </div>
            )}
          </Grid>

          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9} className="preview">
                <RutasDetails
                  tabSeletect={tabSeletect}
                  handleOnClickTab={handleOnClickTab}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  routeSelected={routeSelected}
                  handleOnClickSaveDelivery={handleOnClickSaveDelivery}
                  handleToggleFiles={handleToggleFiles}
                  toggleTrackingsModal={toggleTrackingsModal}
                  dataDelivery={routeData}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
      <TrackingsRoutes
        open={openTrackings}
        toggleTrackingsModal={toggleTrackingsModal}
        trackingData={trackingData}
        reloadTrackings={reloadTrackings}
        isFetching={isFetching}
        orderSelectedData={orderSelectedData?.data}
        page={page}
        setPage={setPage}
        limit={limit}
        orderBy={orderByTracking}
        setOrderBy={setOrderByTracking}
      />
      <FilesUpload
        idOrder={orderSelectedData?.data?.id}
        open={openFiles}
        handletoogle={handleToggleFiles}
        orderData={orderSelectedData?.data}
        statesFiles={statesFiles}
        actionsFiles={actionsFiles}
        paginationFiles={paginationFiles}
      />
    </DirLogRutasStyled>
  );
}

export default MasterAttendantRutas;
