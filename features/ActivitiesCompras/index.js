import React, { useEffect, useState } from "react";
import { Grid, IconButton } from "@material-ui/core";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import { ActiviesCompras } from "./styled";
import { Close, Search, Cached } from "@material-ui/icons";
import ActiveFilters from "./components/ActiveFilters";
import useActividadesCompras from "./hooks/useSeguimientoAutomatico";
import useFiltersActividades from "./hooks/useFilters";
import Filters from "./components/Filters";
import { actividadesFilters } from "./service/data";

export default function ActivitiesCompras(role) {
  // Filtros activos y su gestión
  const { activeFilters, setActiveFilters, handleOnChangeFilter } = useFiltersActividades(actividadesFilters);

  // Datos de actividades de compras y paginación
  const {
    actividades,
    totalActividades,
    isFetchingData,
    handlePage,
    page,
    limit,
    heads,
    keyword,
    handleOnChangeKeyWord,
    deleteKeyWord,
    refetchData,
    handleOnClickRow,
  } = useActividadesCompras(activeFilters,role);

  return (
    <ActiviesCompras>
      <Grid>
        {/* Cabecera */}
        <div className="header">
          <div className="header__title">
            <h4>
              Actividades <span>( Total {totalActividades} )</span>
            </h4>
          </div>


          <div className="header__filters">
            <div className="inputContainer">
              <Search className="inputContainer__icon" />
              <input
                value={keyword}
                onChange={e => handleOnChangeKeyWord(e)}
                className="inputContainer__input"
                placeholder="Buscar por"
              />
              {keyword.length > 3 && (
                <IconButton className="inputContainer__clean" onClick={deleteKeyWord}>
                  <Close />
                </IconButton>
              )}
            </div>
          </div>

          <Filters
            filters={actividadesFilters}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
          />

 
          <IconButton onClick={() => refetchData()}>
            <Cached />
          </IconButton>
        </div> 
        <ActiveFilters
                  activeFilters={activeFilters}
                  handleOnChangeFilter={handleOnChangeFilter}
                  setActiveFilters={setActiveFilters}
                />
          <div className="table-container">
            <TableLimenkaGeneral
              typeTable="border"
              custom={false}
              selectmultiple={false}
              data={actividades}
              isLoading={isFetchingData}
              customColumns={actividades.customColumns}
              heads={heads}
              onRowClick={handleOnClickRow}
              paginationData={{
                handlePage,
                page,
                limit,
                total: totalActividades,
              }}
            />
          </div>
      </Grid>
    </ActiviesCompras>
  );
}
