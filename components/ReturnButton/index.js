// Component usage example
// <ReturnButton text={"Texto del componente"}/>

import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import styled from "styled-components";
import { useRouter } from "next/router";
import { FormControlLabel, Switch, Button } from "@material-ui/core";
import MenuOptions from "../../features/ShoppingOrdenes/components/MenuOptions";

export default function ReturnButton({
  text,
  viewFile = false,
  handleChangeFile,
  updateOrder,
  orderSelected,
  handleMenuOpen,
  anchorEl,
  handleMenuClose,
  options,
}) {
  const router = useRouter();

  return (
    <ComponentStyle>
      <div className="arrowBack">
        <ArrowBackIcon className="icon" onClick={() => router.back()} />
        <h2>{text}</h2>
      </div>
      {/* <div className="switchSelection">
        <FormControlLabel
          control={<Switch checked={viewFile} onChange={handleChangeFile} name="view" />}
          label="Ver PDF"
        />
        <Button className="butt" onClick={updateOrder}>
          ENTREGADO
        </Button>
        <div className="menuOpti">
          <MenuOptions
            disabled={orderSelected?.draft}
            handleMenuOpen={handleMenuOpen}
            anchorEl={anchorEl}
            handleMenuClose={handleMenuClose}
            options={options}
            orderSelected={orderSelected}
          />
        </div>
      </div> */}
    </ComponentStyle>
  );
}

const ComponentStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 3px;
  height: 40px;
  .arrowBack {
    display: flex;
    .icon {
      background-color: #407aff;
      color: #fff;
      border-radius: 50px;
      height: 25px;
      width: 25px;
      margin-top: 4px;
      cursor: pointer;
    }
    h2 {
      padding-left: 3px;
    }
  }
  .butt {
    background-color: #039be5;
    color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .butt:hover {
    background-color: #039be5;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .butt:active,
  .butt:focus {
    background-color: #039be5;
  }
  .switchSelection {
    display: flex;
  }
  .menuOpti {
    padding: 5px;
  }
`;
