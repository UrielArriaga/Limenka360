import React from "react";
import styled from "styled-components";
import Select from "react-select";
import { Badge, IconButton, Tooltip } from "@material-ui/core";
import { Close, FilterList } from "@material-ui/icons";
import { colors } from "../../../styles/global.styles";
export default function SelectFiltersDirector({
  selectOptions,
  changeFilterValue,
  showList,
  handleClickFilter,
  searchBy,
  total,
}) {
  console.log("selectOptions", selectOptions);
  return (
    <GoalsChartDirectorStyled>
      <div className="container_filters">
        {searchBy && (
          <Tooltip title="Se esta aplicando filtro">
            <Badge overlap="rectangular" color="primary" badgeContent={total} showZero />
          </Tooltip>
        )}

        <div className={`container_dates ${showList ? "show" : "hidden"}`}>
          <Select
            isClearable={true}
            value={searchBy}
            onChange={changeFilterValue}
            getOptionLabel={type => `${type.name}`}
            getOptionValue={type => (type["label"] ? `${type["label"]}` : `${type["id"]}`)}
            options={selectOptions}
            className="select"
            styles={stylesSelect}
            noOptionsMessage={() => "Sin Opciones"}
            placeholder="Selecciona una opción"
          />
        </div>

        {showList && (
          <div>
            <IconButton onClick={() => handleClickFilter(false)} className={`${showList ? "disable" : "active"}`}>
              <Close />
            </IconButton>
          </div>
        )}

        {!showList && (
          <div>
            <IconButton onClick={() => handleClickFilter(true)} className={`${showList ? "disable" : "active"}`}>
              <FilterList />
            </IconButton>
          </div>
        )}
      </div>
    </GoalsChartDirectorStyled>
  );
}

const stylesSelect = {
  menu: item => ({ ...item, zIndex: 9999, color: "#103c82", fontWeight: "600" }),
  control: provided => ({
    ...provided,
    height: 10,
    marginLeft: 0,
    fontSize: 13,
    backgroundColor: "white",
    "&:hover": { borderColor: "#dce1f6" },
    border: "1px solid #dce1f6",
    boxShadow: "none",
  }),
  menuList: base => ({
    ...base,
    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
};
const GoalsChartDirectorStyled = styled.div`
  .container_filters {
    display: flex;
    &__dates {
      transition: 0.4s;
      margin-left: 10px;
      display: flex;
      flex-direction: row;
      .select {
        color: #495057;
        display: block;
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1.5;
        width: 100%;
        height: 40px;
        color: #000;
        text-transform: capitalize;
        &:focus {
          outline: none;
          border: 2px solid #405189;
        }
      }
    }

    .show {
      width: 240px;
      margin-right: -3px;
    }
    .hidden {
      width: 0px;
      overflow: hidden;
    }
  }
  .active {
    background: #dce1f6;
    height: 38px;
    width: 28px;
    border-radius: 8px;
    svg {
      width: 30px;
      height: 30px;
      padding: 5px;
      color: #103c82;
      cursor: pointer;
    }
    &:hover {
      background: #dce1f6;
    }
  }
  .disable {
    background: #dce1f6;
    height: 38px;
    width: 28px;
    border-top-left-radius: 0px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 0px;
    svg {
      width: 30px;
      height: 30px;
      padding: 5px;
      color: #103c82;
      cursor: pointer;
    }
    &:hover {
      background: #dce1f6;
    }
  }
`;
