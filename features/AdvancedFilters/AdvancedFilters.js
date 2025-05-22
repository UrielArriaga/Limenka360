import { Button } from '@material-ui/core';
import { useEffect } from 'react';

import styled from 'styled-components';
import BodyFilters from './components/common/BodyFilters';
import HeaderFilters from './components/common/HeaderFilters';
import ModalFilters from './components/common/ModalFilters';

import AddIcon from '@material-ui/icons/Add';
import AppButton from './components/common/Button';

import TableFilters from './components/TableFilters/TableFilters';
import { ProviderFilter, useFilter } from './context/contextFilter';
import { buildWhereFromFilters } from './utils/utils';
import { filter } from 'jszip';

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-top: 1px solid #ced4da;

  @media (max-width: 500px) {
    justify-content: center;
    gap: 10px;
  }
`;

const ContainerBtns = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const Indicator = styled.div`
  width: auto;
  display: flex;
  justify-content: end;
  padding: 10px 30px;
  font-weight: 600;
  color: #0b7285;
  background-color: rgba(248, 249, 250, 0.5);
  text-transform: uppercase;
  font-size: 13px;
`;

function AdvancedFiltersApp({
  idFilter,
  filtersTypes = [],
  TitleFilters,
  isOpen,
  setIsOpen,
  onSave = (filter) => {},
  onWhere = (params) => {},
}) {
  const {
    handleAddFilter,
    setConfirmFilters,
    filters,
    setOptionsFilterType,
    optionsFilterType,
    handleDeleteAllFilters,
    triggerHydrationFilters,
    allFiltersWereFilled,
    confirmFilters,
    setIdFilter,
  } = useFilter();

  useEffect(() => {
    if (!confirmFilters) return;
    if (allFiltersWereFilled) {
      onSave(filters);
      onWhere(buildWhereFromFilters(filters));
    }
  }, [filters]);

  const handleClose = () => {
    triggerHydrationFilters();
    setIsOpen(false);
  };

  const handleSave = () => {
    triggerHydrationFilters();
    setConfirmFilters(true);

    requestAnimationFrame(() => {
      setIsOpen(false);
    });
  };

  const isWithinLimitOfFilters = filters.length < optionsFilterType.length;

  // Set inial data
  useEffect(() => {
    setOptionsFilterType(filtersTypes);
    setIdFilter(idFilter);
  }, []);

  // validations
  if (!idFilter)
    throw new Error('A filter must be have a idFilter, please provide it');

  return (
    <ModalFilters open={isOpen} onClose={handleClose}>
      <>
        <HeaderFilters onClose={handleClose}>{TitleFilters}</HeaderFilters>
        <Indicator>
          <p>
            Total de filtros: <span>{filters.length}</span>
          </p>
        </Indicator>

        <BodyFilters>
          <TableFilters />
        </BodyFilters>

        <FilterOptions>
          {isWithinLimitOfFilters ? (
            <AppButton
              icon={<AddIcon />}
              onClick={handleAddFilter}
              size="medium"
              variant="addFilter"
            >
              Agregar filtro
            </AppButton>
          ) : (
            <div />
          )}

          <ContainerBtns>
            {filters.length > 0 && (
              <Button
                variant="outlined"
                color="default"
                onClick={handleDeleteAllFilters}
              >
                Eliminar filtros
              </Button>
            )}

            {filters.length > 0 && allFiltersWereFilled && (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Aplicar
              </Button>
            )}
          </ContainerBtns>
        </FilterOptions>
      </>
    </ModalFilters>
  );
}

/**
 * Component to display advanced table filters in a modal.
 *
 * @param {Object[]} filtersTypes - List of available filter types.
 * @param {string} filtersTypes[].label - The label displayed in the UI (e.g. "Creation Date").
 * @param {string} filtersTypes[].value - The internal key used to identify the filter (e.g. "createdAt").
 * @param {string} [filtersTypes[].valuedb] - Optional database field name.
 * @param {string} filtersTypes[].type - The type of value (e.g. "date", "text", "select").
 * @param {boolean} filtersTypes[].custom - Whether the filter uses a predefined set of values.
 * @param {{ label: string, value: string }[]} filtersTypes[].customOptions - Options shown when `custom` is true.
 * @param {{ label: string, value: string }[]} [filtersTypes[].operators] - Optional list of comparison operators.
 *
 * @param {string} TitleFilters - Title displayed in the modal header.
 * @param {boolean} isOpen - Whether the modal is currently open.
 * @param {function(boolean): void} setIsOpen - Function to toggle modal visibility.
 *
 * @returns {JSX.Element}
 */
const AdvancedFilters = ({
  idFilter = null,
  filtersTypes = [],
  TitleFilters,
  isOpen,
  setIsOpen,
  onSave = (filter) => {},
  onWhere = (params) => {},
}) => {
  return (
    <ProviderFilter>
      <AdvancedFiltersApp
        idFilter={idFilter}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        TitleFilters={TitleFilters}
        filtersTypes={filtersTypes}
        onSave={onSave}
        onWhere={onWhere}
      />
    </ProviderFilter>
  );
};

export default AdvancedFilters;
