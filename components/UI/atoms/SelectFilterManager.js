import React from "react";
import styled from "styled-components";
import Select from "react-select";

export default function SelectFilterManager({ selectOptions, changeFilterValue }) {
  return (
    <Select
      className="selectOrigin"
      options={selectOptions}
      onChange={changeFilterValue}
      placeholder="Selecciona una Opción"
      isClearable={true}
      getOptionValue={option => `${option["id"]}`}
      getOptionLabel={option => `${option.name} `}
    />
  );
}

