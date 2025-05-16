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

function FilterSelect({
  optionsImmutable,
  options,
  value,
  onChange,
  label,
  size = 'large',
  SpecialDates = null,
  ...res
}) {
  const selectedOption = optionsImmutable
    ? optionsImmutable?.find((opt) => opt?.value === value) || null
    : options?.find((opt) => opt?.value === value) || null;

  const handleChange = (selectedOption) => {
    onChange({
      target: {
        value: selectedOption ? selectedOption?.value : undefined,
      },
    });
  };

  return (
    <StyledFormControl>
      {label && <Label>{label}</Label>}
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        isClearable
        styles={{
          control: (base, state) => customStyles.control(base, state, size),
        }}
        {...res}
      />
      {SpecialDates}
    </StyledFormControl>
  );
}

export default FilterSelect;
