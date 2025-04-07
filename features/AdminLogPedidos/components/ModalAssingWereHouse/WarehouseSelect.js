import React from "react";
import { FormControl, FormHelperText } from "@material-ui/core";
import Select from "react-select";
import { Info } from "@material-ui/icons";

const WarehouseSelect = ({ warehouseOptions, selectedWarehouse, onChange }) => {
  const selectedOption = warehouseOptions.find(option => option.value === selectedWarehouse) || null;

  return (
    <div className="form">
      <div className="headerForm">
        <Info />
        <p className="addAll">Aplicar el mismo almacen.</p>
      </div>

      <Select
        id="warehouse-select"
        value={selectedOption}
        onChange={option => onChange(option ? option.value : null)}
        options={warehouseOptions}
        placeholder="Seleccione un almacén"
        isClearable
      />
    </div>
  );
};

export default WarehouseSelect;
