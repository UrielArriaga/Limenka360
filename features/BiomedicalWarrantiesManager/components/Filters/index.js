import { Button, Grow } from "@material-ui/core";
import { Close, FilterList } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import { FiltersStyled, selectStylePArent, selectStyle } from "./styles"
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import DatePicker from "../../../../components/UI/DatePicker";

export default function Filters({ filters = [], handleOnChangeFilter }) {
  const { getCatalogBy } = useGlobalCommons();
  const commonValues = useSelector(commonSelector);
  const [isShowFilters, setShowFilters] = useState(false);
  const [filterParentSelected, setFilterParentSelected] = useState(null);
  const [filterChildSelected, setFilterChildSelected] = useState(null);

  //Date Picker
  const [anchorEl, setAnchorEl] = useState(null);

  const refButton = useRef(null);

  const handleOnChangeParentFilter = optionParent => {
    console.log(optionParent);
    // * Select de filtro padre para motrar opciones hijas en el segundo select
    if (optionParent == null) {
      setShowFilters(false);
      setFilterParentSelected(null);
      return;
    }
    setFilterParentSelected(optionParent);
  };

  const handleLocalOnChangeFilter = (option, filterParentSelected) => {
    console.log(option);
    console.log(filterParentSelected);

    if (option.name === "Rango de Fechas") {
      setFilterChildSelected(option);
      setAnchorEl(refButton.current);
    } else {
      console.log(option);
      handleOnChangeFilter(option, filterParentSelected);
      setShowFilters(false);
      setFilterParentSelected(null);
    }
    return;
  };

  return (
    <FiltersStyled>
      {!isShowFilters && (
        <Button className="btnFilter" onClick={() => setShowFilters(!isShowFilters)} startIcon={<FilterList />}>
          Filtrar Pedidos
        </Button>
      )}

      {isShowFilters && (
        <Button
          className="btnFilter"
          onClick={() => {
            setShowFilters(false);
            setFilterParentSelected(null);
          }}
          startIcon={<Close />}
        >
          Cerrar
        </Button>
      )}

      <Grow in={isShowFilters}>
        <div className={`hidecontent ${isShowFilters && "showcontent"}`}>
          <ReactSelect
            options={filters}
            className="reactSelect"
            placeholder="Selecciona un filtro"
            noOptionsMessage={() => "Sin Opciones"}
            onChange={option => handleOnChangeParentFilter(option)}
            isClearable
            value={filterParentSelected}
            styles={selectStylePArent}
          />

          {filterChildSelected && (
            <div>
              
            </div>
          )}

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
                getOptionLabel={option => option["name"]}
                styles={selectStyle}
                onChange={option => handleLocalOnChangeFilter(option, filterParentSelected)}
              />
            )}

            {filterChildSelected && (
              <DatePicker
                handleRangeSelected={dates => {
                  console.log(dates);
                  let valuesssss = dates;

                  handleOnChangeFilter(
                    {
                      id: "range",
                      name: "Rango de Fechas",
                      value: valuesssss,
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
}