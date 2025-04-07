import { useEffect, useState } from "react";

export default function useFiltersActividades(filtersActividades) {
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    console.log("activeFilters actualizado:", activeFilters);
  }, [activeFilters]);

  const handleOnChangeFilter = (option, filterSelected) => {
    // ** Crea un nuevo objeto de filtro */
    let newFilter = {
      name: filterSelected.value == "typesentries" ? option.typesentry : option.name ,
      parent: filterSelected.value,
      value: option.id,
      option: option,
      valuedb: filterSelected.valuedb,
      finalValueName: filterSelected.value == "typesentries" ? option.typesentry : option.name,
    };
    console.log("filterSelected", filterSelected);
    console.log("option:", option);
    console.log("newFilter", newFilter);

    //** se verifica si el filtro existe */
    let existFilter = activeFilters.find(item => item.parent === filterSelected.value);

    //** si no existe el filtro, añadir */
    if (!existFilter) {
      setActiveFilters([...activeFilters, newFilter]);
      return;
    }

    //** si existe el filtro, actualizar */
    let newActiveFilters = activeFilters.map(item => {
      if (item.parent === filterSelected.value) {
        return newFilter;
      }
      return item;
    });
    setActiveFilters(newActiveFilters);
  };
  return {
    activeFilters,
    setActiveFilters,
    handleOnChangeFilter,
    filters: filtersActividades,
  };
};