import React from "react";
import styled from "styled-components";
import Select from "react-select";
import { Button, IconButton } from "@material-ui/core";
import { Close, CompareArrows } from "@material-ui/icons";

const stylesSelect = {
  menu: item => ({ ...item, zIndex: 9999, color: "#103c82", fontWeight: "600" }),
  control: provided => ({
    ...provided,
    height: 10,
    marginLeft: 0,
    fontSize: 13,
    backgroundColor: "white",
    "&:hover": { borderColor: "#c6eccf" },
    border: "1px solid #c6eccf",
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

const SelectCompareStyled = styled.div`
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
    background: #c6eccf;
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
      background: #c6eccf;
    }
  }
  .disable {
    background: #c6eccf;
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
      background: #c6eccf;
    }
  }
  .btn-compare {
    width: 100%;
  }
`;

export default function SelectCompareExecutives({
  selectOptions,
  handleOnChangeSelectCompare,
  showCompares,
  handleClickCompare,
  isExecutive,
  setOpenCompare,
  idsExecutivesToCompare,
  handleClose,
  loadCompare,
}) {
  return (
    <SelectCompareStyled>
      <div className="container_filters">
        <div className={`container_dates ${showCompares ? "show" : "hidden"}`}>
          <Select
            isClearable={true}
            value={idsExecutivesToCompare[0]}
            onChange={e => handleOnChangeSelectCompare(e, 0)}
            getOptionLabel={type => `${type.name}`}
            getOptionValue={type => `${type["id"]}`}
            options={selectOptions}
            className="select"
            styles={stylesSelect}
            noOptionsMessage={() => "Sin Opciones"}
            placeholder={`Selecciona al primer ${isExecutive ? "ejecutivo" : "grupo"} a comparar`}
          />
          <Select
            isClearable={true}
            value={idsExecutivesToCompare[1]}
            onChange={e => handleOnChangeSelectCompare(e, 1)}
            getOptionLabel={type => `${type.name}`}
            getOptionValue={type => `${type["id"]}`}
            options={selectOptions}
            className="select"
            styles={stylesSelect}
            noOptionsMessage={() => "Sin Opciones"}
            placeholder={`Selecciona al segundo ${isExecutive ? "ejecutivo" : "grupo"} a comparar`}
          />
          <Button onClick={() => setOpenCompare(true)} className={`btn-compare ${loadCompare ? "disable" : "active"}`}>
            {loadCompare ? "Cargando" : "Comparar"}
          </Button>
        </div>
        {showCompares ? (
          <div>
            <IconButton onClick={handleClose} className={`${showCompares ? "disable" : "active"}`}>
              <Close />
            </IconButton>
          </div>
        ) : (
          <div>
            <IconButton onClick={() => handleClickCompare(true)} className={`${showCompares ? "disable" : "active"}`}>
              <CompareArrows />
            </IconButton>
          </div>
        )}
      </div>
    </SelectCompareStyled>
  );
}
