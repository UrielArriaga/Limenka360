import styled from 'styled-components';
import useRowFilter from '../../hooks/useRowFilter';
import FilterSelect from '../common/FilterSelect';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useEffect, useRef, useState } from 'react';
import { useFilter } from '../../context/contextFilter';
import { customFilterSelect } from '../../utils/utils';
import AppButton from '../common/Button';
import ModalCalendar from '../common/ModalCalendar';
import { formatProduct } from '../common/ProductOption';
import RangeDates from '../common/RangeDates';
import {
  BtnCalendary,
  IconButtonStyled,
  Label,
  SpecialFilter,
} from '../RowFilter/styles';
import IndicatorDate from '../common/IndicatorDate';

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.virtual ? 'auto repeat(4, 1fr) auto' : 'auto repeat(3, 1fr) auto'};
  column-gap: 20px;

  justify-items: center;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    row-gap: 16px;
  }
`;

function RowFilterMain({ filter, onDelete, setMainFilterType }) {
  const {
    filterType,
    setFilterType,
    logicOperator,
    filterValue,
    optionsFilterValue,
    setLogicOperator,
    setFilterValue,
    optionsLogicOperator,
    filterTypeComplete,
    optionsVirtual,
    virtualSelected,
    setVirtualSelected,
    handleDateChange,
    dates,
    isLoading,
    isLoadingVirtual,
  } = useRowFilter(filter);

  const {
    handleAddSubFilter,
    handleUpdateFilter,
    setConfirmFilters,
    removeFilterTypeByValue,
    optionsFilterTypeSelected,
    addFilterTypeByValue,
    optionsFilterType,
    hydrateFilters,
    triggerHydrationFilters,
  } = useFilter();

  // Has virtual property ?
  const isVirtual = Boolean(filterTypeComplete?.virtualConfig);

  // Has special options ?
  const optionValue = optionsFilterValue.find(
    (opt) => opt.value === filterValue
  );
  const isSpecialOption = Boolean(
    filterTypeComplete?.customOptions && optionValue?.special
  );

  // Show Subfilter button ?
  const hasSubfilter =
    (filter?.subfilter?.length > 0 || filterType) &&
    logicOperator &&
    filterValue;

  // Saves the previous value of the filterType for adding to optionsFilterTypeSelected
  const [currFilterType, setCurrtFilterType] = useState(null);

  // Restrict type of filter if it was selected
  useEffect(() => {
    if (filterType) {
      addFilterTypeByValue(currFilterType);
      removeFilterTypeByValue(filterTypeComplete?.value);
      setCurrtFilterType(filterType);
    } else {
      addFilterTypeByValue(currFilterType);
    }
  }, [filterType]);

  // Save data into filters Output
  useEffect(() => {
    const filterOutput = {
      id: filter.id,
      typeFilter: filterType,
      logicOperator: logicOperator,
      valueSelected: filterValue,
      ...(isVirtual ? { virtualSelected } : {}),
      ...(isSpecialOption ? { extraValueSelected: dates } : {}),
    };

    handleUpdateFilter(filter.id, filterOutput);
  }, [hydrateFilters]);

  // hydrate filters if all fields are fulled
  useEffect(() => {
    triggerHydrationFilters();
  }, [filterType, logicOperator, filterValue, virtualSelected, dates]);

  // Set filterType Global for subfilter it must be of same filterType
  useEffect(() => {
    setMainFilterType(filterType);
  }, [filterType]);

  const handleDelete = () => {
    addFilterTypeByValue(currFilterType);
    setConfirmFilters(true);
    onDelete();
  };

  // Range dates
  const shouldShowRange =
    filterTypeComplete?.customOptions &&
    optionsFilterValue?.some((opt) => opt?.special === 'range') &&
    filterValue === 'range';

  const [openModalCalendary, setOpenModalCalendary] = useState(false);
  const buttonRef = useRef(null);
  const [selectedRangeManually, setSelectedRangeManually] = useState(false);

  // Activate before mounted
  useEffect(() => {
    if (shouldShowRange && selectedRangeManually) {
      requestAnimationFrame(() => {
        setOpenModalCalendary(true);
      });
      setSelectedRangeManually(false);
    }
  }, [shouldShowRange, selectedRangeManually]);

  return (
    <RowContainer virtual={isVirtual}>
      <Label size="14px">Filtrar por:</Label>

      <FilterSelect
        optionsImmutable={optionsFilterType}
        options={optionsFilterTypeSelected}
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        label="Tipo de filtro"
        required
        size="small"
      />

      <FilterSelect
        options={optionsLogicOperator}
        value={logicOperator}
        onChange={(e) => setLogicOperator(e.target.value)}
        label="Operador logico"
        isDisabled={optionsLogicOperator.length === 0}
        size="small"
      />

      <SpecialFilter>
        {shouldShowRange && (
          <BtnCalendary
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              setOpenModalCalendary((isOpen) => !isOpen);
            }}
          />
        )}

        <FilterSelect
          options={optionsFilterValue}
          value={filterValue}
          onChange={(e) => {
            setFilterValue(e.target.value);
            if (e.target.value === 'range') setSelectedRangeManually(true);
          }}
          label="valor"
          isDisabled={optionsFilterValue.length === 0}
          size="small"
          {...(filterTypeComplete?.isSearchable
            ? { formatOptionLabel: formatProduct }
            : {})}
          {...(filterTypeComplete?.isSearchable
            ? { filterOption: customFilterSelect }
            : {})}
          isLoading={isLoading}
          SpecialDates={shouldShowRange ? <IndicatorDate date={dates} /> : null}
        />

        {shouldShowRange && (
          <ModalCalendar
            open={openModalCalendary}
            setOpen={setOpenModalCalendary}
            ignoreRef={buttonRef}
          >
            <RangeDates
              onChange={handleDateChange}
              defaultFrom={filter?.extraValueSelected?.from || ''}
              defaultTo={filter?.extraValueSelected?.to || ''}
            />
          </ModalCalendar>
        )}
      </SpecialFilter>

      {isVirtual && (
        <FilterSelect
          options={optionsVirtual}
          value={virtualSelected}
          onChange={(e) => setVirtualSelected(e.target.value)}
          label={filterTypeComplete.virtualConfig.label}
          isDisabled={optionsVirtual?.length === 0}
          size="small"
          isLoading={isLoadingVirtual}
        />
      )}
      <IconButtonStyled onClick={handleDelete}>
        <DeleteIcon />
      </IconButtonStyled>

      {hasSubfilter && (
        <AppButton
          icon={<AddIcon />}
          onClick={() => handleAddSubFilter(filter.id)}
          size="small"
          variant="addFilter"
        >
          Subfiltro
        </AppButton>
      )}
    </RowContainer>
  );
}

export default RowFilterMain;
