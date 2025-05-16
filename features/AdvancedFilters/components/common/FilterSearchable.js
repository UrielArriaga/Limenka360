import styled from 'styled-components';
import Select from 'react-select';

const StyledFormControl = styled.div`
  margin-bottom: 16px;
  width: 100%;
  align-self: start;
`;

const Label = styled.label`
  color: #868e96;
  display: block;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 600;
`;

const customStyles = {
  control: (provided, state, size = 'large') => {
    const sizes = {
      large: {
        minHeight: '44px',
        fontSize: '16px',
        padding: '6px 12px',
      },
      medium: {
        minHeight: '36px',
        fontSize: '14px',
        padding: '4px 10px',
      },
      small: {
        minHeight: '30px',
        fontSize: '16px',
        padding: '2px 8px',
      },
    };

    return {
      ...provided,
      ...sizes[size],
    };
  },
};

function FilterSearchableSelect({
  label,
  size = 'large',
  isLoading = false,
  options = [],
  value,
  onChange,
  onInputChange,
  onMenuOpen,
  placeholder = 'Buscar...',
  noOptionsMessage = () => 'Ingrese texto para buscar',
  loadingMessage = () => 'Cargando...',
  formatOptionLabel,
  getOptionLabel = (opt) => opt?.name,
  getOptionValue = (opt) => opt?.id,
  filterOption,
}) {
  const selectedOption =
    options?.find((opt) => getOptionValue(opt) === value) || null;

  const handleChange = (selected) => {
    onChange({
      target: {
        value: selected ? getOptionValue(selected) : undefined,
      },
    });
  };

  return (
    <StyledFormControl>
      {label && <Label>{label}</Label>}
      <Select
        placeholder={placeholder}
        value={selectedOption}
        options={options}
        onChange={handleChange}
        onInputChange={onInputChange}
        onMenuOpen={onMenuOpen}
        isLoading={isLoading}
        loadingMessage={loadingMessage}
        noOptionsMessage={noOptionsMessage}
        isClearable={false}
        formatOptionLabel={formatOptionLabel}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        filterOption={filterOption}
        styles={{
          control: (base, state) => customStyles.control(base, state, size),
        }}
      />
    </StyledFormControl>
  );
}

export default FilterSearchableSelect;
