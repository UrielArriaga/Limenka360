import { useState } from "react";

function useFiltersProduct() {
  const [optionsFilterSelected, setOptionsFilterSelected] = useState([]);
  const handleOnChangeFilter = (option, typeFilter) => {
    let newfilter = {
      name: option[typeFilter.getLabel],
      parent: typeFilter.value,
      value: option[typeFilter.getValue],
      option: option,
      finalValueName: option[typeFilter.getLabel],
      valuedb: typeFilter.valuedb,
      label: typeFilter.label
    };
    setOptionsFilterSelected([...optionsFilterSelected?.filter(item => item.parent != typeFilter.value), newfilter]);
  };
  
  const handleDeleteFilter = (filter) => {
    setOptionsFilterSelected([...optionsFilterSelected?.filter(item => item.parent != filter.parent)]);
  }

  return {
    handleOnChangeFilter,
    optionsFilterSelected,
    handleDeleteFilter,
  };
}

export default useFiltersProduct;
