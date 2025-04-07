import React from "react";
import styled from "styled-components";

export default function SelectFilter({ selectOptions, changeFilterValue }) {
  return (
    <SelectStyle name="select" onChange={e => changeFilterValue(e.target.value)}>
      <option key={0} value="" disabled selected>Selecciona una opción</option>
      {selectOptions && selectOptions.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
    </SelectStyle>
  );
}

const SelectStyle = styled.select`
  height: 30px;
  width: 200px;
  background-color: #ffff;
  border-radius: 2px;
  padding-left: 10px;
  margin-right: 4px;
  margin-bottom: 10px;
  background-color: #ffff;
  box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
`;