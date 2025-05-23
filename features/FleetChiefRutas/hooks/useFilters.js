import { useState } from "react";

export default function useFilters(filterRoutes) {
  const [activeFilters, setActiveFilters] = useState([]);

  const handleOnChangeFilter = (option, filterSelected) => {
    // TODO - 1 CREA NUEVO OBJETO DE FILTRO
    let newfilter = {
      name: option.name || option.brand,
      parent: filterSelected.value,
      value: option.id,
      option: option,
      finalValueName: option.name || option.brand,
      valuedb: filterSelected.valuedb,
    };

    console.log(filterSelected);
    console.log(option);

    console.log(newfilter);

    // TODO - 2 VERIFICA SI EL FILTRO YA EXISTE EN EL ARRAY DE FILTROS

    let existFilter = activeFilters.find(item => item.parent === filterSelected.value);

    console.log(existFilter);

    // TODO - 3 SI NO  EXISTE EL FILTRO, AÑADIR

    if (!existFilter) {
      setActiveFilters([...activeFilters, newfilter]);
      return;
    }

    // TODO - 4 SI EXISTE EL FILTRO, ACTUALIZAR

    let newActiveFilters = activeFilters.map(item => {
      if (item.parent === filterSelected.value) {
        return newfilter;
      }
      return item;
    });

    setActiveFilters(newActiveFilters);
  };
  return {
    activeFilters,
    setActiveFilters,
    handleOnChangeFilter,
    filters: filterRoutes,
  };
}
