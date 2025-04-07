import { SearchOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export default function InputSearch({ value, onChange }) {
  return (
    <InputSearchStyled>
      <SearchOutlined className="searchicon" />
      <input type="text" value={value} onChange={e => onChange(e)} placeholder="Nombre o Correo electronico" />
    </InputSearchStyled>
  );
}

const InputSearchStyled = styled.div`
  position: relative;

  .searchicon {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  input {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 4px;
    border: 1px solid #bdbdbd;
    padding-left: 40px;

    &:focus {
      outline: 1px solid ${colors.primaryColor};
    }
  }
`;
