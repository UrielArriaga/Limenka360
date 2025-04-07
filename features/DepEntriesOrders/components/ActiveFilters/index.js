import React from "react";
import ReactSelect from "react-select";
import { ContainerActiveFilters, selectStyleActive } from "./styles";
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
};