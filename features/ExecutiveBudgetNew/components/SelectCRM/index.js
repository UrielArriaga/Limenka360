import React from "react";
import Select from "react-select";
import { SelectStyled } from "./style";

const SelectCRM = ({ text = "Ejemplo de texto", options = [], onChange = () => {} }) => {
  return (
    <SelectStyled>
      <p className="text">
        {text} <label className="label">*</label>
      </p>
      <Select
        options={options}
        onChange={onChange}
        getOptionLabel={option => option.label}
        getOptionValue={option => option.value}
      />
    </SelectStyled>
  );
};

export default SelectCRM;
