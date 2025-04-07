import React from "react";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import { Close } from "@material-ui/icons";
import { ContainerActiveFiltersRecolecion } from "./styles";
export default function ActiveFiltersBio({ activeFilters, handleOnChangeFilter, setActiveFilters }) {
  const { getCatalogBy } = useGlobalCommons();
  const commonValues = useSelector(commonSelector);

  if (activeFilters.length === 0) {
    return null;
  }
  return (
    <ContainerActiveFiltersRecolecion>
      <p
        className="textfiltersactive"
        onClick={() => {
          console.log(activeFilters);
        }}
      >
        Filtrado por:
      </p>

      {activeFilters.map((filterActive, index) => {
        return (
          <div
            className="chipselected"
            onClick={() => {
              let newActiveFilters = activeFilters.filter(item => item.value !== filterActive.value);
              setActiveFilters(newActiveFilters);
            }}
          >
            <p className="chipselected__text">{filterActive?.name}</p>

            <Close className="chipselected__icon" />
          </div>
        );
      })}
      {/* {activeFilters.map((item, index) => {
        return (
          <ReactSelect
            onMenuOpen={() => getCatalogBy(item.parent)}
            // options={commonValues[item.parent]?.results}
            // isLoading={commonValues[item.parent]?.isFetching}
            key={index}
            className="reactSelect"
            defaultValue={item}
            getOptionValue={option => `${option["id"]}`}
            getOptionLabel={option => option["name"]}
            options={commonValues[item.parent]?.results}
            styles={selectStyleActive}
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
      })} */}
    </ContainerActiveFiltersRecolecion>
  );
}

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
    marginTop: 10,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    zIndex: 10,
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
