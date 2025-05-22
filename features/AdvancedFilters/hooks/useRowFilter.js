import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useGlobalCommons from '../../../hooks/useGlobalCommons';
import { commonSelector } from '../../../redux/slices/commonSlice';
import { useFilter } from '../context/contextFilter';
import { fetchCitiesByEntityId } from '../services/citiesApi';

function useRowFilter(filter) {
  const { optionsFilterType } = useFilter();

  const [filterType, setFilterType] = useState(filter?.typeFilter);
  const [logicOperator, setLogicOperator] = useState(filter?.logicOperator);
  const [filterValue, setFilterValue] = useState(filter?.valueSelected);

  // Loading Data
  const [isLoading, setIsLoading] = useState(false);

  // Get data not custom
  const { getCatalogBy } = useGlobalCommons();
  const commonValues = useSelector(commonSelector);

  const filterTypeComplete =
    optionsFilterType.find((filter) => filter?.value === filterType) || null;

  // Options depent of fiterType
  const optionsLogicOperator = filterTypeComplete?.operators || [];
  const [optionsFilterValue, setOptionsFilterValue] = useState([]);

  // load data value
  useEffect(() => {
    if (!filterTypeComplete) return setOptionsFilterValue([]);
    if (filterTypeComplete.custom) {
      setOptionsFilterValue(filterTypeComplete.customOptions || []);
    } else {
      getCatalogBy(filterTypeComplete.value);
    }
  }, [filterType]);

  // Load data if not custom
  useEffect(() => {
    if (!filterTypeComplete || filterTypeComplete.custom) return;

    const catalogData = commonValues?.[filterTypeComplete.value]?.results;
    if (catalogData?.length) {
      const data = catalogData.map((el) => ({
        value: el?.[filterTypeComplete?.valuedbIdName] || '',
        label: el?.[filterTypeComplete?.valuedbFieldName] || '',
        ...(filterTypeComplete?.isSearchable && {
          name: el?.name || '',
          code: el?.code || '',
          category: el?.category || '',
          searchable: true,
        }),
      }));
      setOptionsFilterValue(data);
    }
  }, [commonValues, filterType]);

  useEffect(() => {
    setIsLoading(commonValues?.[filterTypeComplete?.value]?.isFetching);
  }, [commonValues?.[filterTypeComplete?.value]?.isFetching]);

  // If there are virtual options
  const dispatch = useDispatch();
  const [optionsVirtual, setOptionsVirtual] = useState();
  const [virtualSelected, setVirtualSelected] = useState(
    filter?.virtualSelected
  );
  const [optionsLogicVirtual, setOptionsLogicVirtual] = useState(
    filterTypeComplete?.virtualConfig?.operators
  );
  const [optionLogicVirtualSelected, setOptionLogicVirtualSelected] = useState(
    filter?.logicOperatorVirtual
  );

  useEffect(() => {
    setOptionsLogicVirtual(filterTypeComplete?.virtualConfig?.operators);
  }, [filterTypeComplete]);

  // console.log(filterTypeComplete?.virtualConfig?.operators);
  const [isLoadingVirtual, setIsLoadingVirtual] = useState(false);

  // Get cities virtual options
  useEffect(() => {
    if (!filterValue || !filterTypeComplete?.virtualConfig) {
      setOptionsVirtual([]);
      return;
    }

    const currentEntityId = filterValue;

    (async () => {
      try {
        setIsLoadingVirtual(true);
        const results = await fetchCitiesByEntityId(currentEntityId);

        const data = results.map((city) => ({
          label: city.name,
          value: city.id,
        }));

        setOptionsVirtual(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingVirtual(false);
      }
    })();
  }, [filterValue]);

  // Special custom options
  /* SPECIAL: range*/
  const [dates, setDates] = useState(
    filter?.extraValueSelected || { from: '', to: '' }
  );
  const [extraValueSelected, setExtraValueSelected] = useState(
    filter?.extraValueSelected || { from: '', to: '' }
  );

  const handleDateChange = (newDates) => setDates(newDates);

  return {
    filterType,
    logicOperator,
    filterValue,
    optionsFilterValue,
    setLogicOperator,
    setFilterValue,
    setOptionsFilterValue,
    optionsLogicOperator,
    setFilterType,
    filterTypeComplete,
    optionsVirtual,
    virtualSelected,
    setVirtualSelected,
    dates,
    setDates,
    handleDateChange,
    extraValueSelected,
    setExtraValueSelected,
    isLoading,
    isLoadingVirtual,
    optionsLogicVirtual,
    optionLogicVirtualSelected,
    setOptionLogicVirtualSelected,
  };
}

export default useRowFilter;
