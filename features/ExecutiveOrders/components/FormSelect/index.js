import { Grid } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { toUpperCaseChart } from "../../../../utils";
import ErrorMessage from "../ErrorMessage";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";

const FormSelect = ({
  label,
  control,
  name,
  options,
  errors,
  required,
  handleChange = null,
  value,
  isFetching,
  onMenuOpen,
  placeholder,
  gridCol = 4,
  common = true,
}) => {
  // const { getCatalogBy } = useGlobalCommons();
  return (
    <Grid item className="item" md={gridCol}>
      <div className="labelContainer">
        <p>
          {label} {required && <strong>*</strong>}
        </p>
        {errors[name] && <ErrorMessage message={errors[name]?.message || "Requerido"} />}
      </div>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <Select
              {...field}
              options={options}
              classNamePrefix="react-select"
              placeholder={placeholder}
              onChange={selectedOption => {
                field.onChange(selectedOption);
                if (handleChange) {
                  handleChange(selectedOption);
                }
              }}
              // value = {common }
              // value={value ? options.filter(option => option.id === field.value.id) : null}
              isLoading={isFetching}
              onMenuOpen={() => onMenuOpen && onMenuOpen()}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
            />
          );
        }}
      />
    </Grid>
  );
};

export default FormSelect;
