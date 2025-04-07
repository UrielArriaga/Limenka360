import React from "react";
import ReactSelect from "react-select";
import styled from "styled-components";
export default function ActiveFilters({ activeFilters, handleOnChangeFilter, setActiveFilters }) {
  return (
    <ContainerActiveFilters>
      {activeFilters.map((item, index) => {
        return (
          <ReactSelect
            key={index}
            className="reactSelect"
            defaultValue={item}
            getOptionValue={option => `${option["id"]}`}
            getOptionLabel={option => option["name"]}
            // options={commonValues[item.parent]?.results}
            // isLoading={commonValues[item.parent]?.isFetching}
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
      })}
    </ContainerActiveFilters>
  );
}

const ContainerActiveFilters = styled.div`
  display: flex;
  padding: 0px 10px;
  margin-bottom: 20px;

  .reactSelect {
    width: 200px;
    margin-right: 10px;
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
