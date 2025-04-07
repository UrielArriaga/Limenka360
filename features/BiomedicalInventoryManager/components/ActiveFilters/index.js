import React from "react";
import styled from "styled-components";
import { Close } from "@material-ui/icons";
export default function ActiveFilters({activeFilters,setActiveFilters}){
      if (activeFilters.length === 0) {
        return null;
      }
    return(
    <ContainerActiveFilters>
    <p
        className="textfiltersactive"
       >
        Filtrado por:
      </p>
      {activeFilters.map((filterActive, index) => {
        return (
          <div
            className="chipselected"
            onClick={() => {
              let newActiveFilters = activeFilters.filter(item => item.value !== filterActive.value);
              setActiveFilters(newActiveFilters);
            }}
          >
            <p className="chipselected__text">{filterActive?.name}</p>

            <Close className="chipselected__icon" />
          </div>
        );
      })}
    </ContainerActiveFilters>
   ) 
}
const ContainerActiveFilters = styled.div`
display: flex;
  padding: 0px 10px;
  margin-bottom: 20px;
  z-index: 1000000000000 !important;
  
  .textfiltersactive {
    font-size: 12px;
    margin-right: 10px;
    color: #034d6f;
    font-weight: bold;
}
  .chipselected {
    background-color: #039be5;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 10px;
    display: flex;
    align-items: center;

    .chipselected__text {
      margin-right: 5px;
      font-size: 12px;
    }

    .chipselected__icon {
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    }
}

`;