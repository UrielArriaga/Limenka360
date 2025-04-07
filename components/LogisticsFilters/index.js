import { Button, Grow, IconButton } from "@material-ui/core";
import { Close, FilterList } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
// import styled from "styled-components";
import {FiltersStyled, selectStyle, selectStylePArent} from "./styles";

import useGlobalCommons from "../../hooks/useGlobalCommons";
import { commonSelector } from "../../redux/slices/commonSlice";
import DatePicker from "../UI/DatePicker";

// * Tipos de filtros que se pueden agregar
/*   Por catalogo y por custom 
  Por catalogo:
  Todo catalogo que se encuentra en commonSlice 
  donde label es lo que se muestra en el select y value es el valor 
  que se envia al backend con ayuda del hook useGlobalCommons getCatalogBy
  Por custom:
  Se puede agregar un filtro custom agregandole al objecto 
  la propieda custom:true y customOptions que es un array de objetos
  donde id: es tu valor que utilizaras para armar tu query y 
  name: es lo que se muestra en el select
  label: es lo que se muestra en el select  */

export default function LogisticsFilters({ filters = [], handleOnChangeFilter }) {
  const { getCatalogBy } = useGlobalCommons();
  const commonValues = useSelector(commonSelector);
  const [isShowFilters, setShowFilters] = useState(false);
  const [filterParentSelected, setFilterParentSelected] = useState(null);
  const [filterChildSelected, setFilterChildSelected] = useState(null);
  //Date Picker
  const [anchorEl, setAnchorEl] = useState(null);
  const refButton = useRef(null);
  const handleOnChangeParentFilter = optionParent => {

    // * Select de filtro padre para motrar opciones hijas en el segundo select
    if (optionParent == null) {
      setShowFilters(false);
      setFilterParentSelected(null);
      return;
    }
    setFilterParentSelected(optionParent);
  };
 
  const handleLocalOnChangeFilter = (option, filterParentSelected) => {

    if(option.name === "Rango de Fechas"){
      setFilterChildSelected(option);
      setAnchorEl(refButton.current);
    } else {
      handleOnChangeFilter(option, filterParentSelected);
      setShowFilters(false);
      setFilterParentSelected(null);
    }
    return;
  };

  return (
    <FiltersStyled >
      <Button className="btnFilter" onClick={() => setShowFilters(!isShowFilters)}>
        {isShowFilters ? <><Close className="icon" /> Cerrar </>  : <><FilterList className="icon" /> Filtrar</>  }
      </Button>

      <Grow in={isShowFilters}>
        <div className={`hidecontent ${isShowFilters && "showcontent"}`}>
          <ReactSelect
            options={filters}
            className="reactSelect"
            placeholder="Selecciona un filtro"
            noOptionsMessage={() => "Sin Opciones"}
            onChange={option => handleOnChangeParentFilter(option)}
            isClearable
            styles={selectStylePArent}
          />

          <div
            className="fake"
            style={{
              position: "relative",
            }}
          >
            {filterParentSelected && (
              <ReactSelect
                className="reactSelect"
                placeholder={"Selecciona una opcion"}
                onMenuOpen={() => getCatalogBy(filterParentSelected?.value)}
                options={
                  filterParentSelected?.custom
                    ? filterParentSelected.customOptions
                    : commonValues[filterParentSelected.value]?.results
                }
                isLoading={filterParentSelected?.custom ? false : commonValues[filterParentSelected.value]?.isFetching}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => {
                  if (filterParentSelected?.value === "providers") {
                    return option["companyname"];
                  } else if(filterParentSelected?.value === "transportunits") {
                    return option["brand"];
                  } else {
                    return option["name"];
                  }
                }}
                styles={selectStyle}
                onChange={option => handleLocalOnChangeFilter(option, filterParentSelected)}
              />
            )}

            {filterChildSelected && (
              <DatePicker
                handleRangeSelected={dates => {
                  console.log(dates);
                  let valuesDatesRange = dates;

                  handleOnChangeFilter(
                    {
                      id: "range",
                      name: "Rango de Fechas",
                      value: valuesDatesRange,
                    },
                    filterParentSelected
                  );

                  setShowFilters(false);
                  setFilterParentSelected(null);
                }}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
              />
            )}

            <button
              ref={refButton}
              style={{
                position: "absolute",
                top: 20,
                right: 30,
                zIndex: -1,
                visibility: "hidden",
              }}
            >
              click me
            </button>
          </div>
        </div>
      </Grow>
    </FiltersStyled>
  );
};