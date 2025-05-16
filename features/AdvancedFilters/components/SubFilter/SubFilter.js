import DeleteIcon from '@material-ui/icons/Delete';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useFilter } from '../../context/contextFilter';
import useRowFilter from '../../hooks/useRowFilter';
import FilterSelect from '../common/FilterSelect';

import { customFilterSelect } from '../../utils/utils';
import { formatProduct } from '../common/ProductOption';
import ModalCalendar from './../common/ModalCalendar';

import RangeDates from '../common/RangeDates';
import {
  IconButtonStyled,
  SpecialFilter,
  BtnCalendary,
} from '../RowFilter/styles';

import { useState, useRef } from 'react';
import IndicatorDate from '../common/IndicatorDate';

const SubFilterStyled = styled.div`
  width: 100%;
  display: grid;

  grid-template-columns: ${(props) =>
    props.virtual ? 'auto repeat(3, 1fr) auto' : 'auto repeat(2, 1fr) auto'};
  column-gap: 20px;

  column-gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    row-gap: 16px;
  }
`;

function SubFilter({ subfilter, filter, MainFilterType }) {
  const {
    logicOperator,
    filterValue,
    optionsFilterValue,
    setLogicOperator,
    setFilterValue,
    optionsLogicOperator,
    setFilterType,
    filterType,
    filterTypeComplete,
    optionsVirtual,
    virtualSelected,
    setVirtualSelected,
    handleDateChange,
    dates,
  } = useRowFilter(subfilter);

  const {
    handleDeleteSubFilter,
    handleUpdateSubFilter,
    hydrateFilters,
    triggerHydrationFilters,
  } = useFilter();

  // Has virtual property
  const isVirtual = Boolean(filterTypeComplete?.virtualConfig);

  // Get MainFilterType of filter main
  useEffect(() => {
    setFilterType(MainFilterType);
  }, [MainFilterType]);

  // Has special options ?
  const optionValue = optionsFilterValue.find(
    (opt) => opt.value === filterValue
  );
  const isSpecialOption = Boolean(
    filterTypeComplete?.customOptions && optionValue?.special
  );

  // Save data into subfilters Output
  useEffect(() => {
    const subfilterTest = {
      typeFilter: filterType,
      logicOperator: logicOperator,
      valueSelected: filterValue,
      ...(isVirtual ? { virtualSelected } : {}),
      ...(isSpecialOption ? { extraValueSelected: dates } : {}),
    };

    handleUpdateSubFilter(filter?.id, subfilter?.id, subfilterTest);
  }, [hydrateFilters]);

  // hydrate filters if all fields are fulled
  useEffect(() => {
    triggerHydrationFilters();
  }, [filterType, logicOperator, filterValue, virtualSelected, dates]);

  // ranges dates
  const shouldShowRange =
    filterTypeComplete?.customOptions &&
    optionsFilterValue?.some((opt) => opt?.special === 'range') &&
    filterValue === 'range';

  const [openModalCalendary, setOpenModalCalendary] = useState(shouldShowRange);
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
    <SubFilterStyled virtual={isVirtual}>
      <div></div>
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
              defaultFrom={subfilter?.extraValueSelected?.from || ''}
              defaultTo={subfilter?.extraValueSelected?.to || ''}
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
        />
      )}

      <IconButtonStyled
        onClick={() => {
          handleDeleteSubFilter(filter.id, subfilter.id);
        }}
      >
        <DeleteIcon />
      </IconButtonStyled>
    </SubFilterStyled>
  );
}

export default SubFilter;
