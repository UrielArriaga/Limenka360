import { useState } from "react";

export default function useFilters(filtersOrders) {
  const [activeFilters, setActiveFilters] = useState([]);

  const handleOnChangeFilter = (option, filterSelected) => {
    // TODO - 1 CREA NUEVO OBJETO DE FILTRO
    let newfilter = {
      name: filterSelected?.value == "providers" ? option.companyname : option.name,
      parent: filterSelected.value,
      value: option.id,
      option: option,
      finalValueName: option.name,
      valuedb: filterSelected.valuedb,
    };

    // TODO - 2 VERIFICA SI EL FILTRO YA EXISTE EN EL ARRAY DE FILTROS
    // TODO - 3 SI NO  EXISTE EL FILTRO, AÑADIR
    // TODO - 4 SI EXISTE EL FILTRO, ACTUALIZAR

    setActiveFilters([...activeFilters.filter(item => item.parent != filterSelected?.value), newfilter]);
  };
  return {
    activeFilters,
    setActiveFilters,
    handleOnChangeFilter,
    filters: filtersOrders,
  };
}
