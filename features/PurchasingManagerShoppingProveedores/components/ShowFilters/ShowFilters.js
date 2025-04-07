import React from "react";
import { Close } from "@material-ui/icons";
import { ContainerActiveFilters } from "./styles";
export default function ShowFilters({ optionsFilterSelected, handleDeleteFilter }) {
  if (optionsFilterSelected?.length === 0) {
    return null;
  }
  return (
    <ContainerActiveFilters>
      <p className="textfiltersactive">Filtrado por:</p>

      {optionsFilterSelected?.map((filterActive, index) => {
        return (
          <div
            key={index}
            className="chipselected"
            onClick={() => {
              handleDeleteFilter(filterActive);
            }}
          >
            <p className="chipselected__text">
              {filterActive?.label}: {filterActive?.name}
            </p>

            <Close className="chipselected__icon" />
          </div>
        );
      })}
    </ContainerActiveFilters>
  );
}
