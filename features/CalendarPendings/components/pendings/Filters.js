import { useState } from "react";
import styled from "styled-components";
import { usePendings } from "../../context/contextPendings";

const FiltersContainer = styled.div`
  background-color: #343a40;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  left: 40px;
  z-index: 8888;
  border-radius: 5px;

  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: translateY(${({ $isOpen }) => ($isOpen ? "0" : "-10px")});
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StyledLabel = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
`;

const StyledSelect = styled.select`
  font-size: 11px;
  padding: 6px;
  border-radius: 5px;
  border: 1px solid #6c757d;
  background-color: #343a40;
  color: #ffffff;
  cursor: pointer;
  text-transform: uppercase;
`;

function Filters({ isOpen }) {
  const { pendingType, filters, setFilters } = usePendings();

  const handleFilterChange = e => {
    const { name, value } = e.target;

    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: name === "byPerform" ? value === "true" : value,
    }));
  };

  return (
    <FiltersContainer $isOpen={isOpen}>
      <FilterGroup>
        <StyledLabel htmlFor="byPerform">Filtrar pendientes</StyledLabel>
        <StyledSelect id="byPerform" name="byPerform" value={`${filters?.byPerform}`} onChange={handleFilterChange}>
          <option value="true">Por realizar</option>
          <option value="false">Realizados</option>
        </StyledSelect>
      </FilterGroup>

      <FilterGroup>
        <StyledLabel htmlFor="byTypeOfPending">Por tipo de pendiente</StyledLabel>
        <StyledSelect
          id="byTypeOfPending"
          name="byTypeOfPending"
          value={filters?.byTypeOfPending}
          onChange={handleFilterChange}
        >
          <option value="all">Todos</option>
          {pendingType?.map(({ resourceId, resourceTitle }) => (
            <option key={resourceId} value={resourceId}>
              {resourceTitle}
            </option>
          ))}
        </StyledSelect>
      </FilterGroup>
    </FiltersContainer>
  );
}

export default Filters;
