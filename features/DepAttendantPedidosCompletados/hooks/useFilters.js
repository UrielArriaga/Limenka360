import React from "react";
import { useState } from "react";

export default function useFilters() {
  const [activeFilters, setActiveFilters] = useState([]);

  const handleOnChangeFilter = (option, filterSelected) => {
    console.log(option);

    console.log(filterSelected);

    console.log(option);

    let newfilter = {
      name: filterSelected.label,
      parent: filterSelected.value,
      value: option.id,
      option: option,
      finalValueName: option.name,
      valuedb: filterSelected.valuedb,
    };

    console.log(newfilter);

    let existFilter = activeFilters.find(item => item.value === filterSelected.value);

    if (existFilter) {
      let newActiveFilters = activeFilters.map(item => {
        if (item.value === filterSelected.value) {
          return newfilter;
        }
        return item;
      });

      setActiveFilters(newActiveFilters);
    } else {
      console.log("en neg");
      setActiveFilters([...activeFilters, newfilter]);
    }
  };
  return {
    activeFilters,
    setActiveFilters,
    handleOnChangeFilter,
  };
}
