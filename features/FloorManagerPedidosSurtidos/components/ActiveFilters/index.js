import React from "react";
import styled from "styled-components";
import { Close } from "@material-ui/icons";
export default function ActiveFilters({ activeFilters, handleOnChangeFilter, setActiveFilters }) {
  if (activeFilters.length === 0) {
    return null;
  }
  return (
    <ContainerActiveFilters>
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
          <div key={index}
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
    </ContainerActiveFilters>
  );
}

const ContainerActiveFilters = styled.div`
  display: flex;
  padding: 0px 10px;
  margin-bottom: 20px;
  z-index: 1000000000000 !important;

  .reactSelect {
    width: 200px;
    margin-right: 10px;
  }

  .textfiltersactive {
    font-size: 12px;
    margin-right: 10px;
    color: #034d6f;
    font-weight: bold;
  }

  .chipselected {
    background-color: #039be5;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 10px;
    display: flex;
    align-items: center;

    .chipselected__text {
      margin-right: 5px;
      font-size: 12px;
    }

    .chipselected__icon {
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    }
  }
`;

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
