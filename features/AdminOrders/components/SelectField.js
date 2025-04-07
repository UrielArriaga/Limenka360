import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { EntitiesLocal } from "../../../BD/databd";
// import Error from "../Error";

export default function SelectField({
  label,
  name,
  control,
  options = [],
  isLoading,
  placeholder,
  errors,
  handleChange,
  onMenuOpen,
  isFetching = false,
}) {
  return (
    <div className="itemGlobal">
      <div className="inputItem__title">
        <p className="inputItem__label">
          {label} <strong>*</strong>
        </p>
      </div>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            className="select-options"
            placeholder={placeholder}
            options={options}
            isClearable
            isLoading={isLoading}
            onChange={handleChange}
            value={options.filter(item => item.id === field.value?.id)}
            getOptionValue={option => `${option.id}`}
            getOptionLabel={option => `${option.name}`}
            isFetching={isFetching}
            onMenuOpen={() => {
              if (onMenuOpen) {
                onMenuOpen();
              }
            }}
          />
        )}
      />
    </div>
  );
}
