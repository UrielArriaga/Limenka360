import { useEffect, useState } from "react";

export default function useFilters(filtersOrders) {
  const [activeFilters, setActiveFilters] = useState([]);
  const [isLocalStorageReady, setIsLocalStorageReady] = useState(false);

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

    let existFilter = activeFilters.find(item => item.parent === filterSelected.value);

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

    console.log(newActiveFilters);
    // localStorage.setItem("admlocal001", JSON.stringify(newActiveFilters));
  };
  return {
    activeFilters,
    setActiveFilters,
    handleOnChangeFilter,
    filters: filtersOrders,
  };
}
