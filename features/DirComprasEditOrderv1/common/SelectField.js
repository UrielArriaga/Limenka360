import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
// import { SelectFormStyle } from "../styles";
import styled from "styled-components";
import MessageError from "./MessageError";
// import MessageError from "./MessageError";
// import Error from "../Error";

export default function SelectField({
  label,
  name,
  control,
  options = [],
  isLoading,
  placeholder,
  errors = {},
  handleChange,
  onMenuOpen,
  isFetching = false,
  disabled = false,
  components,
}) {
  return (
    <SelectFieldStyled className="itemGlobal">
      <div className="selectfield_containertitle">
        <p className="selectfield_label">
          {label} <strong>*</strong>
          <MessageError error={errors[name]} />
        </p>
      </div>
      <Controller
        name={name}
        control={control}
        rules={{
          required: "Este campo es obligatorio",
          validate: value => value !== null || "El método de pago no puede estar vacío",
        }}
        render={({ field }) => (
          <Select
            {...field}
            className="select-options"
            placeholder={placeholder}
            options={options}
            styles={selectStyle}
            isLoading={isLoading}
            onChange={handleChange}
            value={options.filter(item => item.id === field.value?.id)}
            getOptionValue={option => `${option.id}`}
            getOptionLabel={option => `${option.name}`}
            isFetching={isFetching}
            isDisabled={disabled}
            menuPosition="fixed"
            maxMenuHeight={150}
            components={components || null}
            onMenuOpen={() => {
              if (onMenuOpen) {
                onMenuOpen();
              }
            }}
          />
        )}
      />
    </SelectFieldStyled>
  );
}

export const SelectFieldStyled = styled.div`
  .selectfield_containertitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .selectfield_label {
    font-size: 13px;
    color: #333;
    font-weight: 500;
    margin-bottom: 5px;
  }
  strong {
    font-weight: bold;
    color: red;
  }
`;

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    height: 36,
    minHeight: 36,
    fontSize: 14,
    border: "1px solid #dcdcdc",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #dcdcdc",
    },
  }),

  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
};
