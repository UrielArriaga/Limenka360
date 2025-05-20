import { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ContextFilter = createContext(null);

export const ProviderFilter = ({ children }) => {
  const [filters, setFilters] = useState([]);
  const [typeFiltersUsed, setTypeFiltersUsed] = useState([]);
  const [optionsFilterType, setOptionsFilterType] = useState([]);
  const [optionsFilterTypeSelected, setOptionsFilterTypeSelected] = useState();

  const [idFilter, setIdFilter] = useState('');
  const [storedFilters, setStoredFilters] = useLocalStorage(idFilter, []);

  const [confirmFilters, setConfirmFilters] = useState(false);
  const [hydrateFilters, setHydrateFilters] = useState(false);

  const allFiltersWereFilled = filters?.every((filter) => {
    let AllSubfiltersWereFilled = true;

    if (filter?.subfilters?.length > 0) {
      AllSubfiltersWereFilled = filter?.subfilters.every(
        (subfilter) =>
          subfilter?.logicOperator &&
          subfilter?.typeFilter &&
          subfilter?.valueSelected &&
          (!('virtualSelected' in subfilter) ||
            Boolean(subfilter?.virtualSelected)) &&
          (!('extraValueSelected' in subfilter) ||
            Boolean(
              subfilter?.extraValueSelected?.from &&
                subfilter?.extraValueSelected?.to
            ))
      );
    }

    return (
      filter?.logicOperator &&
      filter?.typeFilter &&
      filter?.valueSelected &&
      (!('virtualSelected' in filter) || Boolean(filter?.virtualSelected)) &&
      AllSubfiltersWereFilled &&
      (!('extraValueSelected' in filter) ||
        Boolean(
          filter?.extraValueSelected?.from && filter?.extraValueSelected?.to
        ))
    );
  });

  useEffect(() => {
    if (storedFilters && storedFilters.length > 0) {
      setFilters(storedFilters);
      setConfirmFilters(true);
    }
  }, []);

  useEffect(() => {
    if (confirmFilters) {
      setStoredFilters(filters);
      setConfirmFilters(false);
    }
  }, [filters]);

  useEffect(() => {
    setOptionsFilterTypeSelected(optionsFilterType);
  }, [optionsFilterType]);

  const triggerHydrationFilters = () => {
    setHydrateFilters((hydrate) => !hydrate);
  };

  const removeFilterTypeByValue = (valueToRemove) => {
    setOptionsFilterTypeSelected((prev) =>
      prev.filter((option) => option.value !== valueToRemove)
    );
  };

  const addFilterTypeByValue = (valueToAdd) => {
    const optionToAdd = optionsFilterType.find(
      (option) => option.value === valueToAdd
    );

    if (!optionToAdd) return;

    setOptionsFilterTypeSelected((prev) => {
      const alreadyExists = prev.some((opt) => opt.value === valueToAdd);
      if (alreadyExists) return prev;
      return [...prev, optionToAdd];
    });
  };

  const handleUpdateFilter = (idFilter, newData) => {
    setFilters((prev) =>
      prev.map((filter) => {
        if (filter.id === idFilter) {
          return {
            ...filter,
            ...newData,
          };
        }
        return filter;
      })
    );
  };

  const handleAddFilter = () => {
    setFilters((prev) => [
      ...prev,
      { id: Date.now(), subfilters: [], mixFilters: [] },
    ]);
  };

  const handleDeleteFilter = (id) => {
    setFilters((prev) => prev.filter((filter) => filter.id !== id));
  };

  const handleAddSubFilter = (idFilter, subfilter) => {
    setFilters((prev) =>
      prev.map((filter) => {
        if (filter.id === idFilter) {
          return {
            ...filter,
            subfilters: [
              ...(filter.subfilters || []),
              { ...subfilter, id: Date.now() },
            ],
          };
        }
        return filter;
      })
    );
  };

  const handleUpdateSubFilter = (idFilter, idSubfilter, newData) => {
    setFilters((prev) =>
      prev
        .map((filter) => {
          if (filter.id !== idFilter) return filter;

          const updatedSubfilters = filter.subfilters.map((sf) =>
            sf.id === idSubfilter ? { ...sf, ...newData } : sf
          );

          return {
            ...filter,
            subfilters: updatedSubfilters,
          };
        })
        .map((filter) => ({
          ...filter,
          mixFilters: [
            ...filter?.subfilters,
            {
              id: filter?.id,
              typeFilter: filter?.typeFilter,
              logicOperator: filter?.logicOperator,
              valueSelected: filter?.valueSelected,
            },
          ],
        }))
    );
  };

  const handleDeleteSubFilter = (idFilter, idSubfilter) => {
    setFilters((prev) =>
      prev.map((filter) => {
        if (filter.id === idFilter) {
          return {
            ...filter,
            subfilters: filter.subfilters.filter((sf) => sf.id !== idSubfilter),
          };
        }
        return filter;
      })
    );
  };

  const handleDeleteAllFilters = () => {
    setFilters([]);
    setConfirmFilters(true);
    setOptionsFilterTypeSelected([...optionsFilterType]);
  };

  return (
    <ContextFilter.Provider
      value={{
        allFiltersWereFilled,
        optionsFilterTypeSelected,
        removeFilterTypeByValue,
        addFilterTypeByValue,
        optionsFilterType,
        setOptionsFilterType,
        filters,
        handleUpdateFilter,
        handleAddFilter,
        handleDeleteFilter,
        handleAddSubFilter,
        handleUpdateSubFilter,
        handleDeleteSubFilter,
        confirmFilters,
        setConfirmFilters,
        typeFiltersUsed,
        setTypeFiltersUsed,
        handleDeleteAllFilters,
        hydrateFilters,
        triggerHydrationFilters,
        setIdFilter,
      }}
    >
      {children}
    </ContextFilter.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(ContextFilter);

  if (!context)
    throw new Error('useFilter must be used within a ProviderFilter');

  return context;
};
