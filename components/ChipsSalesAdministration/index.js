import { Chip } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export default function ChipsSalesAdministration({
  filters,
  setFilters,
  recharge,
  setRecharge,
  drawerFilters,
  setDrawerFilters,
  name,
  setName,
}) {
  const handleDelete = (filterKey, valueToRemove) => {
    const updatedFilters = { ...drawerFilters };
    delete updatedFilters[filterKey];
    setDrawerFilters(updatedFilters);
    setFilters({ ...filters, [filterKey]: "" });
    setRecharge(!recharge);
  };

  return (
    <ChipsStyle>
      {Object.entries(filters).map(([key, value]) => (
        <Chip
          key={key}
          color="primary"
          size="small"
          onDelete={() => handleDelete(key, value)}
          label={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value.name || value}`}
          className="chip"
        />
      ))}
      {name != "" && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setName("");
          }}
          label={`Nombre: ${name}`}
          className="chip"
        />
      )}
    </ChipsStyle>
  );
}

const ChipsStyle = styled.div`
  height: 30px;
  margin-bottom: 10px;
  .chip {
    text-transform: capitalize;
    margin-right: 5px;
  }
`;
