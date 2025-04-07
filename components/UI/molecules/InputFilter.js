import { TextField } from "@material-ui/core";
import { SearchOutlined, FilterList } from "@material-ui/icons";
import styled from "styled-components";
import React from "react";

export default function InputFilter({
  searchNameOrEmail,
  setSearchNameOrEmail,
  startNameOrEmailSearch,
  openDrawer,
  setOrderTablePage,
  placeholder,
}) {
  return (
    <InputFilterStyle>
      <TextField
        variant="outlined"
        type="search"
        value={searchNameOrEmail}
        onChange={e => setSearchNameOrEmail(e.target.value)}
        placeholder={placeholder ? placeholder : "Ingresa nombre, correo o móvil"}
        size="small"
        className="inputText"
        label={searchNameOrEmail !== "" && searchNameOrEmail !== undefined && "Buscar"}
        onKeyDown={e => {
          if (e.key === "Enter" && e.target.value.length > 0) {
            startNameOrEmailSearch();
            setOrderTablePage(1);
          }
        }}
      />
      <SearchOutlined className="search"/>
      <div
        className="ctr_filters"
        onClick={() => {
          openDrawer();
        }}
      >
        <FilterList className="filters" />
        <p className="text">Filtros</p>
      </div>
    </InputFilterStyle>
  );
}

const InputFilterStyle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  position: relative;
  padding: 10px 0px 5px 0px;

  .inputText {
    width: 100%;
    height: 40px;
    input {
      padding-left: 40px;
      padding-right: 70px;
    }
  }
  .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-marginDense.MuiOutlinedInput-marginDense {
    border-radius: 10px;
  }
  .search {
    width: 30px;
    height: 30px;
    padding: 5px;
    color: #8a8a8a;
    transition: all 0.4s ease;
    position: absolute;
    left: 10px;
  }
  .ctr_filters {
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;
    color: #8a8a8a;
    cursor: pointer;
    .filters {
      width: 30px;
      height: 30px;
      padding: 5px;
      transition: all 0.4s ease;
    }
    .text {
      font-size: 12px;
    }
    &:hover .filters {
      padding: 3px;
    }
  }
`;
