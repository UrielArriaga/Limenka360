import { Fade, Grow, IconButton } from "@material-ui/core";
import { Close, FilterList } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import ReactSelect from "react-select";
import styled from "styled-components";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";

{
  /* <div className="filtersection__order">
          <p>Ordenar por:</p>

          <select name="order" id="order">
            <option value="1">Más reciente</option>
            <option value="2">Más antiguo</option>
          </select>

          <select name="order" id="order">
            <option value="1">Más reciente</option>
            <option value="2">Más antiguo</option>
          </select>
        </div> */
}

export default function Filters({ activeFilters = [], setActiveFilters = () => {}, handleOnChangeFilter = () => {} }) {
  const { getCatalogBy } = useGlobalCommons();
  const commonValues = useSelector(commonSelector);
  const [isShowFilters, setShowFilters] = useState(false);

  const [filterSelected, setFilterSelected] = useState(null);

  const handleOnChangeParentFilter = option => {
    console.log(option);

    if (option == null) {
      setShowFilters(false);
      setFilterSelected(null);
    }
    setFilterSelected(option);
  };

  const handleLocalOnChangeFilter = (option, filterSelected) => {
    handleOnChangeFilter(option, filterSelected);
    setShowFilters(false);
    setFilterSelected(null);
  };

  // const handleOnChangeFilter = option => {
  //   console.log(option);

  //   let newfilter = {
  //     name: filterSelected.label,
  //     parent: filterSelected.value,
  //     value: option.id,
  //     option: option,
  //     finalValueName: option.name,
  //   };

  //   console.log(newfilter);

  //   let existFilter = activeFilters.find(item => item.value === filterSelected.value);

  //   if (existFilter) {
  //     let newActiveFilters = activeFilters.map(item => {
  //       if (item.value === filterSelected.value) {
  //         return newfilter;
  //       }
  //       return item;
  //     });

  //     setActiveFilters(newActiveFilters);
  //   } else {
  //     console.log("en neg");
  //     setActiveFilters([...activeFilters, newfilter]);
  //   }

  //   setShowFilters(false);
  //   setFilterSelected(null);
  // };

  const [filters, setFilters] = useState([
    {
      label: "Categoria",
      value: "categories",
      valuedb: "categoryId",
    },
    // {
    //   label: "Estatus",
    //   value: "warehouses",
    //   valuedb: "warehousesstatusId",
    // },
    // {
    //   label: "Factura",
    //   value: "billing",
    //   type: "boolean",
    //   custom: true,
    //   customOptions: [
    //     {
    //       id: "Sin Factura",
    //       name: "Sin Factura",
    //     },
    //     {
    //       id: "Con Factura",
    //       name: "Con Factura",
    //     },
    //   ],
    // },

    // {
    //   label: "Ejecutivo",
    //   value: "users",
    // },
    // {
    //   label: "Estado",
    // },
    // {
    //   label: "Cuenta de Pago",
    //   value: "paymentsacount",
    //   valuedb: "paymentaccountId",
    // },
  ]);

  // const [activeFilters, setActiveFilters] = useState([]);

  return (
    <FiltersStyled>
      {/*
       */}

      {/* <p
        onClick={() => {
          console.log(activeFilters);
        }}
      >
        click me
      </p> */}
      <IconButton className="btnFilter" onClick={() => setShowFilters(!isShowFilters)}>
        {isShowFilters ? <Close className="icon" /> : <FilterList className="icon" />}
      </IconButton>

      {/* {isShowFilters && ( */}
      <Grow in={isShowFilters}>
        <div className={`hidecontent ${isShowFilters && "showcontent"}`}>
          <ReactSelect
            options={filters}
            className="reactSelect"
            placeholder="Selecciona un filtro"
            noOptionsMessage={() => "Sin Opciones"}
            onChange={option => handleOnChangeParentFilter(option)}
            isClearable
            // styles={selectStyle}
            // options={countries}
            // onChange={option => handleFilterSelect("nationality", option)}
            // getOptionLabel={option => option.name}
            // getOptionValue={option => option.name}
            styles={selectStylePArent}
          />

          {filterSelected && (
            <ReactSelect
              className="reactSelect"
              placeholder={"Selecciona una opcion"}
              onMenuOpen={() => getCatalogBy(filterSelected?.value)}
              options={
                filterSelected?.custom ? filterSelected.customOptions : commonValues[filterSelected.value]?.results
              }
              isLoading={filterSelected?.custom ? false : commonValues[filterSelected.value]?.isFetching}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => option["name"]}
              styles={selectStyle}
              onChange={option => handleLocalOnChangeFilter(option, filterSelected)}
            />
          )}
        </div>
      </Grow>
      {/* )} */}

      {activeFilters.length > 0 && (
        <>
          {activeFilters.map((item, index) => {
            return (
              <ReactSelect
                key={index}
                className="reactSelect"
                defaultValue={item}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => option["name"]}
                options={commonValues[item.parent]?.results}
                isLoading={commonValues[item.parent]?.isFetching}
                // styles={selectStyleActive}
                isClearable
                onChange={option => {
                  if (option == null) {
                    let newActiveFilters = activeFilters.filter(item => item.value !== item.value);
                    setActiveFilters(newActiveFilters);
                  }
                  console.log(option);
                  console.log(item);
                }}
              />
            );
          })}
        </>
      )}

      {/* <div className="">
        <IconButton
          className=""
          onClick={() => {
            setShowFilters(!isShowFilters);
          }}
        >
          <FilterList className="icon" />
        </IconButton>

        {isShowFilters && (
          <>
            <p>asdasd</p>
          </>
        )}
      </div> */}
    </FiltersStyled>
  );
}

const styleScrollReactSelect = base => {
  return {
    ...base,
    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  };
};

export const selectStylePArent = {
  control: (base, state) => ({
    ...base,
    height: 32,
    minHeight: 32,
    fontSize: 12,
    // border: state.hasValue ? "1px solid #039BE5" : "1px solid #dcdcdc",
    boxShadow: "none",
    "&:hover": {
      border: state.hasValue ? "1px solid #10312b" : "1px solid #dcdcdc",
    },
    backgroundColor: "#f8fafc",
    // backgroundColor: state.hasValue ? " #039BE5" : " #f8fafc",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // color: "#fff",
    padding: 7,
    marginTop: -1,
    marginLeft: -8,
    fontWeight: "bold",
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
  menu: base => ({
    ...base,
    // backgroundColor: "#1e3a47",
    color: "#1e3a47",
    borderRadius: "4px",
    marginTop: 10,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  }),
  menuList: base => ({
    ...base,
    padding: 0,
    borderRadius: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#039BE5" : state.isFocused ? "#022b36" : "#1e3a47",
    color: "#fff",
    fontSize: 11,
    // padding: "10px 20px",
    cursor: "pointer",
    "&:active": {
      backgroundColor: state.isSelected ? "#0288d1" : "#022b36",
    },
  }),
};

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    height: 35,
    minHeight: 35,
    fontSize: 12,
    // border: state.hasValue ? "1px solid #10312b" : "1px solid #dcdcdc",
    boxShadow: "none",
    "&:hover": {
      border: state.hasValue ? "1px solid #10312b" : "1px solid #dcdcdc",
    },
    // backgroundColor: state.hasValue ? " #039BE5" : " #f8fafc",
    backgroundColor: "#f8fafc",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // color: "#fff",
    padding: 7,
    marginTop: -1,
    marginLeft: -8,
    fontWeight: "bold",
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
  menu: base => ({
    ...base,
    backgroundColor: "#1e3a47",
    color: "#fff",
    borderRadius: "4px",
    marginTop: 0,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  }),
  menuList: base => ({
    ...base,
    padding: 0,
    borderRadius: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#039BE5" : state.isFocused ? "#022b36" : "#1e3a47",
    color: "#fff",
    fontSize: 11,
    // padding: "10px 20px",
    cursor: "pointer",
    "&:active": {
      backgroundColor: state.isSelected ? "#0288d1" : "#022b36",
    },
  }),
};

export const selectStyleActive = {
  control: (base, state) => ({
    ...base,
    height: 35,
    minHeight: 35,
    fontSize: 12,
    // border: state.hasValue ? "1px solid #10312b" : "1px solid #dcdcdc",
    boxShadow: "none",
    "&:hover": {
      border: state.hasValue ? "1px solid #10312b" : "1px solid #dcdcdc",
    },
    backgroundColor: state.hasValue ? " #039BE5" : " #f8fafc",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#fff",
    padding: 7,
    marginTop: -1,
    marginLeft: -8,
    fontWeight: "bold",
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
  menu: base => ({
    ...base,
    backgroundColor: "#1e3a47",
    color: "#fff",
    borderRadius: "4px",
    marginTop: 0,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  }),
  menuList: base => ({
    ...base,
    padding: 0,
    borderRadius: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#039BE5" : state.isFocused ? "#022b36" : "#1e3a47",
    color: "#fff",
    fontSize: 11,
    // padding: "10px 20px",
    cursor: "pointer",
    "&:active": {
      backgroundColor: state.isSelected ? "#0288d1" : "#022b36",
    },
  }),
};

const FiltersStyled = styled.div`
  display: flex;
  /* margin-bottom: 20px; */
  align-items: center;
  z-index: 500;

  /* background-color: red; */
  padding: 2px;

  .btnFilter {
    background-color: #039be5;
    border-radius: 10%;
    padding: 8px 8px;
    margin-right: 5px;
    /* margin-right: 20px; */
    color: #fff;

    &:hover {
      background-color: #039be5;
    }

    .icon {
      font-size: 17px;
    }
  }

  .hidecontent {
    display: none;

    align-items: center;
    transition: 0.2s;
    p {
      font-size: 20px;
      font-weight: bold;
      margin-right: 20px;
    }
  }

  .showcontent {
    display: flex;
  }

  .reactSelect {
    width: 200px;
    margin-right: 10px;
    /* margin-right: 20px; */
  }
`;
