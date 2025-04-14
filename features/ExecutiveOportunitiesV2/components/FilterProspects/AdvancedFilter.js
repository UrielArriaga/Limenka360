import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Select from "react-select";
import { Add, Delete } from "@material-ui/icons";

const fieldOptions = [
  { label: "Is Client", value: "isclient", type: "boolean" },
  { label: "Is Opportunity", value: "isoportunity", type: "boolean" },
  { label: "Viewed", value: "viewed", type: "boolean" },
  {
    label: "Ejecutive",
    value: "ejecutiveId",
    type: "select",
    options: [
      { label: "Juan", value: "juan" },
      { label: "María", value: "maria" },
    ],
  },
  {
    label: "Entity",
    value: "entityId",
    type: "select",
    options: [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
    ],
  },
  {
    label: "Category",
    value: "categoryId",
    type: "select",
    options: [{ label: "Cat 1", value: "c1" }],
  },
  {
    label: "Origin",
    value: "originId",
    type: "select",
    options: [{ label: "Web", value: "web" }],
  },
  {
    label: "Phase",
    value: "phaseId",
    type: "select",
    options: [{ label: "Initial", value: "init" }],
  },
  { label: "Created At", value: "createdAt", type: "date-range" },
];

const conditionOptions = [
  { label: "is", value: "is" },
  { label: "is any of", value: "is_any" },
  { label: "between", value: "between" },
];

const AdvancedFilter = () => {
  const [filters, setFilters] = useState([
    { id: 1, field: "isclient", operator: "is", value: false },
  ]);

  const handleChange = (id, key, val) => {
    setFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: val } : f))
    );
  };

  const addFilter = () => {
    setFilters((prev) => [
      ...prev,
      { id: Date.now(), field: "", operator: "is", value: "" },
    ]);
  };

  const removeFilter = (id) => {
    setFilters((prev) => prev.filter((f) => f.id !== id));
  };

  const renderValueInput = (filter) => {
    const field = fieldOptions.find((f) => f.value === filter.field);
    if (!field) return null;

    if (field.type === "boolean") {
      return (
        <StyledSelect
          value={{ label: String(filter.value), value: filter.value }}
          onChange={(val) => handleChange(filter.id, "value", val.value)}
          options={[
            { label: "true", value: true },
            { label: "false", value: false },
          ]}
        />
      );
    }

    if (field.type === "date-range") {
      return (
        <RangeWrapper>
          <input
            type="date"
            value={filter.value?.[0] || ""}
            onChange={(e) =>
              handleChange(filter.id, "value", [
                e.target.value,
                filter.value?.[1] || "",
              ])
            }
          />
          <span>to</span>
          <input
            type="date"
            value={filter.value?.[1] || ""}
            onChange={(e) =>
              handleChange(filter.id, "value", [
                filter.value?.[0] || "",
                e.target.value,
              ])
            }
          />
        </RangeWrapper>
      );
    }

    if (field.type === "select") {
      return (
        <StyledSelect
          value={field.options.find((o) => o.value === filter.value) || null}
          onChange={(val) => handleChange(filter.id, "value", val?.value)}
          options={field.options}
          isClearable
        />
      );
    }

    return (
      <input
        type="text"
        placeholder="Enter value"
        value={filter.value}
        onChange={(e) => handleChange(filter.id, "value", e.target.value)}
      />
    );
  };

  return (
    <Container>
      {filters.map((filter) => (
        <motion.div
          layout
          key={filter.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
        >
          <FilterRow>
            <StyledSelect
              value={fieldOptions.find((f) => f.value === filter.field) || null}
              onChange={(val) => handleChange(filter.id, "field", val.value)}
              options={fieldOptions}
              placeholder="Field"
            />

            <StyledSelect
              value={conditionOptions.find((c) => c.value === filter.operator)}
              onChange={(val) => handleChange(filter.id, "operator", val.value)}
              options={conditionOptions}
              placeholder="Condition"
            />

            {renderValueInput(filter)}

            <Delete
              style={{ cursor: "pointer", color: "#888" }}
              onClick={() => removeFilter(filter.id)}
            />
          </FilterRow>
        </motion.div>
      ))}

      <AddConditionButton onClick={addFilter}>
        <Add fontSize="small" />
        Add condition
      </AddConditionButton>
    </Container>
  );
};

export default AdvancedFilter;

const Container = styled.div`
  background: #f9fafb;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

const FilterRow = styled.div`
  background: #fff;
  border: 1px solid #e0e0e0;
  padding: 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledSelect = styled(Select)`
  min-width: 160px;
  font-size: 14px;

  .react-select__control {
    border-radius: 6px;
  }
`;

const AddConditionButton = styled.button`
  background: transparent;
  color: #5c6ac4;
  border: none;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;

  &:hover {
    color: #3f51b5;
  }
`;

const RangeWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  input {
    border: 1px solid #ccc;
    padding: 5px 6px;
    border-radius: 6px;
    font-size: 14px;
  }

  span {
    font-size: 12px;
    color: #777;
  }
`;
